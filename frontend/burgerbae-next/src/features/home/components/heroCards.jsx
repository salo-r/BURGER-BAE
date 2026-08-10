"use client"
import React from "react";
import { ImagesRow1 } from "@/constants/heroCardsImg";
import CategoryCards from "@/features/category/CategoryCards";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function HeroCards() {
 
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
        <div className="flex items-center flex-wrap w-full gap-4">
          {ImagesRow1.map((item, index) => (
            <CategoryCards key={index} item={item} />
          ))
          }
         
        </div>
      )}

      {/* MOBILE / TABLET VIEW */}
      {isMobile && (
        <Swiper
          // spaceBetween={}
          slidesPerView={1.5}
          breakpoints={{
            640: {
              slidesPerView:3
            },
           
            768: {
              slidesPerView: 4,
            },
          }} className="w-full"
        >
          {ImagesRow1.map((item, index) => (
            <SwiperSlide key={index}>
              <CategoryCards item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>

  
  );
}

export default HeroCards;
