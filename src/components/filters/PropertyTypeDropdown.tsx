import { useEffect, useRef, useState } from "react";
import { useFilterStore } from "../../store/filtersStore";
import { useMapStore } from "../../store/mapStore";

const propertyOptions = ["Apartment", "Villa", "Plot", "Commercial", "Studio"];

export function PropertyTypeDropdown() {
  const {
    propertyType,
    setPropertyType,
    closePropertyTypeDropdown,
  } = useFilterStore();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [localPropertyType, setLocalPropertyType] = useState<string[]>(propertyType);

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
    useMapStore.getState().applyFilters();
    closePropertyTypeDropdown();
  }

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      className="
        absolute top-[-51px] right-[8.7%] translate-y-[45px]
        w-[310px] p-[18px] bg-white
        border border-[#dcdcdc] rounded-[10px]
        shadow-[0_4px_10px_rgba(0,0,0,0.12)]
        z-[150] pointer-events-auto
      "
    >
      <h4 className="mb-[14px] text-[15px] font-semibold text-[#333]">
        Property Type
      </h4>

      <div className="flex flex-wrap gap-[8px] mb-[18px]">
        {propertyOptions.map((type) => {
          const active = localPropertyType.includes(type);
          return (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`
                px-[14px] py-[8px] rounded-[24px] text-[14px] font-medium cursor-pointer
                ${active
                  ? "bg-[#111] text-white border-2 border-[#111]"
                  : "bg-white text-[#333] border border-[#ccc]"
                }
              `}
            >
              {type}
            </button>
          );
        })}
      </div>

      <button
        onClick={applyFilters}
        className="
          w-full py-[10px] rounded-[6px]
          bg-[#111] text-white font-semibold text-[15px]
          cursor-pointer border-none
        "
      >
        Apply
      </button>
    </div>
  );
}
