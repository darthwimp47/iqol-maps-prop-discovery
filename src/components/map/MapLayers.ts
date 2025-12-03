export interface MapLayerConfig {
  key: string;                   
  label: string;                 
  type: "vector" | "raster" | "geojson";
  urlTemplate?: string;          
  geojsonUrl?: string;         
  minZoom?: number;
  maxZoom?: number;
  defaultOpacity?: number;
  mapboxToken?: string;          
  visible?: boolean;
}

// Env vars
export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const MAP_BOX_TOKEN = import.meta.env.VITE_APP_MAPBOX_TOKEN;

// Layer Definitions
export const mapLayers: MapLayerConfig[] = [
  {
    key: "bda_2015_compiled",
    label: "BDA CDP (2015)",
    type: "raster",
    urlTemplate: `${BASE_URL}/tiles/bda_2015_compiled/{z}/{x}/{y}`,
    minZoom: 10,
    maxZoom: 21,
    defaultOpacity: 1.0,
    visible: false,
  },

  {
    key: "major_roads",
    label: "Major Roads",
    type: "vector",
    urlTemplate: `https://api.mapbox.com/styles/v1/truestate2025/cmghyi1im002i01r5hgeyd4xi/tiles/256/{z}/{x}/{y}@2x?access_token=${MAP_BOX_TOKEN}`,
    minZoom: 10,
    maxZoom: 21,
    defaultOpacity: 1,
    visible: false,
  },

  {
    key: "flood_zones",
    label: "Flood Prone Areas",
    type: "vector",
    urlTemplate: `https://api.mapbox.com/styles/v1/truestate2025/cmffdtc8g00c001s34m0ydm2h/tiles/256/{z}/{x}/{y}@2x?access_token=${MAP_BOX_TOKEN}`,
    defaultOpacity: 0.6,
    visible: false,
  },

  {
    key: "water_lines",
    label: "Water Supply Lines",
    type: "vector",
    urlTemplate: `https://api.mapbox.com/styles/v1/truestate2025/cmcacbirb03cj01sm2n9fgdck/tiles/256/{z}/{x}/{y}@2x?access_token=${MAP_BOX_TOKEN}`,
    visible: false,
  },

  {
    key: "sewage_lines",
    label: "Sewage Lines",
    type: "vector",
    urlTemplate: `https://api.mapbox.com/styles/v1/truestate2025/cmc912qp902se01qxcb1iebcm/tiles/256/{z}/{x}/{y}@2x?access_token=${MAP_BOX_TOKEN}`,
    visible: false,
  },

  {
    key: "metro_lines",
    label: "Metro Lines",
    type: "geojson",
    geojsonUrl: `${BASE_URL}/api/metro`,
    visible: false,
  },

  {
    key: "suburb_railway",
    label: "Suburban Railway",
    type: "geojson",
    geojsonUrl: `${BASE_URL}/api/suburb_railway`,
    visible: false,
  },

  {
    key: "hightension_lines",
    label: "High Tension Wires",
    type: "geojson",
    geojsonUrl: `${BASE_URL}/api/hightension`,
    visible: false,
  },
];

export function getLayerConfig(key: string) {
  return mapLayers.find((l) => l.key === key);
}
