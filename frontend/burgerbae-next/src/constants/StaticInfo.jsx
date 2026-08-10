
import React from 'react'
import StaticShipInfo  from "@/features/home/components/StaticShipInfo"
 import messenger from "@/assets/messenger.png";
import timer from "@/assets/timer.png";
import bus from "@/assets/double-decker-bus.png";


function StaticInfo() {
    const infoData = [
        { image: messenger , title: "Customer Support", desc: "Mon - Sat, 10am - 6pm" },
        { image:  timer , title: "Fast Shipping", desc: "Ship within 24 hours" },
        { image: bus , title: "Free Shipping", desc: "On 95% of products" },
];
  return (
      <div className="flex flex-col gap-9 justify-evenly items-center p-5 my-5 desk:flex-row  ">
          {infoData.length>0 && infoData.map((item, i) => (
  <StaticShipInfo key={i} {...item} />
))}
    </div>
  )
}

export default StaticInfo