import { useMapStore } from "../../store/mapStore";

interface ListingCardProps {
  property: any;
  isRecommended?: boolean;
  isHovered?: boolean;
  isActive?: boolean;
}

export function ListingCard({
  property,
  isRecommended = false,
  isHovered = false,
  isActive = false,
}: ListingCardProps) {
  const { setSelectedPropertyId, setHoveredPropertyId } = useMapStore();

  if (isRecommended) {
    // Recommended card style (grid-based, amber background)
    return (
      <div
        key={`rec-${property.id}`}
        onMouseEnter={() => setHoveredPropertyId(property.id)}
        onMouseLeave={() => setHoveredPropertyId(null)}
        onClick={() => setSelectedPropertyId(property.id)}
        className={`rounded-xl border cursor-pointer overflow-hidden shadow-sm transition-all bg-amber-50 ${
          isActive ? "border-amber-600 shadow-md" : "border-amber-300"
        }`}
      >
        <div className="w-full h-36 bg-gray-300" />

        <div className="p-3 space-y-1">
          <div className="text-lg font-bold text-amber-700">
            ₹{(property.price / 10000000).toFixed(1)} Cr
          </div>

          <div className="text-sm text-gray-700">{property.configuration}</div>
          <div className="text-sm text-gray-500">{property.micromarket}</div>

          <span className="text-xs font-semibold text-amber-700">Recommended</span>
        </div>
      </div>
    );
  }

  // Standard filtered card style (grid-based)
  return (
    <div
      key={property.id}
      onMouseEnter={() => setHoveredPropertyId(property.id)}
      onMouseLeave={() => setHoveredPropertyId(null)}
      onClick={() => setSelectedPropertyId(property.id)}
      className={`rounded-xl border cursor-pointer overflow-hidden shadow-sm transition-all ${
        isActive
          ? "border-blue-600 shadow-md"
          : isHovered
          ? "border-gray-900"
          : "border-gray-300"
      }`}
    >
      {/* IMAGE */}
      <div className="w-full h-36 bg-gray-300">
        <img
          src={property.image ?? "https://via.placeholder.com/300x200?text=Property"}
          alt={property.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 space-y-1">
        <div className="text-lg font-bold text-gray-800">
          ₹{(property.price / 10000000).toFixed(1)} Cr
        </div>

        <div className="text-sm text-gray-600">
          {property.configuration} • {property.propertyType}
        </div>

        <div className="text-sm text-gray-500 truncate">{property.micromarket}</div>
      </div>
    </div>
  );
}
