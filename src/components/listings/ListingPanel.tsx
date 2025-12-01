import { SortDropdown } from "./SortDropdown";
import { useMapStore } from "../../store/mapStore";
import { useState, useMemo } from "react";

export function ListingPanel() {
  const {
    filteredProperties,
    recommendedProperties,
    visibleProperties,
    selectedPropertyId,
    setSelectedPropertyId,
    hoveredPropertyId,
    setHoveredPropertyId,
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
    <div className="p-4 h-full bg-white border-l border-gray-200 overflow-y-auto z-150 shadow-xl">
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
            <div
              key={p.id}
              onMouseEnter={() => setHoveredPropertyId(p.id)}
              onMouseLeave={() => setHoveredPropertyId(null)}
              onClick={() => setSelectedPropertyId(p.id)}
              className={`rounded-xl border cursor-pointer overflow-hidden shadow-sm transition-all ${
                isActive
                  ? "border-blue-600 shadow-md"
                  : isHover
                  ? "border-gray-900"
                  : "border-gray-300"
              }`}
            >
              {/* IMAGE */}
              <div className="w-full h-36 bg-gray-300">
                <img
                  src={p.image ?? "https://via.placeholder.com/300x200?text=Property"}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-3 space-y-1">
                <div className="text-lg font-bold text-gray-800">
                  ₹{(p.price / 10000000).toFixed(1)} Cr
                </div>

                <div className="text-sm text-gray-600">
                  {p.configuration} • {p.propertyType}
                </div>

                <div className="text-sm text-gray-500 truncate">{p.micromarket}</div>
              </div>
            </div>
          );
        })}

        {/* RECOMMENDED SECTION */}
        {visibleRecommended.length > 0 && (
          <>
            <h3 className="col-span-2 mt-4 text-md font-semibold text-amber-700">
              Recommended for you (+10% flex)
            </h3>

            {visibleRecommended.map((p) => (
              <div
                key={`rec-${p.id}`}
                onMouseEnter={() => setHoveredPropertyId(p.id)}
                onMouseLeave={() => setHoveredPropertyId(null)}
                onClick={() => setSelectedPropertyId(p.id)}
                className={`rounded-xl border cursor-pointer overflow-hidden shadow-sm transition-all bg-amber-50 ${
                  selectedPropertyId === p.id
                    ? "border-amber-600 shadow-md"
                    : "border-amber-300"
                }`}
              >
                <div className="w-full h-36 bg-gray-300" />

                <div className="p-3 space-y-1">
                  <div className="text-lg font-bold text-amber-700">
                    ₹{(p.price / 10000000).toFixed(1)} Cr
                  </div>

                  <div className="text-sm text-gray-700">{p.configuration}</div>
                  <div className="text-sm text-gray-500">{p.micromarket}</div>

                  <span className="text-xs font-semibold text-amber-700">Recommended</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
