import { useEffect, useRef, useState } from "react";
import { useMapsApi } from "../../context/MapsContext";
import { useMapStore } from "../../store/mapStore";

export function SearchBar({ isMobile }: { isMobile: boolean }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { map } = useMapStore();
  const { isLoaded } = useMapsApi();

  const [value, setValue] = useState("");

  // ✅ Initialize Google Autocomplete
  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: ["geometry", "name", "formatted_address"],
        types: ["geocode"],
        componentRestrictions: { country: "in" },
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (!place?.geometry?.location) return;

      const displayValue =
        place.formatted_address || place.name || "";

      setValue(displayValue);

      map?.setCenter(place.geometry.location);
      map?.setZoom(14);
    });

    return () => {
      autocompleteRef.current = null;
    };
  }, [isLoaded, map]);

  // ✅ CLEAR SEARCH
  const handleClear = () => {
    setValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  // ✅ SEARCH BUTTON ACTION (this was missing)
  const triggerSearch = () => {
    if (!inputRef.current) return;

    inputRef.current.focus();

    // Let Google Autocomplete select first suggestion
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      bubbles: true,
    });

    inputRef.current.dispatchEvent(event);
  };

  return (
    <div
      className={`
        relative flex items-center
        ${isMobile ? "w-full mt-2 mb-2" : "w-[500px]"}
      `}
    >
      {/* input */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Bangalore…"
        disabled={!isLoaded}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            triggerSearch();
          }
        }}
        className={`
          w-full bg-white text-black
          border border-[#d0d0d0]
          rounded-lg
          outline-none
          transition-all
          focus:border-black focus:ring-1 focus:ring-black
          disabled:bg-[#f5f5f5] disabled:cursor-not-allowed
          ${isMobile
            ? "h-[46px] text-[16px] pl-[16px] pr-[80px]"
            : "h-[42px] text-[15px] pl-[16px] pr-[80px]"
          }
        `}
      />

      {/* CLEAR BUTTON */}
      {value && (
        <button
          onClick={handleClear}
          className={`
            absolute 
            right-[53px]
            w-[16px] h-[16px]
            flex items-center justify-center
            rounded-full
            bg-black text-white
            text-[10px]
            leading-none
            p-0
            cursor-pointer
          `}
        >
          ×
        </button>
      )}

      {/* search button */}
      <button
        onClick={triggerSearch}
        className={`
          absolute 
          right-[15px]
          p-2
          rounded-md
          bg-transparent
          cursor-pointer
          flex items-center justify-center
          hover:opacity-90
          ${isMobile ? "text-[14px]" : "text-[13px]"}
        `}
      >
        🔍
      </button>
    </div>
  );
}
