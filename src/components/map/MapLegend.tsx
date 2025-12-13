// import { AmenitiesIcon, MetroIcon, WaterIcon, SewerIcon, RoadsIcon } from "../map/LayersIcon";

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
        onClick={onToggle}
        className="
        absolute bottom-[25px] left-[5px] z-[999]
        bg-white rounded-full
        w-[32px] h-[32px]
        flex items-center justify-center
        shadow-[0_4px_12px_rgba(0,0,0,0.15)]
        cursor-pointer
        text-[#333] font-semibold text-[14px]
      "
      >
        i
      </div>
    );
  }

  return (
    <div
      className={`
        absolute bottom-[25px] left-[5px] w-[260px] bg-white rounded-[10px]
        shadow-[0_4px_12px_rgba(0,0,0,0.15)] p-[6px] z-[999] text-[#333]
        ${visible ? "block" : "hidden"}
      `}
    >
      {/* Header */}
      <div className="flex items-center relative px-[6px] py-[6px] border-b border-[#ddd] mb-[8px]">
        <img
          src="src/assets/AmenitiesIcon.svg"
          width={25}
          height={25}
        />
        <h4 className="absolute left-[46px] m-0 text-[16px] font-bold">Legend</h4>

        <button
          onClick={onToggle}
          className="
            absolute right-[18px] p-0 bg-transparent border-none
            font-bold text-[18px] cursor-pointer
          "
        >
          –
        </button>
      </div>

      {/* Scroll container */}
      <div className="max-h-[270px] overflow-y-auto">
        {/* CDP Map */}
        {showCDP && (
          <div className="mb-[14px] pl-[3px]">
            <h5 className="m-0 font-semibold mb-[6px] pl-[6px]">
              CDP Map (Comprehensive Development Plan)
            </h5>
            <img
              src="src/assets/cdpLegend.svg"
              alt="CDP Legend"
              className="w-[500px] pl-[6px]"
            />
          </div>
        )}

        {/* METRO */}
        {infrastructureFilters.metro && (
          <div className="mb-[14px] pl-[3px]">
            <div className="flex items-center mb-[8px]">
              <img
                src="src/assets/MetroIcon.svg"
                width={25}
                height={25} />
              <span className="ml-[6px] font-semibold text-[14px]">Metro</span>
            </div>

            {/* Existing Lines */}
            <div className="mb-[6px] ml-[4px]">
              <div className="font-bold text-[13px] mb-[4px] text-[#444]">Existing</div>

              {[
                { label: "Purple Line", color: "purple" },
                { label: "Green Line", color: "green" },
                { label: "Yellow Line", color: "yellow" },
              ].map((line) => (
                <div key={line.label} className="flex items-center mb-[6px]">
                  <div
                    className="w-[22px] h-[4px] mr-[8px]"
                    style={{ backgroundColor: line.color }}
                  ></div>
                  <span className="text-[13px]">{line.label}</span>
                </div>
              ))}
            </div>

            {/* Proposed Lines */}
            <div className="mb-[6px] ml-[4px]">
              <div className="font-bold text-[13px] mb-[4px] text-[#444]">
                Proposed / Under Construction
              </div>

              {[
                { label: "Pink Line", color: "pink" },
                { label: "Blue Line", color: "blue" },
                { label: "Orange Line", color: "orange" },
              ].map((line) => (
                <div key={line.label} className="flex items-center mb-[6px]">
                  <div
                    className="w-[22px] h-[4px] mr-[8px]"
                    style={{ backgroundColor: line.color }}
                  ></div>
                  <span className="text-[13px]">{line.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEWAGE */}
        {infrastructureFilters.sewage && (
          <div className="mb-[14px] pl-[3px]">
            <div className="flex items-center mb-[8px]">
              <img
                src="src/assets/SewerIcon.svg"
                height={20}
                width={20}
              />
              <span className="ml-[6px] font-semibold text-[14px]">Sewage Lines</span>
            </div>

            <div className="ml-[4px]">
              <div className="flex items-center mb-[6px]">
                <div className="w-[22px] h-[4px] mr-[8px] bg-[#38c266]"></div>
                <span className="text-[13px]">Less than 300mm</span>
              </div>

              <div className="flex items-center">
                <div className="w-[22px] h-[4px] mr-[8px] bg-[#124a03]"></div>
                <span className="text-[13px]">Greater than 300mm</span>
              </div>
            </div>
          </div>
        )}

        {/* WATER */}
        {infrastructureFilters.water && (
          <div className="mb-[14px] pl-[3px]">
            <div className="flex items-center mb-[8px]">
              <img
                src="src/assets/WaterIcon.svg"
                height={20}
                width={20}
              />
              <span className="ml-[6px] font-semibold text-[14px]">Water Lines</span>
            </div>

            <div className="ml-[4px]">
              <div className="flex items-center mb-[6px]">
                <div className="w-[22px] h-[4px] mr-[8px] bg-[rgb(84,103,232)]"></div>
                <span className="text-[13px]">Less than 300mm</span>
              </div>

              <div className="flex items-center">
                <div className="w-[22px] h-[4px] mr-[8px] bg-[rgb(41,3,186)]"></div>
                <span className="text-[13px]">Greater than 300mm</span>
              </div>
            </div>
          </div>
        )}

        {/* Major Roads */}
        {infrastructureFilters.majorRoads && (
          <div className="mb-[14px] pl-[3px]">
            <div className="flex items-center mb-[8px]">
              <img
                src="src/assets/RoadsIcon.svg"
                height={20}
                width={20}
              />              <span className="ml-[6px] font-semibold text-[14px]">Major Roads</span>
            </div>

            <div className="ml-[4px] space-y-[2px]">
              {[
                { label: "NICE Ring Road", color: "rgb(255,165,0)" },
                { label: "Satellite Ring Road", color: "rgb(0,0,255)" },
                { label: "Outer Ring Road", color: "rgb(20,184,165)" },
                { label: "Peripheral Ring Road", color: "rgb(0,0,0)" },
                { label: "Satellite Ring Road - Proposed", color: "rgb(128,128,128)" },
              ].map((l) => (
                <div key={l.label} className="flex items-center">
                  <div
                    className="w-[22px] h-[4px] mr-[8px]"
                    style={{ backgroundColor: l.color }}
                  ></div>
                  <span className="text-[13px]">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
