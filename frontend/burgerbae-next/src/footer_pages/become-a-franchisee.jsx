import React from 'react'

export default function BecomeAFranchisee() {
  return (
    <div className="font-jost bg-white text-black mt-[100px]">

      {/* ── PAGE TITLE ── */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide text-center pt-6 pb-10 px-4">
        Become a Franchisee With Us
      </h1>

      {/* ── CONTENT COLUMN ── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20 space-y-6">

        {/* Sub-heading */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-wide">
          🍔 Join the Burger Bae Family! 🍔
        </h2>

        {/* Main description  */}
        <p className="text-[15px] sm:text-base md:text-[17px] font-black uppercase leading-relaxed tracking-wide">
          Burger Bae is expanding, and we&apos;re looking for passionate entrepreneurs to own and
          operate our franchise stores. If you&apos;re interested in bringing trendy streetwear to your
          city, fill out this form, and our team will connect with you.
        </p>

        {/* Why Partner heading */}
        <p className="text-[15px] sm:text-base md:text-[17px] font-black uppercase tracking-wide">
          📌 Why Partner with Burger Bae?
        </p>

        {/* Benefits list  */}
        <ul className="space-y-2">
          {[
            'A fast-growing fashion brand with a loyal customer base',
            'Access to exclusive designs & inventory',
            'Strong brand marketing & operational support',
            'High-demand streetwear collections',
            'Low-risk, high-return business opportunity',
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[15px] sm:text-base md:text-[17px] font-black uppercase tracking-wide leading-snug"
            >
              <span className="text-xl leading-tight shrink-0">✅</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA text */}
        <p className="text-[15px] sm:text-base md:text-[17px] font-black uppercase tracking-wide">
          Fill in the details below to proceed.
        </p>

        {/* Submit button */}
        <div>
          <button
            className="bg-[#D46A1A] hover:bg-[#b85e16] active:bg-[#9e5213] text-white text-xs sm:text-sm font-black uppercase tracking-widest px-7 py-3 transition-colors duration-150 cursor-pointer"
          >
            Submit Form
          </button>
        </div>

      </div>
    </div>
  )
}