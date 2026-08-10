import React from 'react'

export default function ContactUs() {
  return (
    <div className="font-jost bg-white text-[#1a1a1a] ">
      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        
        {/* Page Title */}
        <h1 className="font-jost text-4xl md:text-5xl font-bold mb-16 tracking-tighter uppercase">
          Contact Us
        </h1>

        {/* Action Links Section */}
        <div className="space-y-8 mb-20">
          <div className="text-lg md:text-xl  font-semibold">
            <span>Exchange/Replacement : </span>
            <a 
              href="#" 
              className="text-[#e37a34] underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
            >
              CLICK HERE
            </a>
          </div>

          <div className="text-lg md:text-xl  font-semibold">
            <span>Cancel/Edit order : </span>
            <a 
              href="#" 
              className="text-[#e37a34] underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
            >
              CLICK HERE
            </a>
          </div>

          {/* WhatsApp Section */}
          <div className="text-xl md:text-2xl font-semibold pt-4">
            <span >WhatsApp only : </span>
            <span className="font-bold">+917711993343</span>
          </div>
        </div>
      </div>
    
    </div>
  )
}