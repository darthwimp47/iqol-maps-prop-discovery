import { create } from "zustand";
import { mockProperties } from "../mock/properties.mock";
import { useFilterStore } from "./filtersStore";

interface DrawPolygon {
  polygon: google.maps.Polygon;
  path: { lat: number; lng: number }[];
}

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

  drawnPolygons: DrawPolygon[];

  addDrawPolygon: (
    polygon: google.maps.Polygon,
    path: { lat: number; lng: number }[]
  ) => void;

  applyDrawArea: () => void;
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

  drawnPolygons: [],

  addDrawPolygon: (polygon, path) =>
    set((state) => ({
      drawnPolygons: [...state.drawnPolygons, { polygon, path }],
    })),

  applyDrawArea: () => {
    const { drawnPolygons } = get();
    if (drawnPolygons.length === 0) return;

    // Step 1: Apply existing DATA filters first
    get().applyFilters();

    const g = google.maps.geometry.poly;
    let final = get().filteredProperties;
    let recommended = get().recommendedProperties;

    // Step 2: Apply LOCATION filter (OR logic)
    final = final.filter((p: any) =>
      drawnPolygons.some(({ polygon }) =>
        g.containsLocation(
          new google.maps.LatLng(p.lat, p.lng),
          polygon
        )
      )
    );

    recommended = recommended.filter((p: any) =>
      drawnPolygons.some(({ polygon }) =>
        g.containsLocation(
          new google.maps.LatLng(p.lat, p.lng),
          polygon
        )
      )
    );

    set({
      filteredProperties: final,
      visibleProperties: final,
      recommendedProperties: recommended,
      drawingMode: false,
    });
  },

  resetDrawArea: () => {
    const { drawnPolygons, map } = get();

    drawnPolygons.forEach(({ polygon }) => polygon.setMap(null));

    set({
      drawnPolygons: [],
      drawingMode: false,
    });

    // Re-apply current filters on the FULL dataset
    get().applyFilters();

    // Re-apply viewport logic (bounds based)
    const bounds = map?.getBounds();
    if (map && bounds) {
      const filtered = get().filteredProperties;
      const visible = filtered.filter((p: any) =>
        bounds.contains(new google.maps.LatLng(p.lat, p.lng))
      );
      set({ visibleProperties: visible });
    }
  },

  applyFilters: () => {
    const {
      priceMin,
      priceMax,
      configuration,
      propertyType,
      status,
      flexibleBudget,
    } = useFilterStore.getState();

    let final = mockProperties;

    // 1 — APPLY DATA FILTERS
    final = final.filter((p: any) => {
      if (priceMin !== null && p.price < priceMin) return false;
      if (priceMax !== null && p.price > priceMax) return false;

      if (configuration.length > 0 && !configuration.includes(p.configuration))
        return false;

      if (propertyType.length > 0 && !propertyType.includes(p.propertyType))
        return false;

      if (status.length > 0 && !status.includes(p.status))
        return false;

      return true;
    });

    // 2 — FLEXIBLE BUDGET
    let recommended: any[] = [];
    if (flexibleBudget && priceMax) {
      recommended = final.filter(
        (p) => p.price > priceMax && p.price <= priceMax * 1.1
      );
    }

    set({
      filteredProperties: final,
      visibleProperties: final,
      recommendedProperties: recommended,
    });
  },
}));
