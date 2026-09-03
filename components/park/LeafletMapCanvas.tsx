"use client";

import { useEffect } from "react";
import { APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { PARK_MAP_STYLE } from "./parkMapStyle";

// [lat, lng] — the original MapLibre coordinate pair here was [lng, lat]
// ([73.7504697, 18.7728356]); Google's API takes { lat, lng }.
const PARK_POSITION = { lat: 18.7728356, lng: 73.7504697 };

function ParkMarker() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const marker = new google.maps.Marker({
      map,
      position: PARK_POSITION,
      // Same circular pin previously built as a raw DOM div for the
      // MapLibre marker — reproduced here as an inline SVG icon so the
      // legacy google.maps.Marker (no mapId required) can render it.
      icon: {
        url:
          "data:image/svg+xml;charset=UTF-8," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
              <circle cx="13" cy="13" r="10" fill="#59624d" stroke="#fff" stroke-width="3"/>
            </svg>`,
          ),
        scaledSize: new google.maps.Size(26, 26),
        anchor: new google.maps.Point(13, 13),
      },
    });

    const infoWindow = new google.maps.InfoWindow({
      content: "KSH INFRA Chakan Industrial Park 4<br />Chakan, Pune, Maharashtra",
    });
    marker.addListener("click", () => infoWindow.open({ map, anchor: marker }));

    return () => {
      google.maps.event.clearInstanceListeners(marker);
      marker.setMap(null);
    };
  }, [map]);

  return null;
}

export default function LeafletMapCanvas() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={PARK_POSITION}
        defaultZoom={11}
        styles={PARK_MAP_STYLE}
        disableDefaultUI
        // Matches the original MapLibre config: scroll-to-zoom and rotate
        // are off (this is a decorative hero map), but panning by drag
        // still works, same as the original (only scrollZoom/dragRotate/
        // pitchWithRotate/touchPitch were disabled there — drag-pan wasn't).
        gestureHandling="greedy"
        scrollwheel={false}
        rotateControl={false}
        // Keyboard shortcuts make the map div focusable, which produces a
        // visible browser focus-ring outline on click/interact — the
        // original MapLibre map never had keyboard panning either.
        keyboardShortcuts={false}
      >
        <ParkMarker />
      </Map>
    </APIProvider>
  );
}
