"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ItemAddCart from "./ItemAddCart";
import Image from "next/image";

function HoodieCard({ item, className }) {
  const router = useRouter();
  const swiperRef = useRef(null);

  const [isOpenCart, SetCart] = useState(false);
  function handleChange() {
    SetCart(true);
  }

  const handleMouseMove = (e) => {
    if (!swiperRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    const count = item.productImages.length;
    const zoneWidth = width / count;
    const index = Math.min(count - 1, Math.floor(x / zoneWidth));

    if (swiperRef.current.activeIndex !== index) {
      swiperRef.current.slideTo(index, 300);
    }
  };

  return (
    <div
      className={`flex flex-col max-w-[350px] w-full desk:!h-[450px] cursor-pointer ${className}`}
    >
      {/* IMAGE WRAPPER */}
      <div
        onClick={() =>
          router.push(`/collections/${item.category}/${item.slug}`)
        }
        className="relative  group  overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* SALE BADGE */}
        <p className=" hidden group-hover:block absolute z-30 top-3 left-3 text-white bg-black border-2 border-black rounded-3xl px-3 py-1 text-xs">
          SALE
        </p>

        {/* SIZE STRIP */}
        {item.size?.length > 0 && (
          <div
            className=" absolute z-30 bottom-0 left-1/2 -translate-x-1/2 w-full
      bg-white flex justify-center gap-2 p-3

      opacity-0 translate-y-4
      group-hover:opacity-100 group-hover:translate-y-0

      transition-all duration-300 ease-out "
          >
            {item.size?.map((s, index) => (
              <div
                key={index}
                className="outline outline-1 outline-black px-2 py-1 text-xs cursor-pointer hover:bg-black hover:text-white transition-colors duration-200"
              >
                {s}
              </div>
            ))}
          </div>
        )}

        {/* IMAGE / SWIPER */}
        <div className="relative w-full aspect-[4/5] z-10">
          {item.productImages.length > 1 ? (
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Pagination]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="w-full h-full"
            >
              {item.productImages?.map((img, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={img.path}
                    alt="product"
                    fill
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Image
              src={item.productImages[0]?.path}
              alt="product"
              fill
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="flex flex-col flex-1  mt-3">
        <div className="space-y-1  h-[140px] xs:h-[120px]">
          <h5 className="font-jost text-[clamp(10px,12px,13px)] leading-[16px]  sm:leading-[18px] font-medium text-ellipsis line-clamp-2">
            {item.title.longTitle}
          </h5>

          <p className="line-through text-gray-300 inline text-sm">
            Rs.{item.price.mrp}
          </p>

          <p className="inline ml-4 text-[#D87021] text-sm font-medium">
            Rs. {item.price.cost}
          </p>

          {item.color?.length > 0 && (
            <div className="flex gap-1 m-2">
              {item.color.map((color, index) => (
                <span
                  key={index}
                  className="w-3 h-3 rounded-full border hover:border-black"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
          {item.Rating && (
            <div className="mt-1">
              <p className="text-xs">
                <i className="fa-thin fa-star"></i>Rating is {item.Rating}
              </p>
            </div>
          )}
        </div>

        {/* ADD TO CART */}
        <div
          onClick={() => {
            handleChange();
          }}
          className=" border-2 border-black rounded-md hover:bg-black transition"
        >
          <ItemAddCart
            item={item}
            isOpenCart={isOpenCart}
            trigger={
              <a className="block p-3 text-center font-jost text-[14px] font-medium hover:text-white">
                ADD TO CART
              </a>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default HoodieCard;
