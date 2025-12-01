import Header from "../../components/layout/Header";
import MainLayout from "../../components/layout/MainLayout";
import { FiltersBar } from "../../components/filters/FiltersBar";
import { MapPanel } from "../../components/map/MapPanel";
import { ListingPanel } from "../../components/listings/ListingPanel";

import { PriceDropdown } from "../../components/filters/PriceDropdown";
import { ConfigDropdown } from "../../components/filters/configDropdown";
import { PropertyTypeDropdown } from "../../components/filters/PropertyTypeDropdown";
import { StatusDropdown } from "../../components/filters/StatusDropdown";

import { useFilterStore } from "../../store/filtersStore";
import { MapsProvider } from "../../context/MapsContext";

export function PropertyDiscoveryPage() {
  const {
    isPriceDropdownOpen,
    isConfigDropdownOpen,
    isPropertyTypeDropdownOpen,
    isStatusDropdownOpen,
  } = useFilterStore();

  return (
    <MapsProvider>
      <PropertyDiscoveryPageContent
        isPriceDropdownOpen={isPriceDropdownOpen}
        isConfigDropdownOpen={isConfigDropdownOpen}
        isPropertyTypeDropdownOpen={isPropertyTypeDropdownOpen}
        isStatusDropdownOpen={isStatusDropdownOpen}
      />
    </MapsProvider>
  );
}

function PropertyDiscoveryPageContent({
  isPriceDropdownOpen,
  isConfigDropdownOpen,
  isPropertyTypeDropdownOpen,
  isStatusDropdownOpen,
}: {
  isPriceDropdownOpen: boolean;
  isConfigDropdownOpen: boolean;
  isPropertyTypeDropdownOpen: boolean;
  isStatusDropdownOpen: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Header />
      <FiltersBar />

      <div
        style={{
          position: "absolute",
          top: "131px",
          left: 0,
          right: 0,
          width: "100%",
          height: "auto",
          zIndex: 150,
          pointerEvents:
            isStatusDropdownOpen ||
            isPriceDropdownOpen ||
            isConfigDropdownOpen ||
            isPropertyTypeDropdownOpen
              ? "auto"
              : "none",
        }}
      >
        {isStatusDropdownOpen && <StatusDropdown />}
        {isPriceDropdownOpen && <PriceDropdown />}
        {isConfigDropdownOpen && <ConfigDropdown />}
        {isPropertyTypeDropdownOpen && <PropertyTypeDropdown />}
      </div>

      <div style={{ height: "calc(100vh - 131px)", overflow: "hidden" }}>
        <MainLayout left={<MapPanel />} right={<ListingPanel />} />
      </div>
    </div>
  );
}

export default PropertyDiscoveryPage;
