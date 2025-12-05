import { useMapStore } from "../../store/mapStore";

export function DrawOverlay() {
  const { drawingMode, resetDrawArea } = useMapStore();

  if (!drawingMode) return null;

  return (
    <div
      className="
        absolute top-0 left-0 w-full h-[60px]
        bg-[rgba(0,0,0,0.55)] text-white
        z-[9999] flex items-center justify-between
        px-[15px] text-[16px]
      "
    >
      <span>Draw a shape around the region(s) you would like to live in</span>

      <div className="flex">
        <button
          onClick={resetDrawArea}
          className="
            bg-transparent border-none text-white
            text-[16px] cursor-pointer
          "
        >
          Cancel
        </button>

        {/*
        <button
          onClick={applyDrawArea}
          disabled={count === 0}
          className="
            bg-transparent text-[16px] rounded-[4px]
            border-none text-white px-[14px] py-[6px] font-normal
            disabled:cursor-not-allowed cursor-pointer
          "
        >
          Apply
        </button>
        */}
      </div>
    </div>
  );
}
