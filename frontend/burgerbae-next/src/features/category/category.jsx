"use client"
import React from "react";
import { useRouter } from "next/navigation" ;
import { Categories } from "@/constants/categorydata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/layout/footer";
import Image from "next/image";

function Category() {
  const router = useRouter();
  return (
    <div className=" mt-[100px] md:mt-[150px] xl:mt-[200px]">
      <div className=" mt-[0px] md:mt-[100px]  flex  flex-col justify-center items-center font-jost">
        <h1 className=" text-2xl md:text-4xl font-medium">SHOP BY CATEGORY</h1>
        <p className=" text-sm md:text-base font-normal">
          Add a short description for your collections
        </p>
      </div>

      <div className=" grid grid-col-1  md:grid-cols-2 xl:grid-cols-3 gap-4  m-8 mb-[150px]">
        {Categories.length > 0 &&
          Categories.map((item, key) => (
            <div
              onClick={() => router.push(item.link)}
              key={key}
              className="relative rounded-sm  "
            >
             <div className="relative md:h-[43rem] w-full aspect-[4/5] overflow-hidden rounded-md">
  <Image
    src={item.img}
    alt={item.title || "product image"}
    fill
    className="
      object-cover
      transition-transform
      duration-300
      ease-in-out
      hover:scale-105
    "
  />
</div>

              <div className = "absolute left-4 bottom-3 z-10  w-[95%] mx-0 m-auto  rounded-md">
   
                <div className="flex  items-center justify-between w-[90%] bg-white rounded-md">
                 <p className=" bg-white text-sm sm:text-base font-jost  p-2 font-semibold rounded-tl-md rounded-bl-md">
                    {item.title}
                  </p>
                   <FontAwesomeIcon className="bg-white mr-3" icon={faArrowRight} />
                </div>

              </div>
            </div>
          ))}
      </div>
        <Footer/>
    </div>
  
  );
}

export default Category;
