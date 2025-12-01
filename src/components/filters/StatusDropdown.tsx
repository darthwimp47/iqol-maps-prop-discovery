import { useEffect, useRef, useState } from "react";
import { useFilterStore } from "../../store/filtersStore";
import { useMapStore } from "../../store/mapStore";

const options = ["Under Construction", "Ready to Move", "Completed", "Booking Open"];

export function StatusDropdown() {
  const { status, setStatus, closeStatusDropdown } = useFilterStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [localStatus, setLocalStatus] = useState(status);

  function toggle(val: string) {
    setLocalStatus((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }

  function applyFilters() {
    setStatus(localStatus);
    useMapStore.getState().applyFilters(); // same behavior as other dropdowns
    closeStatusDropdown();
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current?.contains(target)) return;
      if ((target as Element).closest?.("[data-filter-bar]")) return;
      closeStatusDropdown();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeStatusDropdown]);

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: -47,
        right: "33.5%",
        transform: "translateY(45px)",
        width: "300px",
        padding: "18px",
        background: "white",
        border: "1px solid #dcdcdc",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
        zIndex: 150,
      }}
    >
      <h4 style={{ margin: "0 0 14px", fontSize: "15px", fontWeight: 600, color: "#333" }}>
        Status
      </h4>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
        {options.map((opt) => {
          const active = localStatus.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              style={{
                padding: "10px 16px",
                borderRadius: "24px",
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
          background: "#111",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "15px",
        }}
      >
        Apply
      </button>
    </div>
  );
}
