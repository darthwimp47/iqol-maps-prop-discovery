import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
import { useCallback, useEffect } from "react";
import { useMapStore } from "../../store/mapStore";
import { useMapsApi } from "../../context/MapsContext";
import { PropertyPopup } from "./PropertyPopup";
import { mockProperties } from "../../mock/properties.mock";
import { DrawTool } from "./DrawTool";
import { DrawOverlay } from "./DrawOverlay";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const bangaloreCenter = { lat: 12.9716, lng: 77.5946 };

export function GoogleMapContainer() {
  const { isLoaded, loadError } = useMapsApi();

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
                ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                : isActive || isHover
                  ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                  : "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new google.maps.Size(
                isRecommended ? 55 : isActive || isHover ? 50 : 40,
                isRecommended ? 55 : isActive || isHover ? 50 : 40
              ),
            }}
          />
        );
      })}
      <DrawOverlay />
      <DrawTool />
    </GoogleMap>
  );
}

export default GoogleMapContainer;
