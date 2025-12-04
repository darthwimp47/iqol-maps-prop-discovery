import { AmenitiesIcon, MetroIcon, WaterIcon, SewerIcon, RoadsIcon } from "../map/LayersIcon";

interface MapLegendProps {
  visible: boolean;
  onClose: () => void;
  minimized: boolean;
  onToggle: () => void;
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
  minimized,
  onToggle,
  infrastructureFilters,
  planningFilters,
}: MapLegendProps) {

  const showCDP = Object.values(planningFilters).some(Boolean);

  const shouldShowAny =
    showCDP ||
    infrastructureFilters.metro ||
    infrastructureFilters.water ||
    infrastructureFilters.sewage ||
    infrastructureFilters.majorRoads;

  if (!shouldShowAny) return null;

  if (minimized) {
    return (
      <div
        style={{
          color: "#333",
          position: "absolute",
          bottom: "25px",
          left: "5px",
          background: "#fff",
          borderRadius: "10px",
          padding: "6px 12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          cursor: "pointer",
          zIndex: 999,
          fontWeight: 600,
          fontSize: "14px"
        }}
        onClick={onToggle}
      >
        Legend ▲
      </div>
    );
  }

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
      <div style={{ display: "flex", padding: "6px 6px", alignItems: "center", borderBottom: "1px solid #ddd", marginBottom: "8px" }}>
        <AmenitiesIcon size={25} />
        <h4 style={{ position: "absolute", left: 46, margin: 0, fontSize: "16px", fontWeight: 700 }}>Legend</h4>
        
        {/* CHANGE THIS BUTTON TO MINIMIZE */}
        <button
          onClick={onToggle}
          style={{
            position: "absolute",
            right: 18,
            padding: 0,
            border: "none",
            background: "transparent",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          –
        </button>
      </div>

      <div style={{ maxHeight: "270px", overflowY: "auto" }}>
        {/* CDP MAP */}
        {showCDP && (
          <div style={{ marginBottom: "14px", paddingLeft: 3 }}>
            <h5 style={{ margin: 0, fontWeight: 600, marginBottom: "6px", paddingLeft: 6 }}>
              CDP Map (Comprehensive Development Plan)
            </h5>
            <img src="src/assets/cdpLegend.svg" alt="CDP Legend" style={{ width: "500px", paddingLeft: 6 }} />
          </div>
        )}

        {/* METRO */}
        {infrastructureFilters.metro && (
          <div style={{ marginBottom: "14px", paddingLeft: 3 }}>
            {/* MAIN METRO TITLE */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <MetroIcon size={20} />
              <span style={{ marginLeft: 6, fontWeight: 600, fontSize: "14px" }}>Metro</span>
            </div>

            {/* EXISTING LINES */}
            <div style={{ marginBottom: "6px", marginLeft: "4px" }}>
              <div style={{ fontWeight: "bold", fontSize: "13px", marginBottom: 4, color: "#444" }}>
                Existing
              </div>

              {[
                { label: "Purple Line", color: "purple" },
                { label: "Green Line", color: "green" },
                { label: "Yellow Line", color: "yellow" },
              ].map((line) => (
                <div
                  key={line.label}
                  style={{ display: "flex", alignItems: "center", marginBottom: 6 }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 4,
                      backgroundColor: line.color,
                      marginRight: 8,
                    }}
                  ></div>
                  <span style={{ fontSize: "13px" }}>{line.label}</span>
                </div>
              ))}
            </div>

            {/* PROPOSED LINES */}
            <div style={{ marginBottom: "6px", marginLeft: "4px" }}>
              <div style={{ fontWeight: "bold", fontSize: "13px", marginBottom: 4, color: "#444" }}>
                Proposed / Under Construction
              </div>

              {[
                { label: "Pink Line", color: "pink" },
                { label: "Blue Line", color: "blue" },
                { label: "Orange Line", color: "orange" },
              ].map((line) => (
                <div
                  key={line.label}
                  style={{ display: "flex", alignItems: "center", marginBottom: 6 }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 4,
                      backgroundColor: line.color,
                      marginRight: 8,
                    }}
                  ></div>
                  <span style={{ fontSize: "13px" }}>{line.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBURBAN RAILWAY */}
        {/* {infrastructureFilters.suburbanRailway && (
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
        )} */}

        {/* SEWAGE LINES */}
        {infrastructureFilters.sewage && (
          <div style={{ marginBottom: "14px", paddingLeft: 3 }}>
            {/* HEADING */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <SewerIcon size={20} />
              <span style={{ marginLeft: 6, fontWeight: 600, fontSize: "14px" }}>
                Sewage Lines
              </span>
            </div>

            {/* BODY */}
            <div style={{ marginLeft: 4 }}>
              {/* < 300mm */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                <div
                  style={{
                    width: 22,
                    height: 4,
                    backgroundColor: "#38c266",
                    marginRight: 8,
                  }}
                ></div>
                <span style={{ fontSize: "13px" }}>Less than 300mm</span>
              </div>

              {/* > 600mm */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 22,
                    height: 4,
                    backgroundColor: "#124a03",
                    marginRight: 8,
                  }}
                ></div>
                <span style={{ fontSize: "13px" }}>Greater than 300mm</span>
              </div>
            </div>
          </div>
        )}


        {/* WATER LINES */}
        {infrastructureFilters.water && (
          <div style={{ marginBottom: "14px", paddingLeft: 3 }}>
            {/* HEADING */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <WaterIcon size={20} />
              <span style={{ marginLeft: 6, fontWeight: 600, fontSize: "14px" }}>
                Water Lines
              </span>
            </div>

            {/* BODY */}
            <div style={{ marginLeft: 4 }}>
              {/* < 300mm */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                <div
                  style={{
                    width: 22,
                    height: 4,
                    backgroundColor: "rgb(84, 103, 232)",
                    marginRight: 8,
                  }}
                ></div>
                <span style={{ fontSize: "13px" }}>Less than 300mm</span>
              </div>

              {/* > 600mm */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 22,
                    height: 4,
                    backgroundColor: "rgb(41, 3, 186)",
                    marginRight: 8,
                  }}
                ></div>
                <span style={{ fontSize: "13px" }}>Greater than 300mm</span>
              </div>
            </div>
          </div>
        )}

        {/* MAJOR ROADS */}
        {infrastructureFilters.majorRoads && (
          <div style={{ marginBottom: "14px", paddingLeft: 3 }}>
            {/* HEADING */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <RoadsIcon size={20} />
              <span style={{ marginLeft: 6, fontWeight: 600, fontSize: "14px" }}>
                Major Roads
              </span>
            </div>

            {/* NICE */}
            <div style={{ marginLeft: 4 }}>
              {/* < 300mm */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 22,
                    height: 4,
                    backgroundColor: "rgb(255, 165, 0)",
                    marginRight: 8,
                  }}
                ></div>
                <span style={{ fontSize: "13px" }}>NICE Ring Road</span>
              </div>

              {/* STRR */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 22,
                    height: 4,
                    backgroundColor: "rgb(0, 0, 255)",
                    marginRight: 8,
                  }}
                ></div>
                <span style={{ fontSize: "13px" }}>Satellite Ring Road</span>
              </div>

              {/* ORR */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 22,
                    height: 4,
                    backgroundColor: "rgb(20, 184, 165)",
                    marginRight: 8,
                  }}
                ></div>
                <span style={{ fontSize: "13px" }}>Outer Ring Road</span>
              </div>

              {/* PRR */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 22,
                    height: 4,
                    backgroundColor: "rgb(0, 0, 0)",
                    marginRight: 8,
                  }}
                ></div>
                <span style={{ fontSize: "13px" }}>Peripheral Ring Road</span>
              </div>
              {/* STRR Proposed */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: 22,
                    height: 4,
                    backgroundColor: "rgb(128, 128, 128)",
                    marginRight: 8,
                  }}
                ></div>
                <span style={{ fontSize: "13px" }}>Satellite Ring Road - Proposed</span>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
