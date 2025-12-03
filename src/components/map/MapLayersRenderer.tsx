import { useEffect, useRef } from "react";
import { useMapStore } from "../../store/mapStore";
import { useLayersStore } from "../../store/layersStore";
import { mapLayers } from "./MapLayers";
import { geoJsonStyles, handleGeoJsonClick } from "./GeoJsonStyles";

export function MapLayersRenderer() {
    const { map } = useMapStore();
    const { visibleLayers } = useLayersStore();

    const layerInstances = useRef<Record<string, any>>({});
    const geojsonCache = useRef<Record<string, any>>({});

    useEffect(() => {
        if (!map) return;
        // We'll support three layer types:
        // - raster: ImageMapType (tile URL templates)
        // - vector: treated like raster (ImageMapType) for Mapbox raster tiles or tile endpoints
        // - geojson: fetch JSON and add to google.maps.Data
        mapLayers.forEach((layer) => {
            const isVisible = Boolean(visibleLayers[layer.key]);
            const existing = layerInstances.current[layer.key];

            // REMOVE
            if (!isVisible && existing) {
                try {
                    if (layer.type === "geojson") {
                        // Data layer stored as { data, infoWindow, listener }
                        if (existing.listener) {
                            try {
                                google.maps.event.removeListener(existing.listener);
                            } catch (e) {}
                        }
                        try {
                            (existing.data as google.maps.Data).setMap(null);
                        } catch (e) {}
                        try {
                            existing.infoWindow.close();
                        } catch (e) {}
                    } else {
                        // ImageMapType (raster/vector) stored as { instance }
                        const arr = map.overlayMapTypes.getArray();
                        const idx = arr.indexOf((existing as { instance?: google.maps.ImageMapType }).instance ?? existing);
                        if (idx > -1) map.overlayMapTypes.removeAt(idx);
                    }
                } catch (e) {
                    // swallow removal errors
                }

                delete layerInstances.current[layer.key];
                return;
            }

            // ADD
            if (isVisible && !existing) {
                // GEOJSON: fetch and add
                if (layer.type === "geojson" && layer.geojsonUrl) {
                    const applyGeoJson = (json: any) => {
                        const data = new google.maps.Data();
                        try {
                            data.addGeoJson(json);
                        } catch (err) {
                            // If addGeoJson throws, try loadGeoJson fallback
                            try {
                                data.loadGeoJson(layer.geojsonUrl!);
                            } catch (e) {}
                        }

                        // Apply style: support function or object from geoJsonStyles
                        const styleDef = (geoJsonStyles as any)[layer.key];
                        if (typeof styleDef === "function") {
                            data.setStyle((feature: google.maps.Data.Feature) => styleDef(feature));
                        } else if (styleDef) {
                            data.setStyle(styleDef);
                        } else {
                            data.setStyle({ strokeColor: "#111", strokeWeight: 2 });
                        }

                        data.setMap(map);

                        // InfoWindow for popups
                        const info = new google.maps.InfoWindow();
                        const listener = data.addListener("click", (e: google.maps.Data.MouseEvent) =>
                            handleGeoJsonClick(layer.key, e, info, map)
                        );

                        layerInstances.current[layer.key] = { data, info, listener };
                    };

                    // Use cache to avoid repeated fetches
                    if (geojsonCache.current[layer.key]) {
                        applyGeoJson(geojsonCache.current[layer.key]);
                        return;
                    }

                    fetch(layer.geojsonUrl)
                        .then((r) => {
                            if (!r.ok) throw new Error("Failed to fetch geojson");
                            return r.json();
                        })
                        .then((json) => {
                            geojsonCache.current[layer.key] = json;
                            applyGeoJson(json);
                        })
                        .catch(() => {
                            // ignore fetch errors for now
                        });

                    return;
                }

                // RASTER or VECTOR: create ImageMapType
                if ((layer.type === "raster" || layer.type === "vector") && layer.urlTemplate) {
                    const img = new google.maps.ImageMapType({
                        getTileUrl: (coord, zoom) =>
                            layer.urlTemplate!
                                .replace("{z}", String(zoom))
                                .replace("{x}", String(coord.x))
                                .replace("{y}", String(coord.y)),
                        tileSize: new google.maps.Size(256, 256),
                        opacity: layer.defaultOpacity ?? 1,
                    });

                    map.overlayMapTypes.push(img);
                    // store instance for later removal
                    layerInstances.current[layer.key] = { instance: img };
                    return;
                }
            }
        });
    }, [map, visibleLayers]);

    return null;
}
