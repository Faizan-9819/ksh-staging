"use client";

import { useEffect } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { CONNECT_MAP_STYLE } from "@/components/park/parkMapStyle";
import { useCtrlScrollZoom } from "@/components/park/useCtrlScrollZoom";

export interface ConnectMapLocation {
  title: string;
  coords: [number, number];
  address: string;
  mapUrl: string;
}

function LocationMarker({ location }: { location: ConnectMapLocation }) {
  const map = useMap();
  useCtrlScrollZoom();

  useEffect(() => {
    if (!map) return;

    const [lat, lng] = location.coords;
    const marker = new google.maps.Marker({
      map,
      position: { lat, lng },
      title: location.title,
      icon: {
        url: "/ParkPage/endpoint.svg",
        scaledSize: new google.maps.Size(34, 48),
        anchor: new google.maps.Point(17, 48),
      },
    });

    map.panTo({ lat, lng });
    map.setZoom(15);

    return () => marker.setMap(null);
  }, [map, location]);

  return null;
}

export default function ConnectMap({
  location,
}: {
  location: ConnectMapLocation;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const [lat, lng] = location.coords;

  return (
    <div className="relative w-full h-full **:focus:outline-none **:focus-visible:outline-none">
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat, lng }}
          defaultZoom={15}
          styles={CONNECT_MAP_STYLE}
          disableDefaultUI
          rotateControl={false}
          // "cooperative" mode bakes in a non-removable "Use ctrl + scroll
          // to zoom" hint overlay + map-dimming on every plain scroll —
          // confirmed against @types/google.maps, no option suppresses it.
          // "greedy" has neither, and pairs with useCtrlScrollZoom() above
          // (a real wheel listener) to get the same Ctrl/Cmd+scroll-only
          // zoom behavior the original Leaflet handler had, without that
          // overlay. Two-finger touch pan/zoom still works under "greedy".
          gestureHandling="greedy"
          // Disables Google's OWN scroll-to-zoom handler at the source, so
          // useCtrlScrollZoom() never has to race/intercept it — a plain
          // scroll is never claimed by the map at all and passes straight
          // through to Lenis untouched. Without this, "greedy" mode zooms
          // the map on any scroll before our own handler even runs.
          scrollwheel={false}
          // Keyboard shortcuts make the map div focusable, which is what
          // produces a visible browser focus-ring outline on click/interact
          // — the original Leaflet map never had keyboard panning either.
          keyboardShortcuts={false}
        >
          <LocationMarker location={location} />
        </Map>
      </APIProvider>

      {/* Bottom Right "View on Map" Pill Badge */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20">
        <a
          href={location.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-start gap-1.5 px-5 py-3 sm:px-8 sm:py-4 bg-black/10 hover:bg-black/15 backdrop-blur-md text-[#212121] transition-all rounded-[46px] font-sora font-normal text-sm sm:text-base tracking-[-0.32px]"
        >
          <span>View on Map</span>
          <span className="text-[#6d6d6d] text-xs sm:text-sm whitespace-nowrap">
            {location.address}
          </span>
        </a>
      </div>
    </div>
  );
}
