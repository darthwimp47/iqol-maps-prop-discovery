import { useEffect, useRef, useState } from "react";
import { Range } from "react-range";
import { useFilterStore } from "../../store/filtersStore";
import { useMapStore } from "../../store/mapStore";

const MIN_PRICE = 1_000_000;   // ₹10L
const MAX_PRICE = 50_000_000;  // ₹5Cr
const STEP = 500_000;          // ₹5L

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

  // numeric truth
  const [localMin, setLocalMin] = useState<number | null>(priceMin);
  const [localMax, setLocalMax] = useState<number | null>(priceMax);

  // text inputs (for typing)
  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // sync inputs when slider or store changes
  useEffect(() => {
    setMinInput(localMin ? localMin.toString() : "");
    setMaxInput(localMax ? localMax.toString() : "");
  }, [localMin, localMax]);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node | null;
      if (!target) return;

      if (dropdownRef.current?.contains(target)) return;
      if ((target as Element).closest?.("[data-filter-bar]")) return;

      closePriceDropdown();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePriceDropdown]);

  function applyFilters() {
    setPriceRange(localMin, localMax);
    useMapStore.getState().applyFilters();
    closePriceDropdown();
  }

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      className="
        absolute top-[-51px] right-[31.5%] translate-y-[45px]
        w-[260px] p-[18px]
        bg-white border border-[#dcdcdc] rounded-[10px]
        shadow-[0_4px_10px_rgba(0,0,0,0.12)]
        z-[150] text-[#333]
      "
    >
      <h4 className="mb-3 text-[15px] font-semibold">Price Range</h4>

      {/* slider */}
      <div className="mb-[18px]">
        <Range
          values={[
            localMin ?? MIN_PRICE,
            localMax ?? MAX_PRICE,
          ]}
          step={STEP}
          min={MIN_PRICE}
          max={MAX_PRICE}
          onChange={([min, max]) => {
            setLocalMin(min);
            setLocalMax(max);
          }}
          renderTrack={({ props, children }) => (
            <div {...props} className="h-[4px] w-full bg-[#ddd] rounded">
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="h-5 w-5 bg-[#2563eb] rounded-full shadow cursor-pointer"
            />
          )}
        />
      </div>

      {/* e-manual(💃🏻 🌮) input */}
      <div className="flex gap-[10px] mb-[14px]">
        <input
          type="text"
          placeholder="Min"
          value={minInput}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^\d]/g, "");
            setMinInput(raw);

            const num = Number(raw);
            if (!isNaN(num) && num >= MIN_PRICE && num <= MAX_PRICE) {
              if (localMax && num > localMax) return;
              setLocalMin(num);
            }
          }}
          onBlur={() => {
            if (localMin) {
              setMinInput(localMin.toLocaleString("en-IN"));
            }
          }}
          className="
            px-[10px] py-[10px] w-[110px]
            border border-[#ccc] rounded-[6px]
            bg-[#fafafa] text-[14px]
            outline-none
          "
        />

        <input
          type="text"
          placeholder="Max"
          value={maxInput}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^\d]/g, "");
            setMaxInput(raw);

            const num = Number(raw);
            if (!isNaN(num) && num >= MIN_PRICE && num <= MAX_PRICE) {
              if (localMin && num < localMin) return;
              setLocalMax(num);
            }
          }}
          onBlur={() => {
            if (localMax) {
              setMaxInput(localMax.toLocaleString("en-IN"));
            }
          }}
          className="
            px-[10px] py-[10px] w-[110px]
            border border-[#ccc] rounded-[6px]
            bg-[#fafafa] text-[14px]
            outline-none
          "
        />
      </div>

      {/* checkboxes */}
      <div className="mb-[14px]">
        <label className="flex items-center gap-[6px] text-[14px] mb-[6px]">
          <input
            type="checkbox"
            checked={strictBudget}
            onChange={() => setStrictBudget(!strictBudget)}
          />
          Show only within the selected range
        </label>

        <label className="flex items-center gap-[6px] text-[14px]">
          <input
            type="checkbox"
            checked={flexibleBudget}
            onChange={() => setFlexibleBudget(!flexibleBudget)}
          />
          Flexible Budget (+10%)
        </label>
      </div>

      {/* apply */}
      <button
        onClick={applyFilters}
        className="
          w-full px-[18px] py-[8px]
          rounded-[6px] bg-[#111] text-white
          font-semibold cursor-pointer
        "
      >
        Apply
      </button>
    </div>
  );
}
