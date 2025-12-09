import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node | null;
      if (!target) return;

      if (dropdownRef.current && dropdownRef.current.contains(target)) return;

      if ((target as Element).closest && (target as Element).closest("[data-filter-bar]")) return;

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
      className="
        absolute top-[-51px] right-[31.5%] translate-y-[45px]
        w-[250px] h-auto p-[18px]
        bg-white border border-[#dcdcdc] rounded-[10px]
        shadow-[0_4px_10px_rgba(0,0,0,0.12)]
        z-[150] text-[#333]
      "
    >
      <h4 className="mb-3 text-[15px] font-semibold">Price Range</h4>

      <div className="flex gap-[10px] mb-[14px]">
        <input
          type="number"
          placeholder="Min"
          value={localMin}
          onChange={(e) => setLocalMin(e.target.value)}
          className="
            px-[10px] py-[10px] w-[100px]
            border border-[#ccc] rounded-[6px]
            bg-[#fafafa] text-[14px] text-[#333]
            outline-none
          "
        />

        <input
          type="number"
          placeholder="Max"
          value={localMax}
          onChange={(e) => setLocalMax(e.target.value)}
          className="
            px-[10px] py-[10px] w-[100px]
            border border-[#ccc] rounded-[6px]
            bg-[#fafafa] text-[14px] text-[#333]
            outline-none
          "
        />
      </div>

      <div className="mb-[14px]">
        <label className="flex items-center gap-[6px] text-[14px] mb-[6px]">
          <input
            type="checkbox"
            checked={strictBudget}
            onChange={() => setStrictBudget(!strictBudget)}
          />
          Strict — Show only within range
        </label>

        <label className="flex items-center gap-[6px] text-[14px] mb-[6px]">
          <input
            type="checkbox"
            checked={flexibleBudget}
            onChange={() => setFlexibleBudget(!flexibleBudget)}
          />
          Flexible — Include up to +10%
        </label>
      </div>

      <div className="flex justify-end">
        <button
          onClick={applyFilters}
          className="
            w-full px-[18px] py-[8px] rounded-[6px]
            bg-[#111] text-white font-semibold
            cursor-pointer border-none
          "
        >
          Apply
        </button>
      </div>
    </div>
  );
}
