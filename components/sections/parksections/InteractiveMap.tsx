"use client";
import React, { useEffect, useState } from "react";
import { APIProvider, Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { ROUTE_MAP_STYLE } from "@/components/park/parkMapStyle";
import { useCtrlScrollZoom } from "@/components/park/useCtrlScrollZoom";

export interface MapLocation {
  id: number;
  title: string;
  distance: string;
  coords: [number, number];
  coordText: string;
  googleMapUrl: string;
}

export interface InteractiveMapContent {
  destination: {
    name: string;
    coords: [number, number];
  };
  locations: MapLocation[];
  viewOnMapLabel: string;
}

const DEFAULT_CONTENT: InteractiveMapContent = {
  destination: {
    name: "Ksh Infra Park 6",
    coords: [18.7727985, 73.7496338],
  },
  locations: [
    {
      id: 0,
      title: "Pune International Airport",
      distance: "39 km",
      coords: [18.579343, 73.908917],
      coordText: "18.579343, 73.908917",
      googleMapUrl:
        "https://www.google.com/maps/dir/Pune+International+Airport/18.7727985,73.7496338",
    },
    {
      id: 1,
      title: "Mumbai International Airport",
      distance: "143 km",
      coords: [19.090218, 72.862812],
      coordText: "19.090218, 72.862812",
      googleMapUrl:
        "https://www.google.com/maps/dir/Chhatrapati+Shivaji+Maharaj+International+Airport+Mumbai/18.7727985,73.7496338",
    },
    {
      id: 2,
      title: "Seaport",
      distance: "141 km",
      coords: [18.945433, 72.848985],
      coordText: "18.945433, 72.848985",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.9454327,72.8489853/18.7727985,73.7496338",
    },
    {
      id: 3,
      title: "National Highways",
      distance: "103 km",
      coords: [18.980688, 73.087506],
      coordText: "18.980688, 73.087506",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.9806882,73.087506/18.7727985,73.7496338",
    },
    {
      id: 4,
      title: "City Center",
      distance: "103 km",
      coords: [18.588259, 73.737246],
      coordText: "18.588259, 73.737246",
      googleMapUrl:
        "https://www.google.com/maps/dir/18.5882594,73.7372457/18.7727985,73.7496338",
    },
  ],
  viewOnMapLabel: "View on Map",
};

// Renders the start/end markers + driving route for the active location,
// re-fetching from Google's Directions Service whenever the selection
// changes — same responsibility the OSRM fetch + L.polyline draw had before.
function RouteLayer({
  activeLocation,
  destination,
}: {
  activeLocation: MapLocation;
  destination: InteractiveMapContent["destination"];
}) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  useCtrlScrollZoom();

  useEffect(() => {
    if (!map || !routesLibrary) return;

    const [startLat, startLng] = activeLocation.coords;
    const [endLat, endLng] = destination.coords;

    const startMarker = new google.maps.Marker({
      map,
      position: { lat: startLat, lng: startLng },
      icon: {
        url: "/ParkPage/startpoint.svg",
        scaledSize: new google.maps.Size(28, 29),
        anchor: new google.maps.Point(14, 14.5),
      },
    });

    const endMarker = new google.maps.Marker({
      map,
      position: { lat: endLat, lng: endLng },
      icon: {
        url: "/ParkPage/endpoint.svg",
        scaledSize: new google.maps.Size(34, 48),
        anchor: new google.maps.Point(17, 48),
      },
    });

    let routePolyline: google.maps.Polyline | null = null;
    let isMounted = true;

    const fitWithPadding = (bounds: google.maps.LatLngBounds) => {
      // Matches the original paddingTopLeft/paddingBottomRight asymmetric
      // padding (extra top padding so the route fits under the floating
      // tabs header).
      map.fitBounds(bounds, { top: 180, left: 60, right: 60, bottom: 60 });
    };

    const directionsService = new routesLibrary.DirectionsService();
    directionsService.route(
      {
        origin: { lat: startLat, lng: startLng },
        destination: { lat: endLat, lng: endLng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (!isMounted) return;

        if (status === "OK" && result?.routes[0]) {
          routePolyline = new google.maps.Polyline({
            map,
            path: result.routes[0].overview_path,
            strokeColor: "#59624D",
            strokeWeight: 3.5,
            strokeOpacity: 0.95,
          });
          fitWithPadding(result.routes[0].bounds);
        } else {
          // Fallback: same straight-line-between-points behavior the
          // original OSRM .catch() block used.
          routePolyline = new google.maps.Polyline({
            map,
            path: [
              { lat: startLat, lng: startLng },
              { lat: endLat, lng: endLng },
            ],
            strokeColor: "#59624D",
            strokeWeight: 3,
          });
          const bounds = new google.maps.LatLngBounds();
          bounds.extend({ lat: startLat, lng: startLng });
          bounds.extend({ lat: endLat, lng: endLng });
          fitWithPadding(bounds);
        }
      },
    );

    return () => {
      isMounted = false;
      startMarker.setMap(null);
      endMarker.setMap(null);
      routePolyline?.setMap(null);
    };
  }, [map, routesLibrary, activeLocation, destination]);

  return null;
}

export default function InteractiveMapSection({
  content = DEFAULT_CONTENT,
  enhancedMobileLayout = false,
}: {
  content?: InteractiveMapContent;
  /** Opt-in only — park2 must keep its exact current mobile layout (5 stacked buttons). When true, mobile shows a custom dropdown instead. */
  enhancedMobileLayout?: boolean;
} = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

  const DESTINATION = content.destination;
  const locationsData = content.locations;
  const activeLocation = locationsData[activeIndex];

  const [destLat, destLng] = DESTINATION.coords;

  return (
    <div
      id="interactive-map"
      className="relative w-full font-sans text-[#535353]"
    >
      {/* Header Container - Smooth white gradient overlay onto map area */}
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none bg-gradient-to-b from-white via-white/80 to-transparent pt-2 pb-10">
        <div className="pointer-events-auto">
          {/* Top Ruler Ticks Bar */}
          <div
            className="w-full h-8 border-b border-[#CAC4B5] bg-transparent px-6 grid gap-[20px] items-end rounded-t-2xl"
            style={{
              gridTemplateColumns: `repeat(${locationsData.length}, minmax(0, 1fr))`,
            }}
          >
            {locationsData.map((_, colIndex) => {
              const isActive = colIndex === activeIndex;
              return (
                <div
                  key={colIndex}
                  className="flex justify-between items-end h-full px-2"
                >
                  {Array.from({ length: 7 }).map((_, tickIdx) => (
                    <div
                      key={tickIdx}
                      className={`w-[1px] transition-all duration-300 ${
                        isActive
                          ? "bg-[#59624D] opacity-100 " +
                            (tickIdx % 3 === 0 ? "h-5 w-[1.5px]" : "h-3")
                          : "bg-[#CAC4B5] opacity-50 " +
                            (tickIdx % 3 === 0 ? "h-3.5" : "h-2")
                      }`}
                    />
                  ))}
                </div>
              );
            })}
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 pt-4">
            {enhancedMobileLayout && (
              <div className="relative sm:hidden">
                {/* Custom select trigger — shows the active location */}
                <button
                  onClick={() => setMobileDropdownOpen((v) => !v)}
                  className="w-full h-[70px] flex items-center justify-between px-[20px] py-[3px] font-sora cursor-pointer rounded-[46px] bg-[#cbc4b5] text-[#212121]"
                >
                  <span
                    className="truncate pr-1 text-[12px] tracking-[-0.24px]"
                    dangerouslySetInnerHTML={{
                      __html: locationsData[activeIndex].title,
                    }}
                  />
                  <span className="flex items-center gap-2 shrink-0">
                    <span className="flex items-end gap-[3px] shrink-0">
                      <span className="text-[16px] tracking-[-0.32px] whitespace-nowrap">
                        {locationsData[activeIndex].distance.split(" ")[0]}
                      </span>
                      <span className="text-[12px] tracking-[-0.24px] text-[#6d6d6d] whitespace-nowrap">
                        {locationsData[activeIndex].distance.split(" ")[1]}
                      </span>
                    </span>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      className={`shrink-0 transition-transform duration-200 ${
                        mobileDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="#212121"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {mobileDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-lg">
                    {locationsData.map((item, index) => {
                      const [distanceValue, distanceUnit] =
                        item.distance.split(" ");
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveIndex(index);
                            setMobileDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-[20px] py-4 font-sora text-[#212121] transition-colors duration-200 cursor-pointer ${
                            index === activeIndex
                              ? "bg-[#cbc4b5]/60"
                              : "hover:bg-[#cbc4b5]/20"
                          }`}
                        >
                          <span
                            className="truncate pr-1 text-[12px] tracking-[-0.24px]"
                            dangerouslySetInnerHTML={{ __html: item.title }}
                          />
                          <span className="flex items-end gap-[3px] shrink-0">
                            <span className="text-[16px] tracking-[-0.32px] whitespace-nowrap">
                              {distanceValue}
                            </span>
                            <span className="text-[12px] tracking-[-0.24px] text-[#6d6d6d] whitespace-nowrap">
                              {distanceUnit}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <style>{`
              @media (min-width: 640px) {
                .map-tabs-grid {
                  grid-template-columns: repeat(${locationsData.length}, minmax(0, 1fr));
                }
              }
            `}</style>
            <div
              className={`map-tabs-grid grid grid-cols-1 gap-[20px] w-full ${
                enhancedMobileLayout ? "hidden sm:grid" : ""
              }`}
            >
              {locationsData.map((item, index) => {
                const isActive = index === activeIndex;
                const [distanceValue, distanceUnit] = item.distance.split(" ");
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full h-[70px] flex items-center justify-between px-[20px] py-[3px] font-sora transition-all duration-300 cursor-pointer rounded-[46px] ${
                      isActive
                        ? "bg-[#cbc4b5] text-[#212121]"
                        : "bg-transparent border border-black/10 text-[#212121] hover:bg-[#cbc4b5]/40"
                    }`}
                  >
                    <span
                      className="truncate pr-1 text-left text-[12px] tracking-[-0.24px]"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <span className="flex items-end gap-[3px] shrink-0">
                      <span className="text-[16px] tracking-[-0.32px] whitespace-nowrap">
                        {distanceValue}
                      </span>
                      <span className="text-[12px] tracking-[-0.24px] text-[#6d6d6d] whitespace-nowrap">
                        {distanceUnit}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Map Area Container — visible box height stays exactly as before.
          The <Map> inside is made 100px TALLER than its container (see
          style below) so the extra 100px of map — where Google's mandatory
          attribution strip always renders, pinned to the map canvas's own
          bottom edge, no API to remove it — overflows past the container's
          bottom and gets clipped by this div's own overflow-hidden, instead
          of growing the visible section or affecting page layout at all. */}
      <div className="relative w-full h-[500px] lg:h-[700px] overflow-hidden bg-[#F9F2D8] **:focus:outline-none **:focus-visible:outline-none">
        <APIProvider apiKey={apiKey}>
          <Map
            style={{ width: "100%", height: "calc(100% + 100px)" }}
            defaultCenter={{ lat: destLat, lng: destLng }}
            defaultZoom={9}
            // No maxZoom — zooming in stays unrestricted. minZoom stops the
            // user from zooming out to a near-country-level view; the map
            // already auto-fits around routes up to ~143km (Mumbai
            // International Airport), so this still allows a bit more
            // zoom-out room below that widest fitBounds level.
            minZoom={7}
            styles={ROUTE_MAP_STYLE}
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
            <RouteLayer activeLocation={activeLocation} destination={DESTINATION} />
          </Map>
        </APIProvider>

        {/* Bottom Right "View on Map" Pill Badge — unchanged; the
            container it's positioned relative to never grew, only the
            <Map> canvas inside it did (see comment above), so this stays
            at its original position. */}
        <div className="absolute bottom-4 right-4 z-10">
          <a
            href={activeLocation.googleMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-start gap-[2px] px-[18px] py-[10px] bg-black/10 hover:bg-black/15 backdrop-blur-md text-[#212121] transition-all rounded-[30px] font-sora font-normal text-[12px] tracking-[-0.24px]"
          >
            <span
              dangerouslySetInnerHTML={{ __html: content.viewOnMapLabel }}
            />
            <span
              className="text-[10px] text-[#6d6d6d] whitespace-nowrap"
              dangerouslySetInnerHTML={{ __html: activeLocation.coordText }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
