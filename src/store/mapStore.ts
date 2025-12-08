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

  // DRAWING
  drawingMode: boolean;
  setDrawingMode: (v: boolean) => void;

  drawnPolygon: google.maps.Polygon | null;
  drawnPolygonPath: { lat: number; lng: number }[];        // <-- NEW
  setDrawnPolygon: (
    poly: google.maps.Polygon | null,
    path?: { lat: number; lng: number }[] | null
  ) => void;

  // Snapshot before drawing
  preDrawVisible?: any[];
  preDrawFiltered?: any[];
  setPreDrawSnapshot: (vis: any[], filt: any[]) => void;
  clearPreDrawSnapshot: () => void;

  resetDrawArea: () => void;
  applyDrawArea: () => void;

  visibleProperties: any[];
  setVisibleProperties: (properties: any[]) => void;

  filteredProperties: any[];
  recommendedProperties: any[];

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

  visibleProperties: mockProperties,
  setVisibleProperties: (properties) => set({ visibleProperties: properties }),

  filteredProperties: mockProperties,
  recommendedProperties: [],

  // DRAWING
  drawingMode: false,
  setDrawingMode: (v) => set({ drawingMode: v }),

  drawnPolygon: null,
  drawnPolygonPath: [],                                       // <-- NEW

  setDrawnPolygon: (poly, path = null) =>
    set(() => ({
      drawnPolygon: poly,
      drawnPolygonPath: path ?? get().drawnPolygonPath,       // <-- NEW
    })),

  // Pre-draw snapshot for exact restore if the user cancels
  preDrawVisible: undefined,
  preDrawFiltered: undefined,
  setPreDrawSnapshot: (vis, filt) => set({ preDrawVisible: vis, preDrawFiltered: filt }),
  clearPreDrawSnapshot: () => set({ preDrawVisible: undefined, preDrawFiltered: undefined }),

  resetDrawArea: () => {
    const poly = get().drawnPolygon;
    if (poly) poly.setMap(null);

    const preVis = get().preDrawVisible;
    const preFilt = get().preDrawFiltered;

    set({
      drawnPolygon: null,
      drawnPolygonPath: [],                                   // <-- CLEAR PATH
      drawingMode: false,
      visibleProperties: preVis ?? get().filteredProperties,
      filteredProperties: preFilt ?? get().filteredProperties,
    });

    get().clearPreDrawSnapshot();

    const map = get().map;
    map?.panTo({ lat: 12.9716, lng: 77.5946 });
    map?.setZoom(11);
  },

  applyDrawArea: () => {
    const visible = get().visibleProperties;

    set({
      filteredProperties: visible,
      recommendedProperties: [],
      drawingMode: false,
    });

    get().clearPreDrawSnapshot();
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

    const base = get().visibleProperties;

    let strictResults = base.filter(
      (p: any) => p.price >= (priceMin ?? 0) && p.price <= (priceMax ?? Infinity)
    );

    let recommended: any[] = [];
    if (flexibleBudget && priceMax) {
      recommended = base.filter(
        (p: any) => p.price > priceMax && p.price <= priceMax * 1.1
      );
    }

    if (configuration.length > 0) {
      strictResults = strictResults.filter((p) =>
        configuration.includes(p.configuration)
      );
      recommended = recommended.filter((p) =>
        configuration.includes(p.configuration)
      );
    }

    if (propertyType.length > 0) {
      strictResults = strictResults.filter((p) =>
        propertyType.includes(p.propertyType)
      );
      recommended = recommended.filter((p) =>
        propertyType.includes(p.propertyType)
      );
    }

    if (status.length > 0) {
      strictResults = strictResults.filter((p) =>
        status.includes(p.status)
      );
      recommended = recommended.filter((p) =>
        status.includes(p.status)
      );
    }

    set({
      filteredProperties: strictResults,
      recommendedProperties: recommended,
    });
  },
}));
