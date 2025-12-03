import { useEffect, useRef, useState } from "react";

interface SortDropdownProps {
  selected: string;                     // 🆕 add this
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

  // Close when clicking outside
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
      {/* Button */}
      <div
        className="text-sm font-semibold underline text-[rgb(13,69,153)] cursor-pointer flex items-center gap-1"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        Sort: {selected} 
        {/* <span>▼</span> */}
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            marginTop: "10px",
            width: "220px",
            background: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            padding: "12px 0",
            zIndex: 9999,
          }}
        >
          {sortOptions.map((opt) => (
            <div
              key={opt}
              className="px-4 py-2 text-gray-800 text-sm cursor-pointer hover:bg-gray-100"
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
