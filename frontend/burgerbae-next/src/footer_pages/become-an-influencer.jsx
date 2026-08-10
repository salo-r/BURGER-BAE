import React from 'react'

export default function BecomeAnInfluencer() {
  return (
    <div className="font-jost bg-white text-black mt-[100px]">

      {/* ── PAGE TITLE ── */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide text-center pt-6 pb-12 px-4">
        Become an Influencer With Us
      </h1>

      {/* ── CONTENT COLUMN ── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">

        {/* Intro paragraph */}
        <p className="text-[15px] sm:text-base md:text-[17px] font-black uppercase leading-relaxed tracking-wide mb-10">
          Hey Influencer! 🚀 We at Burger Bae are looking for passionate content creators to
          collaborate with us. If you love fashion and have an engaged audience, fill out this form
          to join our influencer program. 💅 ✨
        </p>

        {/* What's in it for you  */}
        <p className="text-[15px] sm:text-base md:text-[17px] font-black uppercase tracking-wide flex items-center gap-2 mb-10">
          <span>📌</span> What&apos;s in it for you?
        </p>

        {/* Benefits list  */}
        <ul className="space-y-1 mb-6">
          {[
            'Exclusive Burger Bae Merchandise',
            'Paid Collaborations & Commission-Based Partnerships',
            'Features on Our Social Media & Website',
            'First Access to New Collections',
          ].map((item, i) => (
            <li
              key={i}
              className="text-[15px] sm:text-base md:text-[17px] font-black uppercase tracking-wide leading-snug"
            >
              {item}
            </li>
          ))}
        </ul>

        {/* CTA line */}
        <p className="text-[15px] sm:text-base md:text-[17px] font-black uppercase tracking-wide mb-8">
          Fill out the details below, and we&apos;ll get back to you! 💗
        </p>

        {/* Submit button  */}
        <button className="bg-[#D46A1A] hover:bg-[#b85e16] active:bg-[#9e5213] text-white text-xs sm:text-sm font-black uppercase tracking-widest px-7 py-3 transition-colors duration-150 cursor-pointer">
          Submit Form
        </button>

      </div>
    </div>
  )
}