export default function Header({ isMobile }: { isMobile: boolean }) {
  if (isMobile) return null; // hide header on mobile

  return (
    <header
      className="
        w-full h-[70px] bg-white text-[#333]
        border-b border-[#cccccc]
        flex items-center justify-center
        px-[20px] font-semibold text-[30px]
        relative z-[10]
      "
    >
      IQOL MAPS - PropDiscovery
    </header>
  );
}
