import { useEffect, useRef, useState } from "react";
import { useFilterStore } from "../../store/filtersStore";
import { useMapStore } from "../../store/mapStore";

const typeOptions = ["Apartment", "Villa", "Plot"];

export function PropertyTypeDropdown() {
  const {
    propertyType,
    setPropertyType,
    closePropertyTypeDropdown,
  } = useFilterStore();

  const [localTypes, setLocalTypes] = useState(propertyType);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) return;
      if ((event.target as Element).closest("[data-filter-bar]")) return;

      closePropertyTypeDropdown();
    }

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function toggle(val: string) {
    setLocalTypes((prev) =>
      prev.includes(val) ? prev.filter((p) => p !== val) : [...prev, val]
    );
  }

  function applyFilters() {
    setPropertyType(localTypes);
    useMapStore.getState().applyFilters();
    closePropertyTypeDropdown();
  }

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: 0,
        left: "49%",
        transform: "translateY(45px)",
        width: "220px",
        padding: "18px",
        background: "white",
        border: "1px solid #dcdcdc",
        borderRadius: "10px",
        zIndex: 9999,
        boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
      }}
    >
      <h4 style={{ margin: "0 0 14px", fontSize: "15px", fontWeight: 600, color: "#333" }}>
        Property Type
      </h4>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
        {typeOptions.map((t) => {
          const active = localTypes.includes(t);
          return (
            <button
              key={t}
              onClick={() => toggle(t)}
              style={{
                padding: "8px 14px",
                borderRadius: "20px",
                border: active ? "2px solid #111" : "1px solid #ccc",
                background: active ? "#111" : "white",
                color: active ? "white" : "#333",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              {t}
            </button>
          );
        })}
      </div>

      <button
        onClick={applyFilters}
        style={{
          width: "100%",
          padding: "10px",
          background: "#111",
          color: "white",
          fontWeight: 600,
          borderRadius: "6px",
          cursor: "pointer",
          border: "none",
        }}
      >
        Apply
      </button>
    </div>
  );
}
