import { SortDropdown } from "./SortDropdown";
import { ListingCard } from "./ListingCard";
import { useMapStore } from "../../store/mapStore";
import { useState, useMemo } from "react";

export function ListingPanel() {
  const {
    filteredProperties,
    recommendedProperties,
    visibleProperties,
    selectedPropertyId,
    hoveredPropertyId,
    // map,
  } = useMapStore();

  const [sortBy, setSortBy] = useState("Homes for You"); // renamed from Homes for You

  const handleSort = (option: string) => {
    setSortBy(option);                    // update selected option
  };

  // Compute the list based on the intersection of global filters and viewport
  const sortedProperties = useMemo(() => {
    const filteredIds = new Set(filteredProperties.map((p) => p.id));

    // Show only properties that are both globally filtered AND currently visible in viewport
    const arr = visibleProperties.filter((p) => filteredIds.has(p.id));

    switch (sortBy) {
      case "Price (High to Low)":
        return arr.sort((a, b) => b.price - a.price);

      case "Price (Low to High)":
        return arr.sort((a, b) => a.price - b.price);

      case "Newest":
        return arr.reverse(); // placeholder until backend date field exists

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
        <h3 className="text-3xl font-bold text-gray-900">Property For Sale</h3>

        <SortDropdown selected={sortBy} onSelect={handleSort} />
      </div>

      <div className="mb-4 text-sm text-gray-600">
        <span>{sortedProperties.length} results</span>
      </div>

      {/* GRID LIST */}
      <div className="grid grid-cols-2 gap-4">
        {sortedProperties.map((p) => {
          const isActive = selectedPropertyId === p.id;
          const isHover = hoveredPropertyId === p.id;

          return (
            <ListingCard
              key={p.id}
              property={p}
              isRecommended={false}
              isActive={isActive}
              isHovered={isHover}
            />
          );
        })}

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
                isRecommended={true}
                isActive={selectedPropertyId === p.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

