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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;

      if (dropdownRef.current && dropdownRef.current.contains(target)) return;

      if (
        target &&
        (target as Element).closest &&
        (target as Element).closest("[data-filter-bar]")
      ) {
        return;
      }

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
      className="
        absolute top-[-47px] right-[24.4%] translate-y-[45px]
        w-[280px] p-[18px] bg-white rounded-[10px] border border-[#dcdcdc]
        shadow-[0_4px_10px_rgba(0,0,0,0.12)]
        z-[150]
      "
    >
      <h4 className="text-[15px] font-semibold text-[#333] mb-[14px]">
        Configuration
      </h4>

      <div className="flex flex-wrap gap-2 mb-4">
        {options.map((opt) => {
          const active = localConfig.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`
                px-4 py-2 text-sm font-medium cursor-pointer rounded-md
                ${active
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

      <button
        onClick={applyFilters}
        className="
          w-full py-2 bg-black text-white font-semibold text-[15px]
          rounded-md cursor-pointer
        "
      >
        Apply
      </button>
    </div>
  );
}
