import { useState } from "react";
import { useFilterStore } from "../../store/filtersStore";
import { useMapStore } from "../../store/mapStore";

const configOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
const propertyOptions = ["Apartment", "Villa", "Plot", "Commercial", "Studio"];

export function MoreFilters({ onClose }: { onClose: () => void }) {
  const {
    // price
    priceMin,
    priceMax,
    setPriceRange,
    strictBudget,
    setStrictBudget,
    flexibleBudget,
    setFlexibleBudget,

    // config
    configuration,
    setConfiguration,

    // property type
    propertyType,
    setPropertyType,
  } = useFilterStore();

  const applyMapFilters = () => {
    useMapStore.getState().applyFilters();
  };

  // local editable copies (like in your dropdowns)
  const [localMin, setLocalMin] = useState(priceMin ?? "");
  const [localMax, setLocalMax] = useState(priceMax ?? "");
  const [localConfig, setLocalConfig] = useState(configuration);
  const [localPropertyType, setLocalPropertyType] = useState<string[]>(propertyType);
  const [localStrictBudget, setLocalStrictBudget] = useState(strictBudget);
  const [localFlexibleBudget, setLocalFlexibleBudget] = useState(flexibleBudget);

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
    // Price
    const min = localMin === "" ? null : Number(localMin);
    const max = localMax === "" ? null : Number(localMax);
    setPriceRange(min, max);
    setStrictBudget(localStrictBudget);
    setFlexibleBudget(localFlexibleBudget);

    // Config + Property type
    setConfiguration(localConfig);
    setPropertyType(localPropertyType);

    // Apply on map
    useMapStore.getState().applyFilters();
    applyMapFilters();

    // Close popup
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
          rounded-t-[18px] p-5
          overflow-y-auto z-[999]
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-[18px]">
          <h2 className="text-[20px] font-bold">Filters</h2>
          <button
            onClick={onClose}
            className="text-[22px] bg-none border-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* PRICE SECTION */}
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
                px-[10px] py-[10px] w-[120px]
                border border-[#ccc] rounded-[6px]
                bg-[#fafafa] text-[14px] text-[#333]
                outline-none
              "
            />
          </div>

          <div className="mb-[10px]">
            <label className="flex items-center gap-[6px] text-[14px] mb-[6px]">
              <input
                type="checkbox"
                checked={localStrictBudget}
                onChange={() => setLocalStrictBudget((v) => !v)}
              />
              Strict — Show only within range
            </label>

            <label className="flex items-center gap-[6px] text-[14px] mb-[6px]">
              <input
                type="checkbox"
                checked={localFlexibleBudget}
                onChange={() => setLocalFlexibleBudget((v) => !v)}
              />
              Flexible — Include up to +10%
            </label>
          </div>
        </section>

        {/* CONFIGURATION SECTION */}
        <section className="mb-6">
          <h3 className="text-[16px] font-semibold">Configuration</h3>
          <hr className="my-2 mb-4" />

          <div className="flex flex-wrap gap-2 mb-2">
            {configOptions.map((opt) => {
              const active = localConfig.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => toggleConfig(opt)}
                  className={`
                    px-4 py-2 text-sm font-medium cursor-pointer rounded-md
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

        {/* PROPERTY TYPE SECTION */}
        <section className="mb-8">
          <h3 className="text-[16px] font-semibold">Property Type</h3>
          <hr className="my-2 mb-4" />

          <div className="flex flex-wrap gap-[8px]">
            {propertyOptions.map((type) => {
              const active = localPropertyType.includes(type);
              return (
                <button
                  key={type}
                  onClick={() => toggleProperty(type)}
                  className={`
                    px-[14px] py-[8px] rounded-[24px] text-[14px] font-medium cursor-pointer
                    ${
                      active
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
        </section>

        {/* APPLY BUTTON FOR ALL MORE FILTERS */}
        <button
          onClick={applyAll}
          className="
            w-full bg-[#111] text-white font-bold text-[17px]
            py-3 rounded-lg mt-2
          "
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
