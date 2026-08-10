import React from 'react'

export default function ReturnExchange() {
  return (
    <div className="font-jost bg-white text-black  mt-[100px]">

      {/* ── PAGE TITLE ── */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide text-center pt-16 pb-14 px-4">
        Return &amp; Exchange
      </h1>

      {/* ── CONTENT COLUMN ── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-24 flex flex-col items-center">

        {/* Instruction text */}
        <p className="text-[13px] sm:text-[14px] md:text-[15px] font-semibold uppercase tracking-widest text-center mb-10">
          Click the button to start return/exchange process.
        </p>

        {/* ── ILLUSTRATED GREEN START BUTTON (SVG) ── */}
        <button
          className="cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 focus:outline-none"
          aria-label="Start Return or Exchange"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 340 160"
            className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto"
            role="img"
            aria-label="Start"
          >
            {/* ── Drop shadow ── */}
            <path
              d="M 22 18 L 258 14 Q 300 14 318 50 L 330 80 Q 338 100 318 118 L 258 146 L 22 148 Q 6 148 6 132 L 6 34 Q 6 18 22 18 Z"
              fill="#1a1a1a"
              transform="translate(4, 5)"
            />

            {/* ── Main green arrow shape ── */}
            <path
              d="M 20 16 L 256 12 Q 298 12 316 48 L 328 78 Q 336 98 316 116 L 256 144 L 20 146 Q 4 146 4 130 L 4 32 Q 4 16 20 16 Z"
              fill="#7ED321"
              stroke="#1a1a1a"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* ── Arrow point on the right ── */}
            <path
              d="M 290 12 L 336 79 L 290 144"
              fill="#6BBF1A"
              stroke="#1a1a1a"
              strokeWidth="3.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* ── Inner highlight line (top-left bevel feel) ── */}
            <path
              d="M 22 26 L 255 22 Q 285 22 300 46 L 310 68"
              fill="none"
              stroke="#a8e63d"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.55"
            />

            {/* ── "START" text — hand-drawn style using bold font ── */}
            <text
              x="152"
              y="97"
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="'Jost', 'Arial Black', sans-serif"
              fontWeight="900"
              fontSize="52"
              fill="white"
              stroke="#1a1a1a"
              strokeWidth="6"
              paintOrder="stroke"
              letterSpacing="2"
            >
              START
            </text>
          </svg>
        </button>

      </div>
    </div>
  )
}