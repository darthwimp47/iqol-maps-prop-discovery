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
import { useEffect, useState } from "react";

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
  const [activeTab, setActiveTab] = useState<"map" | "list">("map");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pointer = 
    isStatusDropdownOpen ||
    isPriceDropdownOpen ||
    isConfigDropdownOpen ||
    isPropertyTypeDropdownOpen
      ? "auto"
      : "none";

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden relative">
      <Header isMobile={isMobile} />
      <FiltersBar isMobile={isMobile} />

      {/* DROPDOWN WRAPPER */}
      <div
        className="
          absolute
          top-[131px] left-0 right-0
          w-full h-auto z-[150]
        "
        style={{ pointerEvents: pointer }}
      >
        {isStatusDropdownOpen && <StatusDropdown />}
        {isPriceDropdownOpen && <PriceDropdown />}
        {isConfigDropdownOpen && <ConfigDropdown />}
        {isPropertyTypeDropdownOpen && <PropertyTypeDropdown />}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-hidden">
        <MainLayout
          left={<MapPanel />}
          right={<ListingPanel />}
          activeTab={activeTab}
          isMobile={isMobile}
          setActiveTab={setActiveTab}
        />
      </div>
      
    </div>
  );
}

export default PropertyDiscoveryPage;
