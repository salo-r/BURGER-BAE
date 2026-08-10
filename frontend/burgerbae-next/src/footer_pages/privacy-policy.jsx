import React from 'react'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="font-jost bg-white text-black min-h-screen mt-[50px]">
      <div className="max-w-3xl  mx-auto px-5 sm:px-8 py-12 sm:py-16">

        {/* Page Title */}
        <h1 className="text-[26px] sm:text-[32px]  text-center font-bold uppercase tracking-tight my-10 leading-tight">
          Privacy Policy
        </h1>
        <p className="text-[15px] sm:text-[18px]  mb-10 leading-relaxed">
          This Privacy Policy describes how{' '}
          <Link
            href="http://burgerbaeclothing.com"
            className="underline underline-offset-2 text-black hover:opacity-60 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            burgerbaeclothing.com
          </Link>{' '}
          (the &quot;Site&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects your Personal Information when you visit or make a purchase from our website.
        </p>

        <div className="border-t border-gray-200 mb-10" />

        {/* ── WHAT WE COLLECT ── */}
        <section className="mb-10">
          <h2 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
            <span>📊</span> What We Collect
          </h2>
          <p className="text-[15px] sm:text-[18px]  leading-relaxed mb-8">
            When you use our Site, we collect certain information to make your experience smooth and personalized.
          </p>

          {/* Device Information */}
          <div className="mb-8 pl-4 ">
            <h3 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>📱</span> Device Information
            </h3>
            <p className="text-[13px] sm:text-[14px]  uppercase tracking-widest mb-2 font-semibold">
              We may collect:
            </p>
            <ul className="space-y-[6px] mb-4">
              {[
                'Browser type',
                'IP address',
                'Time zone',
                'Cookies & tracking data',
                'Pages/products you view',
                'How you interact with our website',
              ].map((item) => (
                <li key={item} className="text-[15px] sm:text-[18px]  flex items-start gap-2 leading-snug">
                  <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-black shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[15px] sm:text-[18px] leading-relaxed">
              <span className="font-semibold text-black">Why?</span> To improve website performance, user experience, and analytics.
            </p>
          </div>

          {/* Order Information */}
          <div className="mb-8 pl-4 ">
            <h3 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>🛒</span> Order Information
            </h3>
            <p className="text-[13px] sm:text-[14px]  uppercase tracking-widest mb-2 font-semibold">
              When you place an order, we collect:
            </p>
            <ul className="space-y-[6px] mb-4">
              {[
                'Name',
                'Shipping & billing address',
                'Payment details (processed securely)',
                'Email & phone number',
              ].map((item) => (
                <li key={item} className="text-[15px] sm:text-[18px] flex items-start gap-2 leading-snug">
                  <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-black shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[15px] sm:text-[18px]  leading-relaxed">
              <span className="font-semibold text-black">Why?</span> To process your order, handle delivery, send updates, and prevent fraud.
            </p>
          </div>

          {/* Support Information */}
          <div className="pl-4">
            <h3 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>💬</span> Support Information
            </h3>
            <p className="text-[14px] sm:text-[13px] uppercase tracking-widest mb-2 font-semibold">
              If you reach out to us, we may collect:
            </p>
            <ul className="space-y-[6px] mb-4">
              {[
                'Your contact details',
                'Order info',
                'Messages you send us',
              ].map((item) => (
                <li key={item} className="text-[15px] sm:text-[18px] flex items-start gap-2 leading-snug">
                  <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-black shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[15px] sm:text-[18px] leading-relaxed">
              <span className="font-semibold text-black">Why?</span> To help you faster and resolve your queries.
            </p>
          </div>
        </section>

        <div className="border-t border-gray-200 mb-10" />

        {/* ── MINORS ── */}
        <section className="mb-10">
          <h2 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>👶</span> Minors
          </h2>
          <p className="text-[15px] sm:text-[18px]  leading-relaxed">
            Burger Bae is open to everyone — including minors 💅 However, we recommend using the Site under parental/guardian guidance where applicable.
          </p>
        </section>

        <div className="border-t border-gray-200 mb-10" />

        {/* ── HOW WE SHARE YOUR DATA ── */}
        <section className="mb-10">
          <h2 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>🔁</span> How We Share Your Data
          </h2>
          <p className="text-[15px] sm:text-[18px]  leading-relaxed mb-4">
            We only share your data with trusted partners to run our business smoothly:
          </p>
          <ul className="space-y-[6px] mb-4">
            {[
              'Shopify (store platform)',
              'Payment gateways (like Razorpay)',
              'Delivery partners (for shipping your orders)',
              'Analytics & marketing tools (like Google & Meta)',
            ].map((item) => (
              <li key={item} className="text-[15px] sm:text-[18px]  flex items-start gap-2 leading-snug">
                <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-black shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[15px] sm:text-[18px]  leading-relaxed">
            We may also share information if required by law.
          </p>
        </section>

        <div className="border-t border-gray-200 mb-10" />

        {/* ── ADS & TRACKING ── */}
        <section className="mb-10">
          <h2 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>📢</span> Ads &amp; Tracking
          </h2>
          <p className="text-[15px] sm:text-[18px]  leading-relaxed mb-4">
            We use cookies and tracking tools to:
          </p>
          <ul className="space-y-[6px] mb-4">
            {[
              'Show you relevant ads',
              'Improve marketing campaigns',
              'Understand what you like',
            ].map((item) => (
              <li key={item} className="text-[15px] sm:text-[18px] flex items-start gap-2 leading-snug">
                <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-black shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[15px] sm:text-[18px]  leading-relaxed">
            You can control or disable ads through your browser or ad settings.
          </p>
        </section>

        <div className="border-t border-gray-200 mb-10" />

        {/* ── HOW WE USE YOUR INFORMATION ── */}
        <section className="mb-10">
          <h2 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>🛍️</span> How We Use Your Information
          </h2>
          <p className="text-[15px] sm:text-[18px]  leading-relaxed mb-4">
            We use your data to:
          </p>
          <ul className="space-y-[6px]">
            {[
              'Process and deliver orders',
              'Communicate updates',
              'Improve our website',
              'Send offers & "hey bae" notifications (only if you opt in)',
            ].map((item) => (
              <li key={item} className="text-[15px] sm:text-[18px] flex items-start gap-2 leading-snug">
                <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-black shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="border-t border-gray-200 mb-10" />

        {/* ── COOKIES ── */}
        <section className="mb-10">
          <h2 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>🍪</span> Cookies
          </h2>
          <p className="text-[15px] sm:text-[18px]  leading-relaxed mb-3">
            Cookies help us remember your preferences and improve your experience.
          </p>
          <p className="text-[15px] sm:text-[18px] leading-relaxed">
            You can disable cookies in your browser, but some features may not work properly.
          </p>
        </section>

        <div className="border-t border-gray-200 mb-10" />

        {/* ── DATA RETENTION ── */}
        <section className="mb-10">
          <h2 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>🗃️</span> Data Retention
          </h2>
          <p className="text-[15px] sm:text-[18px]  leading-relaxed">
            We keep your information only as long as necessary for orders, legal requirements, or improving our services.
          </p>
        </section>

        <div className="border-t border-gray-200 mb-10" />

        {/* ── UPDATES TO THIS POLICY ── */}
        <section className="mb-10">
          <h2 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>🔄</span> Updates to This Policy
          </h2>
          <p className="text-[15px] sm:text-[18px] leading-relaxed">
            We may update this Privacy Policy occasionally to reflect changes in our practices.
          </p>
        </section>

        <div className="border-t border-gray-200 mb-10" />

        {/* ── NEED HELP ── */}
        <section className="mb-10">
          <h2 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>💬</span> Need Help?
          </h2>
          <p className="text-[15px] sm:text-[18px] leading-relaxed mb-2">
            To reach out to us: Go to{' '}
            <span className="font-semibold text-black">Menu → Support → Contact Us</span>
          </p>
          <p className="text-[15px] sm:text-[18px]  leading-relaxed">
            We&apos;ll take it from there 🚀
          </p>
        </section>

        <div className="border-t border-gray-200 mb-10" />

        {/* ── WHY BURGER BAE ── */}
        <section>
          <h2 className="text-[16px] sm:text-[19px] font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <span>🍔</span> Why Burger Bae?
          </h2>
          <p className="text-[15px] sm:text-[18px]  leading-relaxed">
            Basic isn&apos;t our thing. We create pieces that actually stand out.
          </p>
        </section>

      </div>
    </div>
  )
}