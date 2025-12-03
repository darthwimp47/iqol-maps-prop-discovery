import { useState, useRef, useEffect } from "react";
import { mapLayers } from "../../components/map/MapLayers";
import { useLayersStore } from "../../store/layersStore";

export function LayersControl() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { visibleLayers, toggleLayer } = useLayersStore();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current?.contains(e.target as Node) ||
        buttonRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "25px",
        right: "68px",
        zIndex: 999,
      }}
    >
      {open && (
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            bottom: "50px",
            right: 0,
            width: "260px",
            background: "white",
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <h4
            style={{
              margin: "0 0 14px 0",
              fontSize: "15px",
              fontWeight: 600,
              color: "#333",
            }}
          >
            Map Layers
          </h4>

          {mapLayers.map((layer) => (
            <label
              key={layer.key}
              className="flex items-center gap-3 mb-2 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={visibleLayers[layer.key]}
                onChange={() => toggleLayer(layer.key)}
              />
              <span className="text-sm text-gray-800">{layer.label}</span>
            </label>
          ))}
        </div>
      )}

      <button
        ref={buttonRef}
        onClick={() => setOpen((p) => !p)}
        style={{
          padding: "8px 14px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          background: "#fff",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "14px",
          color: "#333",
        }}
      >
        Layers
      </button>
    </div>
  );
}
