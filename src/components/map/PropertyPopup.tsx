// import React from "react";

export function PropertyPopup({ property }: { property: any }) {
  return (
    <div
      className="
        w-[260px] bg-white rounded-[12px]
        shadow-[0_4px_12px_rgba(0,0,0,0.25)]
        overflow-hidden absolute z-[999]
        -translate-x-1/2 -translate-y-full
      "
    >
      {/* IMAGE */}
      <div className="relative w-full h-[150px]">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
        />

        {/* Heart Button */}
        <div
          className="
            absolute top-[12px] right-[12px]
            bg-transparent border-[15px] border-[rgba(0,0,0,0.1)]
            rounded-full w-[30px] h-[30px]
            flex items-center justify-center cursor-pointer
            text-[20px] transition-transform duration-200
            shadow-[0_1px_3px_rgba(0,0,0,0.1)]
            hover:scale-105
          "
        >
          🤍
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-[10px]">
        <h3 className="m-0 text-[18px] font-bold">
          ₹{property.price.toLocaleString("en-IN")}
        </h3>

        <p className="text-[14px] mt-[4px] mb-[4px] text-[#555]">
          {property.configuration} · {property.propertyType}
        </p>

        <p className="text-[13px] text-[#777] m-0">
          {property.micromarket}, Bangalore
        </p>
      </div>
    </div>
  );
}
