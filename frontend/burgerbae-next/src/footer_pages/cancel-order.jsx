import React from "react";

export default function CancelOrder() {
  return (
    <div className="font-jost bg-white text-black mt-[100px]">
      {/* ── PAGE TITLE ── */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide text-center pt-16 pb-14 px-4">
        Cancel/Edit Order
      </h1>

      {/* ── CONTENT COLUMN ── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-24">
        {/* Tagline */}
        <p className="text-[15px] sm:text-base md:text-[17px] font-black uppercase tracking-wide leading-relaxed mb-8">
          Changed your taste? We get it – Cancel that order, no hard fillings!
          🤯
        </p>

        {/* Submit button */}
        <button className="bg-[#D46A1A] hover:bg-[#b85e16] active:bg-[#9e5213] text-white text-xs sm:text-sm font-black uppercase tracking-widest px-7 py-3 transition-colors duration-150 cursor-pointer">
          Submit Request
        </button>
      </div>
    </div>
  );
}
