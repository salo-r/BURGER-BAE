import React from 'react'

export default function RefundPolicy() {
  return (
    <div className="font-jost bg-white text-[#1a1a1a] px-6 py-12 md:px-16 lg:px-32 leading-[1.6]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* MAIN TITLE */}
        <h1 className=" text-[35px] md:text-[40px] font-bold text-center mb-16 uppercase tracking-tighter ">
          REFUND POLICY
        </h1>

        {/* NOTE SECTION */}
        <div className="mb-8">
          <p className=" text-[16px] md:text-[18px] font-medium underline mb-4 flex items-center gap-2">
            📌 <span>Note:</span>
          </p>
          <div className=" text-[15px] md:text-[17px] space-y-2">
            <p>1- <span className="italic">We do not provide refunds in any case</span>; only exchanges/store credits are available.</p>
            <p>2- Store credits are not applicable on sale products.</p>
          </div>
        </div>

        {/* EXCHANGE POLICY SECTION */}
        <div className="mb-12">
          <h2 className="text-[16px] md:text-[18px] font-medium underline mb-6 bg-gray-100 inline-flex items-center gap-2 px-2 py-1">
            ✅ Exchange Policy:
          </h2>
          
          <div className="space-y-6 text-[15px] md:text-[17px] pl-2">
            <div>
              <p>1. <span className="italic font-bold">Defective/Wrong Item Received:</span> If you receive a defective, wrong item, wrong color, or different size, we will exchange or replace it for free.</p>
            </div>
            <div>
              <p>2. <span className="italic font-bold">Correct Size but Fit Issues:</span> If you receive the correct size but still face size issues, we will exchange it with a nominal fee.</p>
            </div>
            <div>
              <p>3. <span className="italic font-bold">Ineligible Reasons:</span> Exchanges are not accepted for reasons such as not wanting the item anymore or wanting to buy another item.</p>
            </div>
          </div>
        </div>

        {/* HOW TO REQUEST */}
        <div className="mb-12">
          <h2 className=" text-[22px] md:text-[24px] font-bold mb-6 flex items-center gap-2 uppercase ">
            🔁<span className='underline'> How to Request an Exchange</span>
          </h2>
          <div className="text-[15px] md:text-[17px] space-y-4">
            <p className="italic font-medium">Follow this path: Menu → Support → Exchange → Submit Exchange Request</p>
            <ul className="space-y-2">
              <li>-Fill in your details and we’ll handle the rest 🚀</li>
              <li>-Within 24-48 hours, you will receive a pickup confirmation from our team.</li>
              <li>-Your replacement will be shipped or store credits issued within 3-4 days.</li>
            </ul>
          </div>
        </div>

        {/* ELIGIBILITY CRITERIA */}
        <div className="mb-12">
          <p className=" text-[16px] md:text-[18px] font-bold underline mb-4">📋 Eligibility Criteria for Exchange:</p>
          <ul className="text-[15px] md:text-[17px] space-y-3 pl-4 list-disc">
            <li> Product must be in right condition with tags intact.</li>
            <li> Invoice for the product must be provided.</li>
            <li> No exchange requests accepted after 7 days.</li>
            <li> <span className="font-bold">Second-time exchanges are not possible.</span></li>
            <li> <span className="font-bold">Sale items are non-exchangeable and non-returnable.</span></li>
            <li> Only defective products or size issues (with charges) are eligible for exchange.</li>
            <li> You <span className="italic">can not</span> get another item in exchange of your product.</li>
            <li> Glasses and accessories are non-returnable and non-exchangeable</li>
          </ul>
        </div>

        {/* CANCELLATION POLICY */}
        <div className="mb-20">
          <p className=" text-[16px] md:text-[18px] underline font-bold mb-4">❌ Cancellation Policy:</p>
          <div className="text-[16px] md:text-[17px] space-y-6 pl-4">
            <p>1. <span className="italic font-bold">Prepaid Orders:</span> Cannot be cancelled. Customers can change the delivery address if necessary. Reach out to us on WhatsApp for any changes in address.</p>
            <p>2. <span className="italic font-bold">COD (Cash on Delivery) Orders:</span> Can be cancelled before dispatch. Cancellation not possible once the order is dispatched. To cancel your order, Reach out on WhatsApp.</p>
          </div>
        </div>
      </div>
    </div>
  )
}