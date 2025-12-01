import { useRef, useEffect, useState } from "react";
import { useMapsApi } from "../../context/MapsContext";
import { useMapStore } from "../../store/mapStore";

export function SearchBar() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setCenter, setZoom, map } = useMapStore(); // map is needed
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

  // Clear search input
  const handleClear = () => {
    setValue("");
    if (inputRef.current) inputRef.current.value = "";
  };

  // Manual trigger of search (Enter / button click)
  const triggerSearch = () => {
    const enterEvent = new KeyboardEvent("keydown", { key: "Enter", code: "Enter" });
    inputRef.current?.dispatchEvent(enterEvent);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "600px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Bangalore..."
        disabled={!isLoaded}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: "100%",
          height: "40px",
          padding: "0 80px 0 14px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "15px",
          background: "#fff",
          outline: "none",
          color: "#000",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") triggerSearch();
        }}
      />

      {/* Clear Button (X) */}
      {value && (
        <button
          onClick={handleClear}
          style={{
            position: "absolute",
            right: "45px", 
            background: "#000000ff", 
            color: "white", 
            borderRadius: "50%", // Perfect circle
            width: "18px", // Slightly smaller, more refined size
            height: "18px",
            fontSize: "12px", // Size of the '✕'
            lineHeight: "19px", // Adjust line height to vertically center the '✕' character
            fontWeight: "bold", 
            border: "none",
            cursor: "pointer",
            padding: 0, // Remove browser default padding
            textAlign: "center", 
          }}
        >
          ✕
        </button>
      )}

      {/* Search Button*/}
      <button
        onClick={triggerSearch}
        style={{
          position: "absolute",
          right: "10px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          color: "#000",
          padding: "6px",
        }}
      >
        🔍
      </button>
    </div>
  );
}
