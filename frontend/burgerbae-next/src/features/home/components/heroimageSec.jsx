"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { EffectFade, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { HeroImageData } from "@/constants/heroImageData";

function HeroimageSec() {
  return (
    <div className="w-full relative ">
      {HeroImageData.length > 0 && (
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          fadeEffect={{ crossFade: true }}
          speed={1200}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `
        <span class="${className} custom-bullet">
          <svg viewBox="0 0 36 36">
            <circle
              class="progress-ring"
              cx="18"
              cy="18"
              r="16"
            />
          </svg>
        </span>
      `;
            },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[EffectFade, Autoplay, Pagination]}
          className="mySwiper w-full h-full"
        >
          {HeroImageData.length > 0 &&
            HeroImageData.map((i, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={i}
                    alt="img"
                    width={1920}
                    height={1080}
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
}

export default HeroimageSec;
