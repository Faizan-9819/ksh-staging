"use client";

import { useEffect, useState } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { TEAL_WATER_MAP_STYLE } from "@/components/park/parkMapStyle";
import { useCtrlScrollZoom } from "@/components/park/useCtrlScrollZoom";

// Target Coordinates for Mumbai & Pune locations
const MAP_LOCATIONS = {
  mumbai: {
    title: "Innov8 Peninsula Business Park Map Location",
    coords: { lat: 18.993855582193563, lng: 72.82869277598463 },
    label: "Peninsula Business Park, Mumbai",
  },
  pune: {
    title: "KSH INFRA Pune Map Location",
    coords: { lat: 18.52041286917711, lng: 73.84083547597287 },
    label: "Gokhale Sanchit, Shivajinagar, Pune",
  },
};

function CityMarker({ activeCity }: { activeCity: "mumbai" | "pune" }) {
  const map = useMap();
  useCtrlScrollZoom();

  useEffect(() => {
    if (!map) return;

    const location = MAP_LOCATIONS[activeCity];
    const marker = new google.maps.Marker({
      map,
      position: location.coords,
      title: location.title,
      icon: {
        url: "/ParkPage/endpoint.svg",
        scaledSize: new google.maps.Size(34, 48),
        anchor: new google.maps.Point(17, 48),
      },
    });

    map.panTo(location.coords);
    map.setZoom(14);

    return () => marker.setMap(null);
  }, [map, activeCity]);

  return null;
}

export default function ConnectWithUsSection() {
  const [activeCity, setActiveCity] = useState<"mumbai" | "pune">("mumbai");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

  return (
    <section className="w-full bg-[#FAF8F5] py-12 sm:py-16 lg:py-24 plcont prcont">
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <h2
            className="text-[28px] sm:text-[36px] lg:text-[40px]"
            style={{
              color: "#212121",
              fontFamily: "var(--font-sora), Sora, sans-serif",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "1.2",
              letterSpacing: "-0.8px",
            }}
          >
            Connect with us
          </h2>

          {/* Location Toggle Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Mumbai Button */}
            <button
              type="button"
              onClick={() => setActiveCity("mumbai")}
              className="flex-1 sm:flex-none sm:px-8 py-2.5 rounded-[60px] text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer border text-center"
              style={{
                backgroundColor:
                  activeCity === "mumbai" ? "#59624D" : "transparent",
                color: activeCity === "mumbai" ? "#FFFFFF" : "#868686",
                borderColor: activeCity === "mumbai" ? "#59624D" : "#C5BDAC",
                fontFamily: "var(--font-sora), Sora, sans-serif",
              }}
            >
              Mumbai
            </button>

            {/* Pune Button */}
            <button
              type="button"
              onClick={() => setActiveCity("pune")}
              className="flex-1 sm:flex-none sm:px-8 py-2.5 rounded-[60px] text-sm sm:text-base font-medium transition-all duration-300 cursor-pointer border text-center"
              style={{
                backgroundColor:
                  activeCity === "pune" ? "#59624D" : "transparent",
                color: activeCity === "pune" ? "#FFFFFF" : "#868686",
                borderColor: activeCity === "pune" ? "#59624D" : "#C5BDAC",
                fontFamily: "var(--font-sora), Sora, sans-serif",
              }}
            >
              Pune
            </button>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-[#E5E0D8]" />

        {/* Interactive Themed Map Container — visible box (border, rounding,
            shadow, height) stays exactly as before. The <Map> inside is
            made 100px TALLER than its container and top-aligned via the
            wrapper below, so the extra 100px of map — where Google's
            mandatory attribution strip always renders, pinned to the map
            canvas's own bottom edge, no API to remove it — overflows past
            the container's bottom and gets clipped by this div's own
            overflow-hidden, instead of growing the visible card. */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-[#E5E0D8] h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] shadow-sm bg-[#FBF2E8] **:focus:outline-none **:focus-visible:outline-none">
          <APIProvider apiKey={apiKey}>
            <Map
              style={{ width: "100%", height: "calc(100% + 100px)" }}
              defaultCenter={MAP_LOCATIONS.mumbai.coords}
              defaultZoom={14}
              // No maxZoom — zooming in stays unrestricted. minZoom stops
              // zooming out past a wide-city view.
              minZoom={10}
              styles={TEAL_WATER_MAP_STYLE}
              disableDefaultUI
              rotateControl={false}
              // "cooperative" mode bakes in a non-removable "Use ctrl +
              // scroll to zoom" hint overlay + map-dimming on every plain
              // scroll — confirmed against @types/google.maps, no option
              // suppresses it. "greedy" has neither, and pairs with
              // useCtrlScrollZoom() above (a real wheel listener) to get the
              // same Ctrl/Cmd+scroll-only zoom the original Leaflet handler
              // had, without that overlay. Two-finger touch pan/zoom still
              // works under "greedy".
              gestureHandling="greedy"
              // Disables Google's OWN scroll-to-zoom handler at the source,
              // so useCtrlScrollZoom() never has to race/intercept it — a
              // plain scroll is never claimed by the map at all and passes
              // straight through to Lenis untouched. Without this, "greedy"
              // mode zooms the map on any scroll before our own handler
              // even runs.
              scrollwheel={false}
              // Keyboard shortcuts make the map div focusable, which is what
              // produces a visible browser focus-ring outline on
              // click/interact — the original Leaflet map never had
              // keyboard panning either.
              keyboardShortcuts={false}
            >
              <CityMarker activeCity={activeCity} />
            </Map>
          </APIProvider>
        </div>
      </div>
    </section>
  );
}
