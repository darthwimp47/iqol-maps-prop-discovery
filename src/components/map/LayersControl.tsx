import { useState, useRef, useEffect } from "react";
import { mapLayers } from "../../components/map/MapLayers";
import { useLayersStore } from "../../store/layersStore";

interface LayersControlProps {
  isMobile: boolean;
}

export function LayersControl({ isMobile }: LayersControlProps) {
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

  /* -------------------------
     MOBILE LAYOUT
  -------------------------- */
  if (isMobile) {
    return (
      <div className="fixed bottom-4 right-14 z-20">
        {open && (
          <div
            ref={dropdownRef}
            className="
              absolute bottom-[56px] right-0
              w-[60vw] max-w-[360px]
              bg-white border border-[#ddd]
              rounded-[14px]
              p-4
              shadow-[0_6px_20px_rgba(0,0,0,0.25)]
            "
          >
            <h4 className="mb-3 text-[16px] font-semibold text-[#333]">
              Map Layers
            </h4>

            {mapLayers.map((layer) => (
              <label
                key={layer.key}
                className="flex items-center gap-3 mb-3 cursor-pointer select-none"
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
          className="
            px-6 py-2
            text-[15px] font-semibold
            bg-white border border-[#ccc]
            rounded-[6px]
            shadow-md
            active:scale-95
            text-black
          "
        >
          Layers
        </button>
      </div>
    );
  }

  /* -------------------------
     DESKTOP LAYOUT
  -------------------------- */
  return (
    <div className="fixed bottom-4 left-146 z-20">
      {open && (
        <div
          ref={dropdownRef}
          className="
            absolute bottom-[50px] right-0 w-[260px] p-4
            bg-white border border-[#ddd]
            rounded-[10px]
            shadow-[0_4px_12px_rgba(0,0,0,0.15)]
          "
        >
          <h4 className="mb-[14px] text-[15px] font-semibold text-[#333]">
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
        className="
          px-[14px] py-[8px]
          text-[14px] font-semibold text-black
          bg-white border border-[#ccc]
          rounded-[6px]
          cursor-pointer
        "
      >
        Layers
      </button>
    </div>
  );
}
