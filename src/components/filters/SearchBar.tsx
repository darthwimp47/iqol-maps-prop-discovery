import { useRef, useEffect, useState } from "react";
import { useMapsApi } from "../../context/MapsContext";
import { useMapStore } from "../../store/mapStore";

export function SearchBar({ isMobile }: { isMobile: boolean }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setCenter, setZoom, map } = useMapStore();
  const { isLoaded } = useMapsApi();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      fields: ["geometry", "name"],
      types: ["geocode"],
      componentRestrictions: { country: "in" },
    });

    const handlePlaceChanged = () => {
      const place = autocomplete.getPlace();
      if (!place.geometry?.location) return;

      map?.setCenter(place.geometry.location);
      map?.setZoom(14);
    };

    autocomplete.addListener("place_changed", handlePlaceChanged);

    return () => {
      // @ts-ignore
      if (autocomplete && autocomplete.unbindAll) autocomplete.unbindAll();
    };
  }, [isLoaded, map, setCenter, setZoom]);

  const handleClear = () => {
    setValue("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const triggerSearch = () => {
    const enterEvent = new KeyboardEvent("keydown", { key: "Enter", code: "Enter" });
    inputRef.current?.dispatchEvent(enterEvent);
  };

  return (
    <div
      className={`
        relative flex items-center
        ${isMobile ? "w-full mb-2 mt-2" : "w-[500px]"}
      `}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Bangalore..."
        disabled={!isLoaded}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && triggerSearch()}
        className={`
          w-full outline-none text-black bg-white border border-[#ccc] rounded-[10px]
          ${isMobile ? "h-[46px] text-[16px] pr-[70px] pl-[14px]" : "h-[40px] text-[15px] pr-[80px] pl-[14px]"}
        `}
      />

      {value && (
        <button
          onClick={handleClear}
          className={`
            absolute flex justify-center items-center
            bg-black text-white rounded-full font-bold
            w-[18px] h-[18px] text-[12px] leading-[19px]
            ${isMobile ? "right-[40px]" : "right-[45px]"}
          `}
        >
          ✕
        </button>
      )}

      <button
        onClick={triggerSearch}
        className={`
          absolute right-[10px] bg-transparent border-none cursor-pointer
          ${isMobile ? "text-[20px]" : "text-[18px]"}
        `}
      >
        🔍
      </button>
    </div>
  );
}
