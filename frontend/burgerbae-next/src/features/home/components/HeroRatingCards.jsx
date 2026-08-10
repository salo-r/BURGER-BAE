"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { ReviewsData } from "@/constants/RatingData";
import ReviewCard from "@/features/home/components/ReviewCard";

function HeroRatingCards() {
  return (
    <>
      <div className=" flex  flex-col justify-center items-center m-9 max-md:m-0">
        <h4
          className="text-center text-[28px] leading-[25px] font-bold mt-11 sm:text-[28px] sm:leading-[32px]
  md:text-[34px] md:leading-[38px]
  lg:text-[40px] lg:leading-[43px]"
        >
          Let customers speak for us{" "}
        </h4>
        <h5 className="text-center text-[17px] leading-[22px] m-3">
          from 1636 reviews
        </h5>
        <div className="flex  items-center justify-center my-4 w-[100%]  md:max-w-[80vw]">
          <Swiper
            spaceBetween={100}
            modules={[Autoplay]}
            watchSlidesProgress
            slidesPerView={5}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 2.2,
              },
              1024: {
                slidesPerView: 5.1,
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full py-10"
          >
            {ReviewsData.map((item, index) => (
              <SwiperSlide
                key={index}
                className="!w-[223.364px] !mr-[10px] !ml-[5px]"
              >
                <ReviewCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default HeroRatingCards;
