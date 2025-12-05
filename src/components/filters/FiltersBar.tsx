import { useFilterStore } from "../../store/filtersStore";
import { SearchBar } from "./SearchBar";

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

  const isPriceActive = priceMin !== null || priceMax !== null;
  const fiterLabel = [
    //status
    {
      label: status.length > 0 ? status.join(', ') : 'Status',
      isOpen: isStatusDropdownOpen,
      isActive: status.length > 0,
      onClick: () => {
        closeAllDropdowns();
        isStatusDropdownOpen ? closeStatusDropdown() : openStatusDropdown();
      },
    },
    // price
    {
      label: priceMin && priceMax
        ? `₹${priceMin.toLocaleString()} - ₹${priceMax.toLocaleString()}`
        : 'Price',
      isOpen: isPriceDropdownOpen,
      isActive: isPriceActive,
      onClick: () => {
        closeAllDropdowns();
        isPriceDropdownOpen ? closePriceDropdown() : openPriceDropdown();
      },
    },
    // config
    {
      label: configuration.length > 0 ? configuration.join(', ') : 'Configuration',
      isOpen: isConfigDropdownOpen,
      isActive: configuration.length > 0,
      onClick: () => {
        closeAllDropdowns();
        isConfigDropdownOpen ? closeConfigDropdown() : openConfigDropdown();
      },
    },
    //property type
    {
      label: propertyType.length > 0 ? propertyType.join(', ') : 'Property Type',
      isOpen: isPropertyTypeDropdownOpen,
      isActive: propertyType.length > 0,
      onClick: () => {
        closeAllDropdowns();
        isPropertyTypeDropdownOpen
          ? closePropertyTypeDropdown()
          : openPropertyTypeDropdown();
      }
    },

  ]

  return (
    <div className="flex flex-col">
      <div
        data-filter-bar="1"
        className="
          flex items-center gap-3 px-[18px] py-[10px]
          border-b border-[#cccccc] bg-white
          h-[52px] relative justify-between w-full z-[999]
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

      {isMobile && (
        <div className="flex gap-2 w-full h-20 justify-center bg-white py-[10px] overflow-auto">
          <FilterButton
            label={status.length > 0 ? status.join(', ') : 'Status'}
            isOpen={isStatusDropdownOpen}
            isActive={status.length > 0}
            onClick={() => {
              closeAllDropdowns();
              isStatusDropdownOpen ? closeStatusDropdown() : openStatusDropdown();
            }}
          />

          <FilterButton
            label={
              priceMin && priceMax
                ? `₹${priceMin.toLocaleString()} - ₹${priceMax.toLocaleString()}`
                : 'Price'
            }
            isOpen={isPriceDropdownOpen}
            isActive={isPriceActive}
            onClick={() => {
              closeAllDropdowns();
              isPriceDropdownOpen ? closePriceDropdown() : openPriceDropdown();
            }}
          />

          <FilterButton
            label={configuration.length > 0 ? configuration.join(', ') : 'Configuration'}
            isOpen={isConfigDropdownOpen}
            isActive={configuration.length > 0}
            onClick={() => {
              closeAllDropdowns();
              isConfigDropdownOpen ? closeConfigDropdown() : openConfigDropdown();
            }}
          />

          <FilterButton
            label={propertyType.length > 0 ? propertyType.join(', ') : 'Property Type'}
            isOpen={isPropertyTypeDropdownOpen}
            isActive={propertyType.length > 0}
            onClick={() => {
              closeAllDropdowns();
              isPropertyTypeDropdownOpen
                ? closePropertyTypeDropdown()
                : openPropertyTypeDropdown();
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
        ${isActive ? 'border-2 border-[#0077ff]' : 'border border-[#d0d0d0]'}
      `}
    >
      {label}
      <span className={`${isOpen ? 'rotate-180' : ''} transition-transform`}>
        ▼
      </span>
    </button>
  );
}
