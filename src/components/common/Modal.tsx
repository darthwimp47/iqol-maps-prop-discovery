export function BottomSheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-[9999] flex justify-center items-end"
      onClick={onClose}
    >
      <div
        className="w-full max-h-[90%] bg-white rounded-t-2xl p-5 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
