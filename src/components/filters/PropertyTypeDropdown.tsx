import { useEffect, useRef, useState } from "react";
import { useFilterStore } from "../../store/filtersStore";
import { useMapStore } from "../../store/mapStore"; // 🆕 for applyFilters()

const propertyOptions = ["Apartment", "Villa", "Plot", "Commercial", "Studio"];

export function PropertyTypeDropdown() {
    const {
        propertyType,
        setPropertyType,
        closePropertyTypeDropdown,
    } = useFilterStore();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [localPropertyType, setLocalPropertyType] = useState<string[]>(propertyType);

    // Outside click close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node | null;

            if (dropdownRef.current && dropdownRef.current.contains(target)) return;
            if ((target as Element).closest("[data-filter-bar]")) return;

            closePropertyTypeDropdown();
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function toggleType(t: string) {
        setLocalPropertyType((prev) =>
            prev.includes(t) ? prev.filter((v) => v !== t) : [...prev, t]
        );
    }

    function applyFilters() {
        setPropertyType(localPropertyType);
        useMapStore.getState().applyFilters(); // 🆕 connect filtering to listing panel
        closePropertyTypeDropdown();
    }

    return (
        <div
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()}
            style={{
                position: "absolute",
                top: -47,
                right: "14.5%",
                transform: "translateY(45px)",
                width: "280px",
                padding: "18px",
                background: "white",
                border: "1px solid #dcdcdc",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                zIndex: 5000,          // <--- raised above everything else
                pointerEvents: "auto",
            }}
        >
            <h4 style={{ margin: "0 0 14px", fontSize: "15px", fontWeight: 600, color: "#333" }}>
                Property Type
            </h4>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "18px" }}>
                {propertyOptions.map((type) => {
                    const active = localPropertyType.includes(type);
                    return (
                        <button
                            key={type}
                            onClick={() => toggleType(type)}
                            style={{
                                padding: "8px 14px",
                                borderRadius: "24px",
                                border: active ? "2px solid #111" : "1px solid #ccc",
                                background: active ? "#111" : "white",
                                color: active ? "white" : "#333",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: 500,
                            }}
                        >
                            {type}
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
