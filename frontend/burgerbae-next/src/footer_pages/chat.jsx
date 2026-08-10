import React from 'react'

export default function ChatWithUs() {
  return (
    <div className="font-jost bg-white text-black mt-[100px]">

      {/* ── PAGE TITLE ── */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide text-center pt-16 pb-14 px-4">
        Chat With Us
      </h1>

      {/* ── CONTENT COLUMN ── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-24">

        {/* Tagline */}
        <p className="text-[15px] sm:text-base md:text-[17px] font-black uppercase tracking-wide leading-relaxed mb-6">
          Slide into our chat – our experts serve up advice as good as our bites! 📋 💬
        </p>

        {/* Phone number  */}
        <p className="text-[15px] sm:text-base font-normal tracking-normal mb-6">
          +917711993343
        </p>

        {/* Note  */}
        <p className="text-[15px] sm:text-base font-normal tracking-normal">
          (This number is available on whatsapp only)
        </p>

      </div>
    </div>
  )
}