import { useState } from "react";
import { useFilterStore } from "../../store/filtersStore";
import { useMapStore } from "../../store/mapStore";
import { SearchBar } from "./SearchBar";
import { MoreFilters } from "./MoreFilters";

export function FiltersBar({ isMobile }: { isMobile: boolean }) {
  const {
    status,
    isStatusDropdownOpen,
    openStatusDropdown,
    closeStatusDropdown,
    closeAllDropdowns,

    isPriceDropdownOpen,
    openPriceDropdown,
    closePriceDropdown,
    priceMin,
    priceMax,

    isConfigDropdownOpen,
    openConfigDropdown,
    closeConfigDropdown,
    configuration,

    propertyType,
    isPropertyTypeDropdownOpen,
    openPropertyTypeDropdown,
    closePropertyTypeDropdown,
  } = useFilterStore();

  // IMPORT DRAWING MODE
  const { drawingMode } = useMapStore();

  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isPriceActive = priceMin !== null || priceMax !== null;

  const hasMoreFiltersActive =
    isPriceActive || configuration.length > 0 || propertyType.length > 0;

  const fiterLabel = [
    {
      label: status.length > 0 ? status.join(", ") : "Status",
      isOpen: isStatusDropdownOpen,
      isActive: status.length > 0,
      onClick: () => {
        closeAllDropdowns();
        isStatusDropdownOpen ? closeStatusDropdown() : openStatusDropdown();
      },
    },
    {
      label:
        priceMin && priceMax
          ? `₹${priceMin.toLocaleString()} - ₹${priceMax.toLocaleString()}`
          : "Price",
      isOpen: isPriceDropdownOpen,
      isActive: isPriceActive,
      onClick: () => {
        closeAllDropdowns();
        isPriceDropdownOpen ? closePriceDropdown() : openPriceDropdown();
      },
    },
    {
      label: configuration.length > 0 ? configuration.join(", ") : "Configuration",
      isOpen: isConfigDropdownOpen,
      isActive: configuration.length > 0,
      onClick: () => {
        closeAllDropdowns();
        isConfigDropdownOpen ? closeConfigDropdown() : openConfigDropdown();
      },
    },
    {
      label: propertyType.length > 0 ? propertyType.join(", ") : "Property Type",
      isOpen: isPropertyTypeDropdownOpen,
      isActive: propertyType.length > 0,
      onClick: () => {
        closeAllDropdowns();
        isPropertyTypeDropdownOpen
          ? closePropertyTypeDropdown()
          : openPropertyTypeDropdown();
      },
    },
  ];

  return (
    <div className="flex flex-col">
      <div
        data-filter-bar="1"
        className="
          flex items-center gap-3 px-[18px] py-[10px]
          border-b border-[#cccccc] bg-white
          h-[57px] relative justify-between w-full z-[1]
        "
      >
        <SearchBar isMobile={isMobile} />

        {!isMobile && (
          <>
            <div className="flex gap-2 w-[600px] justify-center">
              {fiterLabel.map((x) => {
                return (
                  <FilterButton
                    label={x.label}
                    isOpen={x.isOpen}
                    isActive={x.isActive}
                    onClick={x.onClick}
                  />
                );
              })}
            </div>
            <button
              className="
                px-4 py-2 rounded-md bg-[#111] text-white
                cursor-pointer font-semibold border-none
              "
            >
              Save Search
            </button>
          </>
        )}
      </div>

      {/* MOBILE FILTERS HIDDEN DURING DRAW */}
      {isMobile && !drawingMode && (
        <>
          <div
            data-filter-bar="1"
            className="flex gap-2 w-full h-16 justify-center bg-white py-[10px] border-b border-[#cccccc]"
          >
            <FilterButton
              label={status.length > 0 ? status.join(", ") : "Status"}
              isOpen={isStatusDropdownOpen}
              isActive={status.length > 0}
              onClick={() => {
                closeAllDropdowns();
                isMoreOpen && setIsMoreOpen(false);
                isStatusDropdownOpen ? closeStatusDropdown() : openStatusDropdown();
              }}
            />

            <FilterButton
              label="More"
              isOpen={isMoreOpen}
              isActive={hasMoreFiltersActive}
              onClick={() => {
                closeAllDropdowns();
                setIsMoreOpen(true);
              }}
            />

            <button
              className="
                px-4 py-2 rounded-md bg-[#111] text-white
                cursor-pointer font-semibold border-none
              "
            >
              Save Search
            </button>
          </div>

          {isMoreOpen && (
            <MoreFilters
              onClose={() => {
                setIsMoreOpen(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

function FilterButton({ label, onClick, isOpen, isActive }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        flex gap-2 items-center font-semibold text-[14px] cursor-pointer
        px-[14px] py-[8px] rounded-md bg-white text-[#222]
        ${isActive ? "border-2 border-[#0077ff]" : "border border-[#d0d0d0]"}
      `}
    >
      {label}
      <span className={`${isOpen ? "rotate-180" : ""} transition-transform`}>▼</span>
    </button>
  );
}
