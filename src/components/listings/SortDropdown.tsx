import { useEffect, useRef, useState } from "react";

interface SortDropdownProps {
  selected: string;
  onSelect: (option: string) => void;
}

export function SortDropdown({ selected, onSelect }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);

  const sortOptions = [
    "Homes for You",
    "Price (High to Low)",
    "Price (Low to High)",
    "Newest",
    "Bedrooms",
    "Square Feet",
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={sortRef} className="relative">
      {/* Sort button */}
      <div
        className="
          text-sm font-semibold underline text-[rgb(13,69,153)]
          cursor-pointer flex items-center gap-1 select-none
        "
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        Sort: {selected}
      </div>

      {isOpen && (
        <div
          className="
            absolute right-0 mt-[10px] w-[220px]
            bg-white rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.15)]
            py-[12px] z-[9999]
          "
        >
          {sortOptions.map((opt) => (
            <div
              key={opt}
              className="
                px-4 py-2 text-gray-800 text-sm cursor-pointer
                hover:bg-gray-100 transition
              "
              onClick={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
