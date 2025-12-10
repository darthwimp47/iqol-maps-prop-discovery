// Central place for all filter option lists

export const STATUS_OPTIONS = ["Under Construction","Ready to Move","Completed"];

export const CONFIGURATION_OPTIONS = ["1 BHK","2 BHK","3 BHK","4 BHK","5+ BHK"];

export const PROPERTY_TYPE_OPTIONS = ["Apartment","Villa","Plot","Commercial","Studio",];

export type SortKey =
  | "homesForYou"
  | "priceHighToLow"
  | "priceLowToHigh"
  | "newest"
  | "sqft";

export const SORT_OPTIONS: SortKey[] = [
  "homesForYou",
  "priceHighToLow",
  "priceLowToHigh",
  "newest",
  "sqft",
];

export const SORT_LABELS: Record<SortKey, string> = {
  homesForYou: "Homes for You",
  priceHighToLow: "Price (High to Low)",
  priceLowToHigh: "Price (Low to High)",
  newest: "Newest",
  sqft: "Square Feet",
};
