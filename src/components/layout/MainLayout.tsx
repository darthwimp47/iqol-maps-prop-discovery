import type { Dispatch, SetStateAction } from "react";

interface MainLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  activeTab?: "map" | "list";
  isMobile?: boolean;
  setActiveTab: Dispatch<SetStateAction<"map" | "list">>
}

export default function MainLayout({ left, right, activeTab, isMobile, setActiveTab }: MainLayoutProps) {
  // return (
  //   <div className="flex w-full h-full">
  //     {!isMobile ? (
  //       <>
  //         {/* LEFT PANEL (Desktop) */}
  //         <div className="flex-1 border-r border-[#e0e0e0] overflow-hidden z-[10]">
  //           {left}
  //         </div>

  //         {/* RIGHT PANEL (Desktop) */}
  //         <div
  //           className="
  //             w-1/2 h-full overflow-y-auto bg-white
  //             shadow-[-9px_0_5px_-6px_rgba(0,0,0,0.35)]
  //             z-[15]
  //           "
  //         >
  //           {right}
  //         </div>
  //       </>
  //     ) : (
  //       <>
  //         {/* MOBILE — MAP TAB */}
  //         {activeTab === "map" && (
  //           <div className="flex-1 border-r border-[#e0e0e0] overflow-hidden z-[10]">
  //             {left}
  //           </div>
  //         )}

  //         {/* MOBILE — LIST TAB */}
  //         {activeTab === "list" && (
  //           <div
  //             className="
  //               w-full h-full overflow-y-auto bg-white
  //               shadow-[-9px_0_5px_-6px_rgba(0,0,0,0.35)]
  //               z-[15]
  //             "
  //           >
  //             {right}
  //           </div>
  //         )}
  //       </>
  //     )}
  //   </div>
  // );
  return (
    <>
      <div className="flex w-full h-full">
        {/* LEFT PANEL (Desktop) */}
        {(!isMobile || activeTab === 'map') && (
          < div className="flex-1 border-r border-[#e0e0e0] overflow-hidden z-[10]">
            {left}
          </div>
        )
        }

        {/* RIGHT PANEL (Desktop) */}
        {
          (!isMobile || activeTab === 'list') && (
            <div
              className=
              {`${isMobile ? "w-full" : "w-1/2"} h-full overflow-y-auto bg-white
              shadow-[-9px_0_5px_-6px_rgba(0,0,0,0.35)]
              z-[15]`}

            >
              {right}
            </div>

          )
        }
      </div >
      {isMobile && (
        <button
          className="
      absolute left-1/2 -translate-x-1/2 bottom-6
      bg-black text-white px-4 py-2 rounded-full
      shadow-lg font-semibold z-[9999]
    "
          onClick={() =>
            activeTab === "map" ? setActiveTab("list") : setActiveTab("map")
          }
        >
          {activeTab === "map" ? "List" : "Map"}
        </button>
      )}

    </>
  );
}
