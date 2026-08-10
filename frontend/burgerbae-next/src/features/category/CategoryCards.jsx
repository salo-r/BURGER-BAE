"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CategoryCards = ({ item }) => {
  const router = useRouter();

  return (
    <div className="flex-col m-4 max-md:m-0">
      <div className="w-[56vw] lg:w-[21vw] sm:w-[30vw] md:w-[20vw] overflow-hidden">
        {/* aspect-[4/5] wrapper — position relative is required for Next Image fill */}
        <div
          onClick={() => router.push(item.link)}
          className="relative w-full  h-full overflow-hidden cursor-pointer"
          style={{ aspectRatio: "4/5" }}
        >
          <Image
            src={item.imgLink}
            alt={item.description || "category image"}
            width={250}
            height={250}
            className=" w-full h-full object-cover object-center !transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>

        <h5 className="text-center py-3 text-[clamp(13px,1vw,16px)] font-medium w-full">
          <Link href="#">{item.description}</Link>
        </h5>
      </div>
    </div>
  );
};

export default CategoryCards;
