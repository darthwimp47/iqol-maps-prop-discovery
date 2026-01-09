import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

interface MainLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  activeTab?: "map" | "list";
  isMobile?: boolean;
  setActiveTab: Dispatch<SetStateAction<"map" | "list">>;
}

export default function MainLayout({
  left,
  right,
  activeTab = "map",
  isMobile,
  setActiveTab,
}: MainLayoutProps) {

  // 🔒 LOCK BODY SCROLL (LOCAL, NO GLOBAL CSS)
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, []);

  return (
    <>
      {/* ROOT CONTAINER — FIXED VIEWPORT */}
      <div className="flex w-full h-[100dvh] relative overflow-hidden">

        {/* MAP PANEL */}
        <div
          className={`
            flex-1 border-r border-[#e0e0e0] overflow-hidden z-[10]
            ${isMobile && activeTab !== "map" ? "hidden" : "block"}
          `}
        >
          {left}
        </div>

        {/* LIST PANEL */}
        <div
          className={`
            ${isMobile ? "w-full" : "w-1/2"}
            h-full bg-white z-[15]
            shadow-[-9px_0_5px_-6px_rgba(0,0,0,0.35)]
            ${isMobile && activeTab !== "list" ? "hidden" : "block"}
            overflow-y-auto
          `}
        >
          {right}
        </div>
      </div>

      {/* MOBILE TAB TOGGLE */}
      {isMobile && (
        <button
          className="
            fixed left-1/2 -translate-x-1/2 bottom-6
            bg-black text-white px-4 py-2 rounded-full
            shadow-lg font-semibold z-[500]
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
