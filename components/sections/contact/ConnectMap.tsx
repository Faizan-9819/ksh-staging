"use client";

import { useEffect } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { CONNECT_MAP_STYLE } from "@/components/park/parkMapStyle";

export interface ConnectMapLocation {
  title: string;
  coords: [number, number];
  address: string;
  mapUrl: string;
}

function LocationMarker({ location }: { location: ConnectMapLocation }) {
  const map = useMap();

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
    <div className="relative w-full h-full">
      <APIProvider apiKey={apiKey}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat, lng }}
          defaultZoom={15}
          styles={CONNECT_MAP_STYLE}
          disableDefaultUI
          // Ctrl/Cmd + scroll to zoom, matching the original Leaflet
          // container-scoped wheel handler; plain scroll never zooms.
          gestureHandling="cooperative"
          scrollwheel={false}
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
