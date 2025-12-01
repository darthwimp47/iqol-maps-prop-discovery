import { useEffect, useRef, useState } from "react";
import { useFilterStore } from "../../store/filtersStore";
import { useMapStore } from "../../store/mapStore";

export function ConfigDropdown() {
  const {
    configuration,
    setConfiguration,
    closeConfigDropdown,
  } = useFilterStore();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [localConfig, setLocalConfig] = useState(configuration);

  const options = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];

  // Outside click closes dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      // If click is inside the dropdown, do nothing
      if (dropdownRef.current && dropdownRef.current.contains(target as Node)) return;

      // If click happened inside the FiltersBar (the filter buttons), ignore it so
      // the FiltersBar's own click handler can toggle the dropdown without
      // interference from this outside-click handler.
      if (target && (target as Element).closest && (target as Element).closest('[data-filter-bar]')) {
        return;
      }

      // Otherwise close the dropdown
      closeConfigDropdown();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggle(val: string) {
    setLocalConfig((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }

  function applyFilters() {
    setConfiguration(localConfig);
    useMapStore.getState().applyFilters();
    closeConfigDropdown();
  }

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top:-47,
        right: "24.4%",
        transform: "translateY(45px)",
        width: "280px",
        padding: "18px",
        background: "white",
        border: "1px solid #dcdcdc",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
        zIndex: 150,
      }}
    >
      <h4 style={{ margin: "0 0 14px", fontSize: "15px", fontWeight: 600, color: "#333" }}>
        Configuration
      </h4>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
        {options.map((opt) => {
          const active = localConfig.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              style={{
                padding: "8px 14px",
                border: active ? "2px solid #111" : "1px solid #ccc",
                background: active ? "#111" : "white",
                color: active ? "white" : "#333",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <button
        onClick={applyFilters}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          background: "#111",
          color: "white",
          fontWeight: 600,
          fontSize: "15px",
        }}
      >
        Apply
      </button>


    </div>
  );
}
