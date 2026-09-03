// Google Maps JSON style arrays for the KSH INFRA map palette. Originally
// tan/olive/teal (achieved two different ways pre-migration: a custom
// vector-tile paint style, and a CSS `filter: sepia/hue-rotate` trick over
// MapTiler "positron" raster tiles), now monochrome/grayscale per request —
// every color below is a pure gray (R=G=B, zero saturation), distinguished
// from each other only by lightness, not hue.
//
// Label density: the original MapLibre style only ever rendered THREE label
// layers total — water_name, place_town_village, place_city — everything
// else (roads, POIs, administrative boundaries, transit) was either absent
// from the style or explicitly never labeled. Every style below turns off
// every label/icon category entirely to match.

const NO_LABELS_AT_ALL: google.maps.MapTypeStyle[] = [
  { elementType: "labels", stylers: [{ visibility: "off" }] },
];

// Single-park hero map (rendered via LeafletMapCanvas.tsx).
export const PARK_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#F0F0F0" }] },
  ...NO_LABELS_AT_ALL,
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#E6E6E6" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#E6E6E6" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#F0F0F0" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#DCDCDC" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#C8C8C8" }] },
];

// Contact-page single-location map.
export const CONNECT_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#F2F2F2" }] },
  ...NO_LABELS_AT_ALL,
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#E8E8E8" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#E8E8E8" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#FFFFFF" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#CACACA" }] },
];

// Mumbai/Pune toggle map — used in ConnectWithUsSection.tsx (contact-us
// page) and Connectus.tsx (our-team page), both share this identical style.
export const TEAL_WATER_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#F0F0F0" }] },
  ...NO_LABELS_AT_ALL,
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#E6E6E6" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#E6E6E6" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#FFFFFF" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#C4C4C4" }] },
];

// Park route-distance map (InteractiveMap.tsx).
export const ROUTE_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#EDEDED" }] },
  ...NO_LABELS_AT_ALL,
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#E3E3E3" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#E3E3E3" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#F7F7F7" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#C6C6C6" }] },
];
