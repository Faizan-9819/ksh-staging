// Google Maps JSON style arrays approximating the tan/olive/teal KSH INFRA
// palette that was previously achieved two different ways: a custom
// vector-tile paint style (this park map) and a CSS `filter: sepia/hue-rotate`
// trick layered on top of MapTiler "positron" raster tiles (the other map
// components). Google Maps only exposes per-feature `color`/`visibility`
// stylers (no CSS filter equivalent applied to its own tiles), so each
// filtered look below is recreated as its own explicit color palette rather
// than a filter — same end colors, different mechanism.
//
// Production reference (confirmed against the live kshinfra.com site) is a
// near-flat, almost single-tone map: water/rivers barely distinguishable from
// land, no green park/landscape patches, and ZERO text labels of any kind —
// no city names, no lake/river names, no road names. Every style below is
// tuned to that: water and landscape/park geometry are blended close to the
// base tone (subtle tonal shift only, not a distinct color), and every label
// layer is turned off, full stop — not just POI/road labels but place names,
// water names, and administrative names too.

const NO_LABELS_AT_ALL: google.maps.MapTypeStyle[] = [
  { elementType: "labels", stylers: [{ visibility: "off" }] },
];

// Deep tan/olive palette for the single-park hero map (previously the
// MapLibre vector style in this file, rendered via LeafletMapCanvas.tsx).
export const PARK_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#FBF2E8" }] },
  ...NO_LABELS_AT_ALL,
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#F3EADB" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#F3EADB" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#FBF2E8" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#F1E7D5" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#E9DCC3" }] },
];

// Warm sepia/tan-tinted variant of the light basemap, matching the
// `sepia(0.3) hue-rotate(-18deg) contrast(0.85) brightness(1.08) saturate(0.6)`
// CSS filter previously applied to MapTiler "positron" tiles in ConnectMap.tsx.
export const CONNECT_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#F5EEDD" }] },
  ...NO_LABELS_AT_ALL,
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#EFE6D2" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#EFE6D2" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#F5EEDD" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#E4D8BC" }] },
];

// Teal-water / cream-land variant matching
// `hue-rotate(-26deg) saturate(1.7) brightness(1.05) contrast(0.92)`
// previously applied in ConnectWithUsSection.tsx (contact-us page) and
// Connectus.tsx (our-team page) — both used the identical filter, so both
// now share this identical style.
export const TEAL_WATER_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#FBF2E8" }] },
  ...NO_LABELS_AT_ALL,
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#F3E9D4" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#F3E9D4" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#FBF2E8" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#E6D6B8" }] },
];

// Muted sepia variant matching
// `sepia(0.4) hue-rotate(-20deg) contrast(0.88) brightness(0.96) saturate(0.5)`
// previously applied in InteractiveMap.tsx (park route-distance maps).
// Colors below are computed by actually running that exact CSS filter chain
// against MapTiler "positron" 's documented base land (#F1EEE8) and water
// (#AAD3DF) tones, not eyeballed — land resolves to #ECDFD9 (a cool, faintly
// pink-beige, notably less yellow/olive than earlier guesses in this file's
// history), water to #C5C8C2 (close to land in both hue and lightness, which
// is why water reads as barely distinguishable from land at a glance).
export const ROUTE_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#ECDFD9" }] },
  ...NO_LABELS_AT_ALL,
  { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#ECDFD9" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#ECDFD9" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#FBEFEA" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#C5C8C2" }] },
];
