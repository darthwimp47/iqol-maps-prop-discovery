interface FilterButtonProps {
  label: string;
  onClick: () => void;
  isOpen?: boolean;
  isActive?: boolean;
}

export function FilterButton({
  label,
  onClick,
  isOpen = false,
  isActive = false,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex gap-2 items-center font-semibold text-[14px] cursor-pointer
        px-[14px] py-[8px] rounded-md bg-white text-[#222]
        ${isActive ? "border-2 border-[#0077ff]" : "border border-[#d0d0d0]"}
      `}
    >
      <span className="truncate max-w-[110px] text-left">
        {label}
      </span>

      <span
        className={`
          transition-transform
          ${isOpen ? "rotate-180" : ""}
        `}
      >
        ▼
      </span>
    </button>
  );
}
