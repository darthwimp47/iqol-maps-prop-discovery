import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { useMapStore } from "../../store/mapStore";
import { useMapsApi } from "../../context/MapsContext";
import { PropertyPopup } from "./PropertyPopup";
import { mockProperties } from "../../mock/properties.mock";
import { DrawTool } from "./DrawTool";
import { DrawOverlay } from "./DrawOverlay";
import { LayersControl } from "./LayersControl";
import { MapLayersRenderer } from "./MapLayersRenderer";
import { MapLegend } from "./MapLegend";
import { useLayersStore } from "../../store/layersStore";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface gMapProps{
  isMobile?: boolean
}
const bangaloreCenter = { lat: 12.9716, lng: 77.5946 };

export function GoogleMapContainer(isMobile : gMapProps) {
  const { isLoaded, loadError } = useMapsApi();
  const [legendVisible, setLegendVisible] = useState(false);
  const [legendMinimized, setLegendMinimized] = useState(false);
  const { visibleLayers } = useLayersStore();

  const {
    map,
    setMap,
    setBounds,
    setCenter,
    setZoom,
    selectedPropertyId,
    setSelectedPropertyId,
    hoveredPropertyId,
    setHoveredPropertyId,
    setVisibleProperties,
    filteredProperties,
    recommendedProperties,
  } = useMapStore();

  // Derive infrastructure filters from visibleLayers
  const infrastructureFilters = {
    metro: Boolean(visibleLayers["metro_lines"]),
    suburbanRailway: Boolean(visibleLayers["suburb_railway"]),
    water: Boolean(visibleLayers["water_lines"]),
    sewage: Boolean(visibleLayers["sewage_lines"]),
    majorRoads: Boolean(visibleLayers["major_roads"]),
  };

  // Derive planning filters (CDP maps)
  const planningFilters = {
    bda_2015_compiled: Boolean(visibleLayers["bda_2015_compiled"]),
  };

  // Auto-open legend when any layer is checked
  useEffect(() => {
    const hasAnyLayerVisible =
      Object.values(infrastructureFilters).some(Boolean) ||
      Object.values(planningFilters).some(Boolean);

    if (hasAnyLayerVisible) {
      setLegendVisible(true);
      setLegendMinimized(false);   // expand automatically when new layer toggled
    }
  }, [visibleLayers]);

  // Compute marker dataset correctly
  const baseProperties =
    filteredProperties.length > 0 || recommendedProperties.length > 0
      ? [...filteredProperties, ...recommendedProperties]
      : mockProperties;

  const onLoad = useCallback(
    (mapInstance: google.maps.Map) => {
      setMap(mapInstance);

      const bounds = mapInstance.getBounds();
      if (bounds) {
        const visible = baseProperties.filter((p) =>
          bounds!.contains(new google.maps.LatLng(p.lat, p.lng))
        );
        setVisibleProperties(visible);
      }
    },
    [setMap, setVisibleProperties, baseProperties]
  );

  useEffect(() => {
    if (!map) return;

    const listener = map.addListener("bounds_changed", () => {
      const { drawnPolygon, drawingMode } = useMapStore.getState();
      if (drawnPolygon || drawingMode) return; // stop bounds updates while polygon active

      const center = map.getCenter();
      setCenter({
        lat: center?.lat() ?? bangaloreCenter.lat,
        lng: center?.lng() ?? bangaloreCenter.lng,
      });

      setZoom(map.getZoom() ?? 11);

      const newBounds = map.getBounds();
      setBounds(newBounds ?? null);

      if (newBounds) {
        const visible = baseProperties.filter((p) =>
          newBounds.contains(new google.maps.LatLng(p.lat, p.lng))
        );
        setVisibleProperties(visible);
      }
    });

    return () => google.maps.event.removeListener(listener);
  }, [map, baseProperties]);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={bangaloreCenter}
      zoom={11}
      onLoad={onLoad}
      onClick={() => setSelectedPropertyId(null)}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        gestureHandling: "greedy",
        mapId: import.meta.env.VITE_GOOGLE_MAP_ID,
      }}
    >
      {/* POPUP */}
      {selectedPropertyId && (() => {
        const p = baseProperties.find((x) => x.id === selectedPropertyId);
        if (!p) return null;

        return (
          <OverlayView
            position={{ lat: p.lat, lng: p.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={{ transform: "translate(-50%, 240px)" }}>
              <PropertyPopup property={p} />
            </div>
          </OverlayView>
        );
      })()}

      {/* MARKERS */}
      {baseProperties.map((p) => {
        const isRecommended = recommendedProperties.some((r) => r.id === p.id);
        const isActive = selectedPropertyId === p.id;
        const isHover = hoveredPropertyId === p.id;

        return (
          <Marker
            key={p.id}
            position={{ lat: p.lat, lng: p.lng }}
            onMouseOver={() => setHoveredPropertyId(p.id)}
            onMouseOut={() => setHoveredPropertyId(null)}
            onClick={() => {
              setSelectedPropertyId(p.id);
              map?.panTo({ lat: p.lat, lng: p.lng });
            }}
            icon={{
              url: isRecommended
                ? "src/assets/recommendedPin.png"
                : isActive || isHover
                  ? "src/assets/hoverPin.png"
                  : "src/assets/defaultPin.png",
              scaledSize: new google.maps.Size(
                isRecommended ? 40 : isActive || isHover ? 40 : 30,
                isRecommended ? 40 : isActive || isHover ? 40 : 30
              ),
            }}
          />
        );
      })}
      <MapLayersRenderer />
      <DrawOverlay />
      <DrawTool/>
      <LayersControl />
      <MapLegend
        visible={legendVisible}
        onClose={() => setLegendVisible(false)}
        minimized={legendMinimized}
        onToggle={() => setLegendMinimized(!legendMinimized)}
        infrastructureFilters={infrastructureFilters}
        planningFilters={planningFilters}
      />
    </GoogleMap>
  );
}

export default GoogleMapContainer;
