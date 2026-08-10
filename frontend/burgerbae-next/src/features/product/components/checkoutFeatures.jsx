import React from 'react'
import Image from 'next/image';

function CheckoutFeatures({isReviewOpen , className}) {
    return(
        <div className={`p-3 mx-3 font-jost flex flex-col gap-10 md:flex-row md:justify-center   ${isReviewOpen? "mt-506px":"mt-[100px]"} ${className}`} >
            
            {/* Payment Gateway */}
            <div className='flex flex-col gap-8 items-center'>

                {/* img div */}
               <div className="relative max-w-40 w-full aspect-[3/1] overflow-hidden">
  <Image
    src="https://www.burgerbaeclothing.com/cdn/shop/files/razorpay_1.jpg?v=1741864734"
    alt="razorpay img"
    fill
    className="object-contain"
  />
</div>

                {/* title description div */}
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-lg leading-[20px] font-semibold'>Trusted payment Gateway</h2>
                    <p className='font-normal text-base  text-center leading-5'>Razorpay - Most trusted and fastest payment <br /> Gateway with 0% payment failures</p>
                </div>

            </div>
            

            {/* courier */}
            <div className='flex flex-col gap-8 items-center'>

                {/* img div */}
                <div className="relative max-w-20 w-full aspect-[3/2] overflow-hidden">
  <Image
    src="https://www.burgerbaeclothing.com/cdn/shop/files/delhivery.jpg?v=1741861915"
    alt="delhivery img"
    fill
    className="object-contain"
  />
</div>

                {/* title description div */}
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-lg leading-[20px] font-semibold' >Reliable Courier</h2>
                    <p className=' text-center font-normal text-base leading-5'>"Fastest shipping across India—OTP-verified <br /> because we deliver trust, not just parcels!"</p>
                </div>

            </div>
            
            {/* Checkout */}
             <div className='flex flex-col gap-8 items-center'>

                {/* img div */}
                <div className="relative max-w-20 w-full aspect-[3/2] overflow-hidden">
  <Image
    src="https://www.burgerbaeclothing.com/cdn/shop/files/fastrr.jpg?v=1741861915"
    alt="fastrr img"
    fill
    className="object-contain"
  />
</div>

                {/* title description div */}
                <div className='flex flex-col justify-center items-center'>
                    <h2 className='text-lg leading-[20px] font-semibold'>One Click Checkout</h2>
                    <p className=' text-center font-normal text-base leading-5'>Checkout with Fastrr that happens in One <br />Click</p>
                </div>

            </div>
            
    </div>
  )
}

export default CheckoutFeatures