import React from 'react'
import Image from 'next/image'

function StaticShipInfo({ image,title,desc}) {
  return (
      <div className="flex gap-5 "> 
          <div className='h-[30px] flex justify-center desk:h-[50px]'>
              <Image width={40} height={40} className = "w-full h-full object-contain" src={image} alt="image"></Image>
             
          </div>
          <div className="font-jost flex flex-col
           justify-center ">
              <h5 className="text-[16px] leading-[16px] font-semibold text-center pb-1">{title}</h5>
              <p className='text-[15px] leading-[19px] '>{desc}</p>
              </div>
    </div>
  )
}

export default StaticShipInfo