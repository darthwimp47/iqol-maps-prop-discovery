import { useEffect, useRef, useState } from "react";
import { useFilterStore } from "../../store/filtersStore";
import { useMapStore } from "../../store/mapStore";
import { STATUS_OPTIONS } from "./Dropdown";

// const options = ["Under Construction", "Ready to Move", "Completed"];

export function StatusDropdown() {
  const { status, setStatus, closeStatusDropdown } = useFilterStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [localStatus, setLocalStatus] = useState<string[]>(status);

  function toggle(val: string) {
    setLocalStatus((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  }

  function applyFilters() {
    setStatus(localStatus);
    useMapStore.getState().applyFilters();
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
      className="
        absolute top-[-51px] right-[41.5%] translate-y-[45px]
        w-[220px] p-[18px] bg-white
        border border-[#dcdcdc] rounded-[10px]
        shadow-[0_4px_10px_rgba(0,0,0,0.12)]
        z-[150]
      "
    >
      <h4 className="mb-[14px] text-[15px] font-semibold text-[#333] bg-white">
        Status
      </h4>

      <div className="flex flex-wrap gap-[8px] mb-[16px]">
        {STATUS_OPTIONS.map((opt) => {
          const active = localStatus.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`
                px-[16px] py-[10px] rounded-[24px] text-[14px] font-medium cursor-pointer
                ${active
                  ? "bg-[#111] text-white border-2 border-[#111]"
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



      {/* e-manual(💃🏻 🌮) inputs */}