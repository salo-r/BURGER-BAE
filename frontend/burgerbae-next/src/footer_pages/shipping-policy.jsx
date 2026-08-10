import React from 'react'

export default function ShippingPolicy() {
  return (
    <div className="font-jost bg-white text-black min-h-screen mt-[100px]">

      {/* Page Title — large bold uppercase, centered, matching screenshot */}
      <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-wider text-center mb-16 pt-6">
        Shipping Policy
      </h1>

      {/* Narrow centered content column — matches site layout */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">

        {/* Intro */}
        <p className="text-[15px] sm:text-base leading-relaxed text-gray-900 mb-6">
          We know you&apos;re excited — so are we 😛
          <br />
          Here&apos;s everything you need to know about how your order reaches you:
        </p>

        <hr className="border-gray-300 mb-8" />

        {/* PROCESSING TIME */}
        <section className="mb-2">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider flex items-center gap-3 mb-6">
            <span className="text-2xl">📦</span> Processing Time
          </h2>
          <ul className="text-[15px] sm:text-base leading-relaxed text-gray-900 space-y-3 mb-5 list-disc pl-6">
            <li>
              Orders are usually processed within{' '}
              <strong className="font-bold">1–2 business days</strong>
            </li>
            <li>
              During high-demand periods (sales, drops, etc.), processing may take up to{' '}
              <strong className="font-bold">4–6 business days</strong>
            </li>
          </ul>
          <p className="text-[15px] sm:text-base leading-relaxed text-gray-900 mb-8">
            Good things take a little time — but we keep it moving 🚀
          </p>
        </section>

        <hr className="border-gray-300 mb-8" />

        {/* SHIPPING TIME */}
        <section className="mb-2">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider flex items-center gap-3 mb-6">
            <span className="text-2xl">🚛</span> Shipping Time
          </h2>
          <ul className="text-[15px] sm:text-base leading-relaxed text-gray-900 space-y-3 mb-5 list-disc pl-6">
            <li>
              <strong className="font-bold">Standard Delivery:</strong> 3–7 business days
            </li>
          </ul>
          <p className="text-[15px] sm:text-base leading-relaxed text-gray-900 mb-8">
            Delivery timelines may vary slightly depending on your location.
          </p>
        </section>

        <hr className="border-gray-300 mb-8" />

        {/* SHIPPING CHARGES */}
        <section className="mb-2">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider flex items-center gap-3 mb-6">
            <span className="text-2xl">💸</span> Shipping Charges
          </h2>
          <ul className="text-[15px] sm:text-base leading-relaxed text-gray-900 space-y-3 mb-5 list-disc pl-6">
            <li>
              Shipping charges are calculated at checkout based on your location
            </li>
          </ul>
          <p className="text-[15px] sm:text-base leading-relaxed text-gray-900 mb-8">
            No surprises, all transparent ✨
          </p>
        </section>

        <hr className="border-gray-300 mb-8" />

        {/* ORDER TRACKING */}
        <section className="mb-2">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wider flex items-center gap-3 mb-6">
            <span className="text-2xl">📍</span> Order Tracking
          </h2>
          <ul className="text-[15px] sm:text-base leading-relaxed text-gray-900 space-y-3 mb-5 list-disc pl-6">
            <li>
              Once your order is dispatched, you&apos;ll receive a{' '}
              <strong className="font-bold">tracking link via SMS/Email</strong>
            </li>
          </ul>
          <p className="text-[15px] sm:text-base leading-relaxed text-gray-900 mb-8">
            Track it, refresh it, stalk it — we get it 👀
          </p>
        </section>

   

      </div>
    </div>
  )
}