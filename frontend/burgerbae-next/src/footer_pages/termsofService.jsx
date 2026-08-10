import React from 'react'

export default function TermsOfService() {
  return (
    <div className="font-jost bg-white text-[#1a1a1a] px-4 py-10 md:px-10 lg:px-20 leading-relaxed tracking-tight mt-[100px]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl text-center md:text-4xl font-bold mb-10 uppercase ">
          Terms of service
        </h1>

        {/* OVERVIEW */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>🧾</span> OVERVIEW
          </h2>
          <div className="space-y-4 text-[14px] md:text-[17px] text-gray-800">
            <p>This website is operated by <span className="italic font-semibold text-black">Burger Bae</span> (“we”, “us”, “our”). By visiting our site or purchasing from us, you agree to be bound by these Terms of Service (“Terms”).</p>
            <p>These Terms apply to all users of the site — including browsers, customers, and anyone interacting with our content.</p>
            <p>If you do not agree with any part of these Terms, please do not use our website.</p>
            <p>We may update these Terms from time to time. Continued use of the site means you accept those changes.</p>
            <p>Our store is powered by Shopify, which enables us to sell our products and services to you.</p>
          </div>
        </section>

        {/* SECTION 1 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase">
            <span>🛍️</span> SECTION 1 — ONLINE STORE TERMS
          </h2>
          <p className="mb-4 text-[14px] md:text-[17px]">By using this site, you confirm that:</p>
          <ul className="list-disc ml-6 space-y-3 text-[14px] md:text-[17px]">
            <li>You can use this website independently or under parental/guardian guidance 👶</li>
            <li>You will not use our products or services for any illegal or unauthorized purpose ❌</li>
            <li>You will not violate any laws (including copyright laws)</li>
            <li>You will not transmit any harmful code, viruses, or disruptive elements</li>
          </ul>
        </section>

        {/* SECTION 2 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>⚙️</span> SECTION 2 — GENERAL CONDITIONS
          </h2>
          <ul className="list-disc ml-6 space-y-3 text-[14px] md:text-[17px]">
            <li>We reserve the right to refuse service to anyone at any time</li>
            <li>Your content (excluding payment details) may be transferred across networks</li>
            <li>Payment information is always securely encrypted 🔐</li>
            <li>You may not copy, resell, or exploit any part of our service without permission</li>
          </ul>
        </section>

        {/* SECTION 3 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>📊</span> SECTION 3 — INFORMATION ACCURACY
          </h2>
          <p className="text-[17px] mb-4">We try our best to keep everything accurate and updated, but:</p>
          <ul className="list-disc ml-6 space-y-3 text-[14px] md:text-[17px]">
            <li>Information may not always be complete or current</li>
            <li>Content is for general reference only</li>
            <li>Any reliance on this information is at your own risk</li>
          </ul>
        </section>

        {/* SECTION 4 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>💸</span> SECTION 4 — PRICING & SERVICE CHANGES
          </h2>
          <ul className="list-disc ml-6 space-y-3 text-[14px] md:text-[17px]">
            <li>Prices may change without notice</li>
            <li>We may modify or discontinue products/services anytime</li>
            <li>We are not liable for any such changes</li>
          </ul>
        </section>

        {/* SECTION 5 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase">
            <span>👕</span> SECTION 5 — PRODUCTS
          </h2>
          <div className="space-y-4 text-[14px] md:text-[17px]">
            <p>Some products may be available only online.</p>
            <p>Limited quantities may apply ⏳</p>
            <p>Colors may vary slightly depending on your screen.</p>
            <p className="font-bold underline">All products are subject to our Exchange Policy (no refunds, only exchanges/store credits).</p>
          </div>
        </section>

        {/* SECTION 6 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase">
            <span>📋</span> SECTION 6 — ORDERS & BILLING
          </h2>
          <p className="mb-4 text-[14px] md:text-[17px]">We may cancel or limit orders if:</p>
          <ul className="list-disc ml-6 space-y-3 text-[14px] md:text-[17px]">
            <li>They appear fraudulent</li>
            <li>Multiple orders are placed under the same account/payment</li>
          </ul>
          <p className="mt-4 text-[14px] md:text-[17px]">You agree to provide accurate and updated information for all purchases.</p>
        </section>

        {/* SECTION 7 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>🧰</span> SECTION 7 — THIRD-PARTY TOOLS
          </h2>
          <p className="text-[14px] md:text-[17px]">We may offer tools from third parties. These are provided “as is.” We do not control or guarantee them. Use them at your own risk.</p>
        </section>

        {/* SECTION 8 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>🔗</span> SECTION 8 — THIRD-PARTY LINKS
          </h2>
          <p className="text-[14px] md:text-[17px]">We are not responsible for the content, policies, or transactions made on third-party platforms linked on our site.</p>
        </section>

        {/* SECTION 9 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>💬</span> SECTION 9 — USER CONTENT
          </h2>
          <p className="text-[14px] md:text-[17px]">If you send us feedback, we can use it freely. You agree not to post illegal, abusive, or misleading content.</p>
        </section>

        {/* SECTION 10 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>🔐</span> SECTION 10 — PERSONAL INFORMATION
          </h2>
          <p className="text-[14px] md:text-[17px]">Your personal information is handled as per our <span className="underline cursor-pointer font-semibold">Privacy Policy</span>.</p>
        </section>

        {/* SECTION 11 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>⚠️</span> SECTION 11 — ERRORS & UPDATES
          </h2>
          <p className="text-[14px] md:text-[17px]">We reserve the right to correct errors in product details, pricing, or offers and to cancel orders without prior notice.</p>
        </section>

        {/* SECTION 12 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>🚫</span> SECTION 12 — PROHIBITED USES
          </h2>
          <p className="text-[14px] md:text-[17px]">You may not use our site for illegal activities, harassment, spamming, hacking, or spreading malware. Violation results in termination of access.</p>
        </section>

        {/* SECTION 13 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase">
            <span>⚖️</span> SECTION 13 — DISCLAIMER & LIABILITY
          </h2>
          <p className="text-[14px] md:text-[17px]">All products are provided “as is.” Burger Bae is not liable for losses or damages arising from site use.</p>
        </section>

        {/* SECTION 14 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase">
            <span>🛡️</span> SECTION 14 — INDEMNIFICATION
          </h2>
          <p className="text-[14px] md:text-[17px]">You agree to protect Burger Bae from claims arising from your misuse of the site.</p>
        </section>

        {/* SECTION 15 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase">
            <span>✂️</span> SECTION 15 — SEVERABILITY
          </h2>
          <p className="text-[14px] md:text-[17px]">If any part of these Terms is found invalid, the rest will still apply.</p>
        </section>

        {/* SECTION 16 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>⛔</span> SECTION 16 — TERMINATION
          </h2>
          <p className="text-[14px] md:text-[17px]">We may suspend access if you violate these Terms or if we suspect misuse.</p>
        </section>

        {/* SECTION 17 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>📑</span> SECTION 17 — ENTIRE AGREEMENT
          </h2>
          <p className="text-[14px] md:text-[17px]">These Terms and our policies form the complete agreement between you and Burger Bae.</p>
        </section>

        {/* SECTION 18 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase ">
            <span>🇮🇳</span> SECTION 18 — GOVERNING LAW
          </h2>
          <p className="text-[14px] md:text-[17px]">These Terms are governed by the laws of <span className="font-bold">India</span>.</p>
        </section>

        {/* SECTION 19 */}
        <section className="mb-12">
          <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold mb-6 border-b border-gray-200 pb-2 uppercase">
            <span>🔄</span> SECTION 19 — CHANGES TO TERMS
          </h2>
          <p className=" text-[14px] md:text-[17px]">We may update these Terms anytime. Continued use of the website means you accept the updated version.</p>
        </section>

       
        
      </div>
    </div>
  )
}