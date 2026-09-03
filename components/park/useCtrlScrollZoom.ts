import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

// Replicates the original Leaflet maps' interaction model on top of Google's
// <Map>: Ctrl/Cmd + scroll zooms; plain scroll does nothing to the map so it
// passes through to Lenis (the site's smooth-scroll driver on <html>) same
// as anywhere else on the page, instead of the map or Google's own handler
// capturing it.
//
// None of Google's built-in `gestureHandling` modes reproduce this: "greedy"
// zooms on any scroll (no modifier needed), "none" also blocks two-finger
// touch pan/zoom (which the original always allowed), and "cooperative" is
// the closest in principle but bakes in a non-removable "Use ctrl + scroll
// to zoom the map" hint overlay + full-map dim on every plain-scroll attempt
// — verified against @types/google.maps, no MapOptions field suppresses it.
//
// First attempt at this used a capturing listener that called
// stopImmediatePropagation() on every plain-scroll wheel event to keep
// Google's own zoom handler from seeing it — that also stopped Lenis's own
// wheel listener (which lives further up the same bubble chain, on
// document/window) from ever receiving the event, so Lenis's smooth-scroll
// silently went dead over the map and native scroll took over underneath
// it instead — the exact "Lenis glitches / scroll fights itself over the
// map" bug. The fix is to disable Google's scroll-zoom at the SOURCE
// (`scrollwheel={false}` on <Map>, so Google's handler is simply never
// registered to react to a plain wheel event at all) and drive zoom purely
// by calling map.setZoom() ourselves on Ctrl/Cmd+scroll — meaning this hook
// never needs to intercept or block a plain-scroll wheel event in any way;
// it only ever acts on the Ctrl/Cmd case, so every other wheel event reaches
// Lenis completely untouched, exactly as if this hook weren't here.
export function useCtrlScrollZoom() {
  const map = useMap();

  useEffect(() => {
    const div = map?.getDiv();
    if (!map || !div) return;

    const handleWheel = (e: WheelEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return; // plain scroll: do nothing, let it bubble to Lenis
      e.preventDefault();
      const currentZoom = map.getZoom() ?? 0;
      const zoomDelta = e.deltaY < 0 ? 1 : -1;
      map.setZoom(currentZoom + zoomDelta);
    };

    // Not capture, not stopping propagation — this only ever prevents the
    // browser's own page-zoom default on Ctrl+wheel, never touches Lenis.
    div.addEventListener("wheel", handleWheel, { passive: false });
    return () => div.removeEventListener("wheel", handleWheel);
  }, [map]);
}
