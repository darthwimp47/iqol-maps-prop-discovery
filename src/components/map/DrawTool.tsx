import { useRef, useEffect } from "react";
import { useMapStore } from "../../store/mapStore";
import { useFilterStore } from "../../store/filtersStore";

export function DrawTool({ isMobile }: { isMobile: boolean }) {
  const {
    map,
    drawingMode,
    setDrawingMode,
    drawnPolygon,
    setDrawnPolygon,
    setVisibleProperties,
    setPreDrawSnapshot,
    resetDrawArea,
  } = useMapStore();

  const polylineRef = useRef<google.maps.Polyline | null>(null);
  const startListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const mouseMoveRef = useRef<google.maps.MapsEventListener | null>(null);
  const mouseUpRef = useRef<google.maps.MapsEventListener | null>(null);

  const beginDraw = () => {
    if (!map || drawingMode) return;
    useFilterStore.getState().closeAllDropdowns?.();

    setDrawingMode(true);

    startListenerRef.current = map.addListener("mousedown", (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;

      setPreDrawSnapshot(
        useMapStore.getState().visibleProperties,
        useMapStore.getState().filteredProperties
      );

      map.setOptions({
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        draggableCursor: "crosshair",
      });

      const polyline = new google.maps.Polyline({
        map,
        clickable: false,
        strokeColor: "#1a73e8",
        strokeWeight: 2,
      });

      polylineRef.current = polyline;
      polyline.getPath().push(e.latLng);

      mouseMoveRef.current = map.addListener("mousemove", (moveEvt: google.maps.MapMouseEvent) => {
        if (moveEvt.latLng && polylineRef.current) polylineRef.current.getPath().push(moveEvt.latLng);
      });

      mouseUpRef.current = map.addListener("mouseup", () => finishDraw());

      google.maps.event.removeListener(startListenerRef.current!);
      startListenerRef.current = null;
    });
  };

  const finishDraw = () => {
    if (!map || !polylineRef.current) return;

    const path = polylineRef.current.getPath().getArray();
    polylineRef.current.setMap(null);
    polylineRef.current = null;

    const polygon = new google.maps.Polygon({
      map,
      paths: path,
      fillColor: "#1a73e8",
      fillOpacity: 0.2,
      strokeColor: "#1a73e8",
      strokeWeight: 2,
    });

    const pathArray = path.map((pt) => ({
      lat: pt.lat(),
      lng: pt.lng(),
    }));

    setDrawnPolygon(polygon, pathArray);
    setDrawingMode(false);

    map.setOptions({
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: false,
      draggableCursor: "grab",
    });

    if (mouseMoveRef.current) google.maps.event.removeListener(mouseMoveRef.current);
    if (mouseUpRef.current) google.maps.event.removeListener(mouseUpRef.current);

    const g = google.maps.geometry.poly;

    const allBase = [
      ...useMapStore.getState().filteredProperties,
      ...useMapStore.getState().recommendedProperties,
      useMapStore.getState().visibleProperties,
    ];

    const inside = allBase.filter((p: any) =>
      g.containsLocation(new google.maps.LatLng(p.lat, p.lng), polygon)
    );

    setVisibleProperties(inside);
  };

  const clearPolygon = () => {
    resetDrawArea();
  };

  useEffect(() => {
    if (!drawingMode && startListenerRef.current) {
      google.maps.event.removeListener(startListenerRef.current);
      startListenerRef.current = null;
    }
  }, [drawingMode]);

  return (
    <div
      className={
        isMobile
          ? "absolute bottom-[90px] right-[10px] z-[100]"  // below filter row
          : "absolute top-[10px] right-[10px] z-[100]"
      }
    >      {!drawingMode && !drawnPolygon && (
      <button
        onClick={beginDraw}
        className="px-3 py-1.5 bg-white text-black font-semibold border border-black rounded-[3px] cursor-pointer"
      >
        Draw
      </button>
    )}

      {!drawingMode && drawnPolygon && (
        <button
          onClick={clearPolygon}
          className="px-3 py-1.5 bg-white text-black font-semibold border border-black rounded-[3px] cursor-pointer"
        >
          Remove Boundary
        </button>
      )}
    </div>
  );
}
