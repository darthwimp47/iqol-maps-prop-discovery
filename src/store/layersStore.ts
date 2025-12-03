// src/store/layersStore.ts
import { create } from "zustand";
import { mapLayers } from "../components/map/MapLayers";

interface LayersState {
  visibleLayers: Record<string, boolean>;
  toggleLayer: (key: string) => void;
  setLayerVisibility: (key: string, value: boolean) => void;
  resetLayers: () => void;
}

export const useLayersStore = create<LayersState>((set) => ({
  // Initialize based on mapLayers config default visibility
  visibleLayers: mapLayers.reduce((acc, layer) => {
    acc[layer.key] = layer.visible ?? false;
    return acc;
  }, {} as Record<string, boolean>),

  // Toggle layer on/off
  toggleLayer: (key: string) =>
    set((state) => ({
      visibleLayers: {
        ...state.visibleLayers,
        [key]: !state.visibleLayers[key],
      },
    })),

  // Set explicit visibility for some cases
  setLayerVisibility: (key, value) =>
    set((state) => ({
      visibleLayers: {
        ...state.visibleLayers,
        [key]: value,
      },
    })),

  // Reset everything back to default
  resetLayers: () =>
    set(() => ({
      visibleLayers: mapLayers.reduce((acc, layer) => {
        acc[layer.key] = layer.visible ?? false;
        return acc;
      }, {} as Record<string, boolean>),
    })),
}));
