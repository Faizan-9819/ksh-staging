// Google Maps JSON style arrays approximating the tan/olive/teal KSH INFRA
// palette that was previously achieved two different ways: a custom
// vector-tile paint style (this park map) and a CSS `filter: sepia/hue-rotate`
// trick layered on top of MapTiler "positron" raster tiles (the other map
// components). Google Maps only exposes per-feature `color`/`visibility`
// stylers (no CSS filter equivalent applied to its own tiles), so each
// filtered look below is recreated as its own explicit color palette rather
// than a filter — same end colors, different mechanism.

// Deep tan/olive palette for the single-park hero map (previously the
// MapLibre vector style in this file, rendered via LeafletMapCanvas.tsx).
export const PARK_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#FBF2E8" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#5c5a4e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#FBF2E8" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ visibility: "simplified" }],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{ color: "#b7ae98" }],
  },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#d5cebd" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#c3bda9" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#c3bda9" }] },
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#FBF2E8" }] },
  { featureType: "road", elementType: "labels", stylers: [{ visibility: "off" }] },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#e4dcc9" }],
  },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#85C6C2" }] },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8a8570" }],
  },
];

// Warm sepia/tan-tinted variant of the light basemap, matching the
// `sepia(0.3) hue-rotate(-18deg) contrast(0.85) brightness(1.08) saturate(0.6)`
// CSS filter previously applied to MapTiler "positron" tiles in ConnectMap.tsx.
export const CONNECT_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#F5EEDD" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8c8168" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#F5EEDD" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#d8cdb2" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#EFE6D2" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#e2d8bf" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#cfd2ae" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#e6dcc4" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#9fcbc4" }] },
];

// Teal-water / cream-land variant matching
// `hue-rotate(-26deg) saturate(1.7) brightness(1.05) contrast(0.92)`
// previously applied in ConnectWithUsSection.tsx (contact-us page) and
// Connectus.tsx (our-team page) — both used the identical filter, so both
// now share this identical style.
export const TEAL_WATER_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#FBF2E8" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#7c7660" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#FBF2E8" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#cfc4a4" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#F3E9D4" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#e0d5b7" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#bcc9a4" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#e6d9b8" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#7FC6C0" }] },
];

// Muted sepia variant matching
// `sepia(0.4) hue-rotate(-20deg) contrast(0.88) brightness(0.96) saturate(0.5)`
// previously applied in InteractiveMap.tsx (park route-distance maps).
export const ROUTE_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#EFE4CB" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#7c7660" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#EFE4CB" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#c9bd9c" }] },
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#E9DCBE" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#dccca3" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#b7bd94" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#f7efd9" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#ddcda3" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#8FBDB2" }] },
];
