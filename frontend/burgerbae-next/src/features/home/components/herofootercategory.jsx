"use client"
import React from "react";
import { useRouter } from "next/navigation";
import CategoryCards from "@/features/category/CategoryCards";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Images } from "@/constants/CategoryFooterCard";

function Herofootercategory() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Track screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1090);
    };
    handleResize(); 

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="m-0 max-md:m-0 ">
      {/* DESKTOP VIEW */}
      {!isMobile && (
        <div className="flex items-center flex-wrap w-full gap-3">
          {Images.map((item, index) => (
            <CategoryCards
              onClick={() => router.push(item.link)}
              key={index}
              item={item}
            />
          ))}
        </div>
      )}

      {/* MOBILE / TABLET VIEW */}
      {isMobile && (
        <Swiper
          // spaceBetween={}
          slidesPerView={1.5}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },

            768: {
              slidesPerView: 4,
            },
          }}
        >
          {Images.map((item, index) => (
            <div className="w-full h-auto">
              <SwiperSlide key={index}>
                <CategoryCards item={item} />
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default Herofootercategory;
