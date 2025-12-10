import { create } from "zustand";
import { mockProperties } from "../mock/properties.mock";
import { useFilterStore } from "./filtersStore";

interface MapState {
  center: { lat: number; lng: number };
  zoom: number;
  bounds: google.maps.LatLngBounds | null;

  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;

  setCenter: (center: { lat: number; lng: number }) => void;
  setZoom: (zoom: number) => void;
  setBounds: (bounds: google.maps.LatLngBounds | null) => void;

  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;

  hoveredPropertyId: string | null;
  setHoveredPropertyId: (id: string | null) => void;

  // DRAW
  drawingMode: boolean;
  setDrawingMode: (v: boolean) => void;

  drawnPolygon: google.maps.Polygon | null;
  drawnPolygonPath: { lat: number; lng: number }[];

  setDrawnPolygon: (
    poly: google.maps.Polygon | null,
    path?: { lat: number; lng: number }[] | null
  ) => void;

  resetDrawArea: () => void;

  // DATA
  filteredProperties: any[];
  visibleProperties: any[];
  recommendedProperties: any[];

  setVisibleProperties: (p: any[]) => void;
  applyFilters: () => void;
}

export const useMapStore = create<MapState>((set, get) => ({
  center: { lat: 12.9716, lng: 77.5946 },
  zoom: 11,
  bounds: null,

  map: null,
  setMap: (map) => set({ map }),

  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  setBounds: (bounds) => set({ bounds }),

  selectedPropertyId: null,
  setSelectedPropertyId: (id) => set({ selectedPropertyId: id }),

  hoveredPropertyId: null,
  setHoveredPropertyId: (id) => set({ hoveredPropertyId: id }),

  // DATA
  filteredProperties: mockProperties,
  visibleProperties: mockProperties,
  recommendedProperties: [],

  setVisibleProperties: (p) => set({ visibleProperties: p }),

  // DRAW
  drawingMode: false,
  setDrawingMode: (v) => set({ drawingMode: v }),

  drawnPolygon: null,
  drawnPolygonPath: [],

  setDrawnPolygon: (poly, path = null) =>
    set({
      drawnPolygon: poly,
      drawnPolygonPath: path ?? [],
    }),

  resetDrawArea: () => {
    const poly = get().drawnPolygon;
    if (poly) poly.setMap(null);

    set({
      drawnPolygon: null,
      drawnPolygonPath: [],
      drawingMode: false,
      visibleProperties: get().filteredProperties, // ✅ restore filters
    });

    const map = get().map;
    map?.panTo({ lat: 12.9716, lng: 77.5946 });
    map?.setZoom(11);
  },

  applyFilters: () => {
    const {
      priceMin,
      priceMax,
      flexibleBudget,
      configuration,
      propertyType,
      status,
    } = useFilterStore.getState();

    const base = mockProperties; // ✅ always full dataset

    let strict = base.filter(
      (p: any) => p.price >= (priceMin ?? 0) && p.price <= (priceMax ?? Infinity)
    );

    let recommended: any[] = [];
    if (flexibleBudget && priceMax) {
      recommended = base.filter(
        (p: any) => p.price > priceMax && p.price <= priceMax * 1.1
      );
    }

    if (configuration.length) {
      strict = strict.filter((p) => configuration.includes(p.configuration));
      recommended = recommended.filter((p) =>
        configuration.includes(p.configuration)
      );
    }

    if (propertyType.length) {
      strict = strict.filter((p) =>
        propertyType.includes(p.propertyType)
      );
      recommended = recommended.filter((p) =>
        propertyType.includes(p.propertyType)
      );
    }

    if (status.length) {
      strict = strict.filter((p) => status.includes(p.status));
      recommended = recommended.filter((p) =>
        status.includes(p.status)
      );
    }

    const { drawnPolygon, drawingMode } = get();
    const hasSpatialOverride = !!drawnPolygon || drawingMode;

    set({
      filteredProperties: strict,
      recommendedProperties: recommended,
      ...(hasSpatialOverride ? {} : { visibleProperties: strict }),
    });
  },
}));
