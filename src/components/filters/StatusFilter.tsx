// import { useFilterStore } from "../../store/filtersStore";

// export function StatusFilter() {
//   const {
//     status,
//     isStatusDropdownOpen,
//     openStatusDropdown,
//     closeStatusDropdown,
//     closeAllDropdowns,
//   } = useFilterStore();

//   return (
//     <button
//       onClick={(e) => {
//         e.stopPropagation();
//         closeAllDropdowns(); // close others first
//         isStatusDropdownOpen ? closeStatusDropdown() : openStatusDropdown();
//       }}
//       style={{
//         padding: "8px 14px",
//         border: status.length > 0 ? "2px solid #0077ff" : "1px solid #d0d0d0",
//         borderRadius: "6px",
//         background: "white",
//         cursor: "pointer",
//         fontSize: "14px",
//         fontWeight: 600,
//         color: "#222",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         gap: "6px",
//       }}
//     >
//       <span>
//         {status.length > 0 ? status.join(", ") : "Status"}
//       </span>
//       <span
//         style={{
//           display: "inline-block",
//           transition: "transform 0.2s",
//           transform: isStatusDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
//         }}
//       >
//         ▼
//       </span>
//     </button>
//   );
// }
