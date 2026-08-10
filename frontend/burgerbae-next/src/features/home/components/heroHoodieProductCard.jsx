"use client"
import React from "react";
import {useState, useEffect } from "react";
import HoodieCard from "@/components/shared/HoodieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { productApi } from "@/mocks/ProductApi"

export default function HeroProductCard() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await productApi.getProductList(1, 10, { category: "Basic-Hoodies" });
      if (result) setProducts(result.data.data);
    };
    fetchProducts();
  }, []);
 
  return (
    <>
      <div className=" m-0 md:m-9  ">
        <hr />

        <div>
          <h4 className="text-center text-[34px] leading-[38px] font-bold m-2">
            Basic Hoodies{" "}
          </h4>
          <div className="flex justify-center my-6">
            <h5
              className="relative inline-block text-center

    before:absolute before:left-0 before:bottom-0
    before:w-full before:h-px before:bg-gray-300

    after:absolute after:left-0 after:bottom-0
    after:w-full after:h-px after:bg-black
    after:scale-x-0 after:origin-left
    after:transition-transform after:duration-300

    hover:after:scale-x-100"
            >
              {" "}
              Shop Basic Hoodies
            </h5>
          </div>
        </div>
        <Swiper
          spaceBetween={16}
          //   navigation
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
          className="ProductSwiper w-full !px-4 !md:px-6 !lg:px-8"
        >
          {products?.length>0 && products?.map((item, index) => (
            <SwiperSlide key={index} className=" mb-10 !h-auto">
              <HoodieCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
