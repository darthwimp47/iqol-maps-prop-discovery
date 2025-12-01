import { useMapStore } from "../../store/mapStore";

export function ListingCard({ property }: { property: any }) {
  const { setSelectedPropertyId, selectedPropertyId, setHoveredPropertyId, map } =
    useMapStore();

  const active = selectedPropertyId === property.id;

  return (
    <div
      onMouseEnter={() => setHoveredPropertyId(property.id)}
      onMouseLeave={() => setHoveredPropertyId(null)}
      onClick={() => {
        setSelectedPropertyId(property.id);
        map?.panTo({ lat: property.lat, lng: property.lng });
        map?.setZoom(15);
      }}
      style={{
        display: "flex",
        gap: "12px",
        padding: "12px 16px",
        borderBottom: "1px solid #eee",
        cursor: "pointer",
        background: active ? "#f0f7ff" : "white",
        transition: "0.2s",
      }}
    >
      <div
        style={{
          width: "120px",
          height: "90px",
          background: "#ddd",
          borderRadius: "8px",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ fontSize: "16px", fontWeight: 600 }}>
          ₹{(property.price / 10000000).toFixed(1)} Cr
        </div>
        <div style={{ fontSize: "14px" }}>{property.configuration}</div>
        <div style={{ fontSize: "13px", color: "#666" }}>{property.micromarket}</div>
      </div>
    </div>
  );
}
