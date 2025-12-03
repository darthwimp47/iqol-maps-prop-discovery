import { AmenitiesIcon,} from "../map/LayersIcon";

interface MapLegendProps {
  visible: boolean;
  onClose: () => void; 

  infrastructureFilters: {
    metro: boolean;
    suburbanRailway: boolean;
    water: boolean;
    sewage: boolean;
    majorRoads: boolean;
  };

  planningFilters: Record<string, boolean>;
}

export function MapLegend({
  visible,
  onClose,
  infrastructureFilters,
  planningFilters,
}: MapLegendProps) {
  const showCDP = Object.values(planningFilters).some(Boolean);

  const shouldShowAny =
    showCDP ||
    infrastructureFilters.metro ||
    infrastructureFilters.suburbanRailway ||
    infrastructureFilters.water ||
    infrastructureFilters.sewage ||
    infrastructureFilters.majorRoads;

  if (!shouldShowAny) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "25px",
        left: "5px",
        width: "260px",
        background: "#fff",
        borderRadius: "10px",
        padding: "6px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 999,
        display: visible ? "block" : "none",
        color: "#333",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 6px", alignItems: "center" }}>
        <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700 }}>Legend</h4>
        <button
          onClick={onClose}
          style={{
            padding: 0,
            border: "none",
            background: "transparent",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          ✕
        </button>
      </div>

      <div style={{ maxHeight: "270px", overflowY: "auto" }}>
        {/* CDP MAP */}
        {showCDP && (
          <div style={{ marginBottom: "14px" }}>
            <h5 style={{ margin: 0, fontWeight: 600, marginBottom: "6px" }}>
              CDP Map (Comprehensive Development Plan)
            </h5>
            <img src="src/assets/cdpLegend.svg" alt="CDP Legend" style={{ width: "500px" }} />
          </div>
        )}

        {/* METRO */}
        {infrastructureFilters.metro && (
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
              <AmenitiesIcon />
              <span style={{ marginLeft: 6, fontWeight: 600 }}>Metro</span>
            </div>

            <div style={{ marginLeft: 4 }}>
              {[
                { label: "Purple Line", color: "purple" },
                { label: "Green Line", color: "green" },
                { label: "Yellow Line", color: "yellow" },
              ].map((line) => (
                <div key={line.label} style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                  <div style={{ width: 20, height: 4, backgroundColor: line.color, marginRight: 8 }}></div>
                  <span>{line.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBURBAN RAILWAY */}
        {infrastructureFilters.suburbanRailway && (
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
              <AmenitiesIcon />
              <span style={{ marginLeft: 6, fontWeight: 600 }}>Suburban Railway</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 20, height: 3, backgroundColor: "yellow", marginRight: 8 }}></div>
              <span>Railway Lines</span>
            </div>
          </div>
        )}

        {/* SEWAGE LINES */}
        {infrastructureFilters.sewage && (
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
              <AmenitiesIcon />
              <span style={{ marginLeft: 6, fontWeight: 600 }}>Sewage Lines</span>
            </div>
            <div style={{ width: 20, height: 4, backgroundColor: "#124a03" }} />
          </div>
        )}

        {/* WATER LINES */}
        {infrastructureFilters.water && (
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
              <AmenitiesIcon />
              <span style={{ marginLeft: 6, fontWeight: 600 }}>Water Lines</span>
            </div>
            <div style={{ width: 20, height: 4, backgroundColor: "#2903ba" }} />
          </div>
        )}

        {/* MAJOR ROADS */}
        {infrastructureFilters.majorRoads && (
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
              <AmenitiesIcon />
              <span style={{ marginLeft: 6, fontWeight: 600 }}>Major Roads</span>
            </div>
            <div style={{ width: 20, height: 4, backgroundColor: "#000" }} />
          </div>
        )}
      </div>
    </div>
  );
}
