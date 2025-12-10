import { useState } from "react";
import { useFilterStore } from "../../store/filtersStore";
import { useMapStore } from "../../store/mapStore";
import {
  CONFIGURATION_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "./Dropdown";

/* reusable */
function FilterOptionSection({
  title,
  options,
  selected,
  onToggle,
  variant = "rect",
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  variant?: "rect" | "pill";
}) {
  const base =
    variant === "pill"
      ? "px-[14px] py-[8px] rounded-[24px] text-[14px]"
      : "px-4 py-2 rounded-md text-sm";

  return (
    <section className="mb-6">
      <h3 className="text-[16px] font-semibold">{title}</h3>
      <hr className="my-2 mb-4" />

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);

          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              className={`
                ${base} font-medium cursor-pointer
                ${
                  active
                    ? "bg-black text-white border-2 border-black"
                    : "bg-white text-[#333] border border-[#ccc]"
                }
              `}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- Main component ---------- */
export function MoreFilters({ onClose }: { onClose: () => void }) {
  const {
    priceMin,
    priceMax,
    setPriceRange,
    strictBudget,
    setStrictBudget,
    flexibleBudget,
    setFlexibleBudget,
    configuration,
    setConfiguration,
    propertyType,
    setPropertyType,
  } = useFilterStore();

  const [localMin, setLocalMin] = useState(priceMin ?? "");
  const [localMax, setLocalMax] = useState(priceMax ?? "");
  const [localConfig, setLocalConfig] = useState(configuration);
  const [localPropertyType, setLocalPropertyType] = useState(propertyType);
  const [localStrictBudget, setLocalStrictBudget] = useState(strictBudget);
  const [localFlexibleBudget, setLocalFlexibleBudget] =
    useState(flexibleBudget);

  const toggleConfig = (val: string) => {
    setLocalConfig((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const toggleProperty = (val: string) => {
    setLocalPropertyType((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const applyAll = () => {
    const min = localMin === "" ? null : Number(localMin);
    const max = localMax === "" ? null : Number(localMax);

    setPriceRange(min, max);
    setStrictBudget(localStrictBudget);
    setFlexibleBudget(localFlexibleBudget);
    setConfiguration(localConfig);
    setPropertyType(localPropertyType);

    useMapStore.getState().applyFilters();
    onClose();
  };

  return (
    <div
      className="
        fixed inset-0 bg-[rgba(0,0,0,0.4)] z-[9999]
        flex justify-center items-end
      "
      onClick={onClose}
    >
      <div
        className="
          w-full max-h-[90%] bg-white text-black
          rounded-t-[18px] p-5 overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between mb-[18px]">
          <h2 className="text-[20px] font-bold">Filters</h2>
          <button
            onClick={onClose}
            className="text-[22px] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* PRICE */}
        <section className="mb-6">
          <h3 className="text-[16px] font-semibold">Price</h3>
          <hr className="my-2 mb-4" />

          <div className="flex gap-[10px] mb-[14px]">
            <input
              type="number"
              placeholder="Min"
              value={localMin}
              onChange={(e) => setLocalMin(e.target.value)}
              className="
                px-[10px] py-[10px] w-[120px]
                border border-[#ccc] rounded-[6px]
                bg-[#fafafa] text-[14px]
                outline-none
              "
            />

            <input
              type="number"
              placeholder="Max"
              value={localMax}
              onChange={(e) => setLocalMax(e.target.value)}
              className="
                px-[10px] py-[10px] w-[120px]
                border border-[#ccc] rounded-[6px]
                bg-[#fafafa] text-[14px]
                outline-none
              "
            />
          </div>

          <label className="flex items-center gap-[6px] text-[14px] mb-[6px]">
            <input
              type="checkbox"
              checked={localStrictBudget}
              onChange={() => setLocalStrictBudget((v) => !v)}
            />
            Show only within the selected range
          </label>

          <label className="flex items-center gap-[6px] text-[14px]">
            <input
              type="checkbox"
              checked={localFlexibleBudget}
              onChange={() => setLocalFlexibleBudget((v) => !v)}
            />
            Flexible Budget (+10%)
          </label>
        </section>

        {/* CONFIGURATION */}
        <FilterOptionSection
          title="Configuration"
          options={CONFIGURATION_OPTIONS}
          selected={localConfig}
          onToggle={toggleConfig}
        />

        {/* PROPERTY TYPE */}
        <FilterOptionSection
          title="Property Type"
          options={PROPERTY_TYPE_OPTIONS}
          selected={localPropertyType}
          onToggle={toggleProperty}
          variant="pill"
        />

        {/* APPLY */}
        <button
          onClick={applyAll}
          className="
            w-full bg-[#111] text-white
            font-bold text-[17px]
            py-3 rounded-lg mt-2
          "
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
