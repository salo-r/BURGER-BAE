import React from "react";
import { ExploreData } from "../../../constants/exploreSecData";
import Image from "next/image";

function ExploreSec() {
  return (
    <div className="flex flex-col gap-2  w-full desk:flex-row ">
      {ExploreData.length > 0 &&
        ExploreData.map((item, index) => (
          <div
            key={index}
            className="relative w-full aspect-[3/4] overflow-hidden group"
          >
            {/* Image */}
            <Image
              src={item.img}
              alt="explore"
              fill
              className=" brightness-75 object-cover"
            />

            {/* Dark overlay */}
            {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" /> */}

            {/* Text + Button */}
            <div className="absolute bottom-11 left-1  desk:bottom-11 desk:left-12 flex flex-col items-center justify-center text-white group-hover:opacity-100 group transition ">
              <h3 className="text-[40px] leading-[43px] font-bold font-jost m-6">
                {item.gender}
              </h3>
            </div>
            <div className="absolute bottom-4 left-7 desk:bottom-2 desk:left-[70px] desk:l">
              <button className=" px-9 rounded-md bg-white text-black font-jost font-semibold text-[14px] leading-[43px] hover:text-white  hover:bg-black">
                Explore
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ExploreSec;
