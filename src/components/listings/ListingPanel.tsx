import { SortDropdown } from "./SortDropdown";
import { ListingCard } from "./ListingCard";
import { useMapStore } from "../../store/mapStore";
import { useState, useMemo } from "react";

import type { SortKey } from "../filters/Dropdown";

export function ListingPanel() {
  const {
    filteredProperties,
    recommendedProperties,
    visibleProperties,
    selectedPropertyId,
    hoveredPropertyId,
  } = useMapStore();

  // Sort state uses canonical key
  const [sortBy, setSortBy] = useState<SortKey>("homesForYou");

  // Correctly typed handler
  const handleSort = (key: SortKey) => {
    setSortBy(key);
  };

  // Sort ONLY the intersection of filtered + visible
  const sortedProperties = useMemo(() => {
    const filteredIds = new Set(filteredProperties.map((p) => p.id));
    const arr = visibleProperties.filter((p) => filteredIds.has(p.id));

    switch (sortBy) {
      case "priceHighToLow":
        return [...arr].sort((a, b) => b.price - a.price);

      case "priceLowToHigh":
        return [...arr].sort((a, b) => a.price - b.price);

      case "newest":
        return [...arr].reverse();

      default:
        return arr;
    }
  }, [filteredProperties, visibleProperties, sortBy]);

  const visibleRecommended = useMemo(() => {
    const recIds = new Set(recommendedProperties.map((p) => p.id));
    return visibleProperties.filter((p) => recIds.has(p.id));
  }, [recommendedProperties, visibleProperties]);

  return (
    <div className="p-4 h-full bg-transparent border-l border-gray-200 overflow-y-auto z-150 shadow-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-3xl font-bold text-gray-900">
          Property For Sale
        </h3>

        <SortDropdown selected={sortBy} onSelect={handleSort} />
      </div>

      <div className="mb-4 text-sm text-gray-600">
        <span>{sortedProperties.length} results</span>
      </div>

      {/* GRID LIST */}
      <div className="grid grid-cols-2 gap-4">
        {sortedProperties.map((p) => (
          <ListingCard
            key={p.id}
            property={p}
            isRecommended={false}
            isActive={selectedPropertyId === p.id}
            isHovered={hoveredPropertyId === p.id}
          />
        ))}

        {/* RECOMMENDED SECTION */}
        {visibleRecommended.length > 0 && (
          <>
            <h3 className="col-span-2 mt-4 text-md font-semibold text-amber-700">
              Recommended for you (+10% flex)
            </h3>

            {visibleRecommended.map((p) => (
              <ListingCard
                key={`rec-${p.id}`}
                property={p}
                isRecommended
                isActive={selectedPropertyId === p.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
