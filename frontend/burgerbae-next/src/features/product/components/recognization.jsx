import React from 'react'
import Image from 'next/image'

const badges = [
  {
    src: "https://judgeme-public-images.imgix.net/judgeme/medals-v2-2025-rebranding/ver_rev/platinum.svg?auto=format",
    alt: "verified reviews badge",
  },
  {
    src: "https://judgeme-public-images.imgix.net/judgeme/medals-v2-2025-rebranding/mon_rec/platinum_hollow.svg?auto=format",
    alt: "monthly recommendation badge",
  },
  {
    src: "https://judgeme-public-images.imgix.net/judgeme/medals-v2-2025-rebranding/tops/5-percent.svg?auto=format",
    alt: "top 5 percent badge",
  },
  {
    src: "https://judgeme-public-images.imgix.net/judgeme/medals-v2-2025-rebranding/tops_trend/5-percent.svg?auto=format",
    alt: "trending top 5 percent badge",
  },
]; 
function Recognization() {
  return (
      <div className="flex  flex-col sm:flex-row items-center justify-center my-20 p-3 px-5 gap-7">
        
          <p className="text-[#047857] text-xl font-medium">
              &#9733;&#9733;&#9733;&#9733;&#9733; 938 reviews
          </p>
          {badges.map((badge, index) => (
    <div
      key={index}
      className="relative w-[90px] h-[90px]"
    >
      <Image
        src={badge.src}
        alt={badge.alt}
        fill
        className="object-contain"
      />
    </div>
  ))}
        </div>
  )
}

export default Recognization