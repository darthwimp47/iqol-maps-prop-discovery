export function MoreFilters({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="
        fixed inset-0 bg-[rgba(0,0,0,0.4)] z-[9999]
        flex justify-center items-end
      "
      onClick={onClose}
    >
      <div
        className="
          w-full max-h-[90%] bg-white
          rounded-t-[18px] p-5
          overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-[18px]">
          <h2 className="text-[20px] font-bold">Filters</h2>
          <button
            onClick={onClose}
            className="
              text-[22px] bg-none border-none cursor-pointer
            "
          >
            ✕
          </button>
        </div>

        {/* Price */}
        <h3 className="text-[16px] font-semibold">Price</h3>
        <hr className="my-2 mb-4" />

        {/* Configuration */}
        <h3 className="text-[16px] font-semibold">Configuration</h3>
        <hr className="my-2 mb-4" />

        {/* Property Type */}
        <h3 className="text-[16px] font-semibold">Property Type</h3>
        <hr className="my-2 mb-4" />

        {/* Save Search button (disabled for now) */}
        {/* <button
          className="
            w-full bg-[#111] text-white font-bold text-[17px]
            py-3 rounded-lg mt-5
          "
        >
          Save Search
        </button> */}
      </div>
    </div>
  );
}
