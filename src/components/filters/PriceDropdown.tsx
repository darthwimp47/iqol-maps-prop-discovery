import React, { useEffect, useRef, useState } from "react";
import { useFilterStore } from "../../store/filtersStore";
import { useMapStore } from "../../store/mapStore";

export function PriceDropdown() {
  const {
    priceMin,
    priceMax,
    setPriceRange,
    strictBudget,
    setStrictBudget,
    flexibleBudget,
    setFlexibleBudget,
    closePriceDropdown,
  } = useFilterStore();

  const [localMin, setLocalMin] = useState(priceMin ?? "");
  const [localMax, setLocalMax] = useState(priceMax ?? "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click, but ignore clicks inside the FiltersBar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node | null;
      if (!target) return;

      // If click is inside the dropdown, do nothing
      if (dropdownRef.current && dropdownRef.current.contains(target)) return;

      // If click happened inside the FiltersBar (the filter buttons), ignore it
      if ((target as Element).closest && (target as Element).closest('[data-filter-bar]')) {
        return;
      }

      closePriceDropdown();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePriceDropdown]);

  function applyFilters() {
    const min = localMin === "" ? null : Number(localMin);
    const max = localMax === "" ? null : Number(localMax);

    setPriceRange(min, max);
    useMapStore.getState().applyFilters();
    closePriceDropdown();
  }

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: -47,
        right: "32.7%",
        transform: "translateY(45px)",
        width: "250px",
        height: "auto",
        padding: "18px",
        background: "white",
        border: "1px solid #dcdcdc",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
        zIndex: 150,
        color: "#333",
      }}
    >
      <h4 style={{ margin: "0 0 12px", fontSize: "15px", fontWeight: 600 }}>
        Price Range
      </h4>

      <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
        <input
          type="number"
          placeholder="Min"
          value={localMin}
          onChange={(e) => setLocalMin(e.target.value)}
          style={inputBox}
        />

        <input
          type="number"
          placeholder="Max"
          value={localMax}
          onChange={(e) => setLocalMax(e.target.value)}
          style={inputBox}
        />
      </div>

      <div style={{ marginBottom: "14px" }}>
        <label style={checkboxStyle}>
          <input
            type="checkbox"
            checked={strictBudget}
            onChange={() => setStrictBudget(!strictBudget)}
          />
          Strict — Show only within range
        </label>

        <label style={checkboxStyle}>
          <input
            type="checkbox"
            checked={flexibleBudget}
            onChange={() => setFlexibleBudget(!flexibleBudget)}
          />
          Flexible — Include up to +10%
        </label>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={applyFilters} style={applyBtn}>
          Apply
        </button>
      </div>
    </div>
  );
}

const inputBox: React.CSSProperties = {
  padding: "10px",
  border: "1px solid #ccc",
  background: "#fafafa",
  borderRadius: "6px",
  fontSize: "14px",
  color: "#333",
  width: "100px",
};

const checkboxStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "14px",
  marginBottom: "6px",
};

const applyBtn: React.CSSProperties = {
  padding: "8px 18px",
  borderRadius: "6px",
  background: "#111",
  color: "white",
  cursor: "pointer",
  fontWeight: 600,
  border: "none",
  width: "100%",
};
