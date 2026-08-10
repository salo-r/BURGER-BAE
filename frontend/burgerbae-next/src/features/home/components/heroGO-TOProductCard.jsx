"use client"
import React from "react";
import { useState,useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HoodieCard from "@/components/shared/HoodieCard";
import { productApi } from "@/mocks/ProductApi";

function GOTOProductCard() {
  const [products, setProducts] = useState([]);
  // ✅ read from Redux store

  useEffect(() => {
        const fetchProducts = async () => {
      const result = await productApi.getProductList(1, 10, { category: "goto" });
      if (result) setProducts(result.data.data);
    };
    fetchProducts();

  },[]);

  return (
    <>
      <div className="md:m-9 m-0">
        <hr />
        <h4 className="text-center text-[34px] leading-[38px] font-bold m-7">
          Your Go - Tos{" "}
        </h4>

        <Swiper
          spaceBetween={16}
          //   navigation
          freeMode
          watchSlidesProgress
          slidesPerView={5.1}
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
          className=" ProductSwiper w-full  !px-4 !md:px-6 !lg:px-8"
        >
          {products?.length>0 && products?.map((item, index) => (
            <SwiperSlide key={index} className="  mb-3 !h-auto">
              <HoodieCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default GOTOProductCard;
