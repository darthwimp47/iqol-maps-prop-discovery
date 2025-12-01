import { useFilterStore } from "../../store/filtersStore";
import { SearchBar } from "./SearchBar";

export function FiltersBar() {
  const {
    // STATUS
    status,
    isStatusDropdownOpen,
    openStatusDropdown,
    closeStatusDropdown,
    closeAllDropdowns,

    // PRICE
    isPriceDropdownOpen,
    openPriceDropdown,
    closePriceDropdown,
    priceMin,
    priceMax,

    // CONFIG
    isConfigDropdownOpen,
    openConfigDropdown,
    closeConfigDropdown,
    configuration,

    // PROPERTY TYPE
    propertyType,
    isPropertyTypeDropdownOpen,
    openPropertyTypeDropdown,
    closePropertyTypeDropdown,
  } = useFilterStore();

  const isPriceActive = priceMin !== null || priceMax !== null;

  return (
    <div
      data-filter-bar="1"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 18px",
        borderBottom: "1px solid #e5e5e5",
        background: "#ffffff",
        height: "52px",
        position: "relative",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <SearchBar />

      <div style={{ display: "flex", gap: "8px", width: "600px", justifyContent: "center" }}>

        <FilterButton
          label={status.length > 0 ? status.join(", ") : "Status"}
          isOpen={isStatusDropdownOpen}
          isActive={status.length > 0}
          onClick={() => {
            closeAllDropdowns();
            isStatusDropdownOpen ? closeStatusDropdown() : openStatusDropdown();
          }}
        />

        <FilterButton
          label={priceMin && priceMax ? `₹${priceMin.toLocaleString()} - ₹${priceMax.toLocaleString()}` : "Price"}
          isOpen={isPriceDropdownOpen}
          isActive={isPriceActive}
          onClick={() => {
            closeAllDropdowns();
            isPriceDropdownOpen ? closePriceDropdown() : openPriceDropdown();
          }}
        />

        <FilterButton
          label={configuration.length > 0 ? configuration.join(", ") : "Configuration"}
          isOpen={isConfigDropdownOpen}
          isActive={configuration.length > 0}
          onClick={() => {
            closeAllDropdowns();
            isConfigDropdownOpen ? closeConfigDropdown() : openConfigDropdown();
          }}
        />

        <FilterButton
          label={propertyType.length > 0 ? propertyType.join(", ") : "Property Type"}
          isOpen={isPropertyTypeDropdownOpen}
          isActive={propertyType.length > 0}
          onClick={() => {
            closeAllDropdowns();
            isPropertyTypeDropdownOpen ? closePropertyTypeDropdown() : openPropertyTypeDropdown();
          }}
        />

        {/* <FilterButton label="More" /> */}
      </div>

      <button style={saveBtnStyle}>Save Search</button>
    </div>
  );
}

function FilterButton({ label, onClick, isOpen, isActive }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        border: isActive ? "2px solid #0077ff" : "1px solid #d0d0d0",
        borderRadius: "6px",
        background: "white",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 600,
        display: "flex",
        gap: "8px",
        color: "#222",
      }}
    >
      {label}
      <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
    </button>
  );
}

const saveBtnStyle = {
  padding: "8px 16px",
  borderRadius: "6px",
  background: "#111",
  color: "white",
  cursor: "pointer",
  fontWeight: 600,
  border: "none",
};
