import { useMapStore } from "../../store/mapStore";

export function DrawOverlay() {
  const { drawingMode, resetDrawArea } = useMapStore();

  if (!drawingMode) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "60px",
        background: "rgba(0,0,0,0.55)",
        color: "white",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 15px",
        fontSize: "16px",
      }}
    >
      <span>Draw a shape around the region(s) you would like to live in</span>

      <div style={{ display: "flex" }}>
        <button
          onClick={resetDrawArea}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

        {/* <button
          onClick={applyDrawArea}
          disabled={count === 0}
          style={{
            background: "transparent",
            fontSize: "16px",
            borderRadius: "4px",
            border: "none",
            color: "white",
            padding: "6px 14px",
            fontWeight: 400,
            cursor: count === 0 ? "not-allowed" : "pointer",
          }}
        >
          Apply
        </button> */}
      </div>
    </div>
  );
}