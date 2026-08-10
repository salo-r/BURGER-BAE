"use client";
import React, { useState } from "react";
import instagram from "@/assets/instagram.png";
import { FooterData } from "@/constants/footerData";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (key) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <div className="bg-[#D87021] w-full">
      {/* SECTION 1 – EMAIL */}
      <div className="py-20 px-6">
        <h2 className="font-jost text-center text-[32px] font-bold">
          Get in on all the secrets before anyone else.
        </h2>

        <p className="mt-4 text-center text-[15px] font-jost">
          Subscribe to get special offers, free giveaways, and amazing deals. We
          promise to send emails you’ll love ❤️
        </p>

        <div className="mt-10 flex justify-center">
          <div className="max-w-[480px] w-full border border-white px-4 py-3">
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent w-full outline-none placeholder-black/70"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2 – FOOTER CONTENT */}
      <div className="px-10 pb-20 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* LOGO + INSTA */}
        <div className="w-full max-w-[250px] relative aspect-[5/2] ">
          <Image
            src="https://www.burgerbaeclothing.com/cdn/shop/files/Memeber_logo.png"
            alt="Burger Bae"
            fill
            className="object-contain"
          />{" "}
          <Image className="w-5 mt-4" src={instagram} alt="instagram" />
        </div>

        {/* ABOUT */}
        <div className="md:col-span-1 text-[14px] font-semibold leading-[20px]">
          <p>
            Five years ago, we quit our day jobs to chase our dream of serving
            up a finger-licking, freshly grilled apparel line!
          </p>
          <br />
          <p>
            We specialize in crafting delicious artisan burger hoodies – as
            juicy as your buns – and tees as soft as that last fry at the bottom
            of the bag. Every piece is made in small batches to ensure nothing
            ends up wasted or forgotten in a landfill.
          </p>
          <br />
          <p>
            With 50% less water*, eco-friendly dyes, and the finest freshest
            vegan ingredients to make your life spiccccyyyy, our apparel isn't
            just good for you – it's good for the planet. Sustainability never
            felt so tasty!
          </p>
          <br />
          <p>
            xoxo
            <br />– Ojasvee, Rohan and Janvi
          </p>
        </div>

        {/* MENU SECTIONS */}
        {FooterData.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <h4 className="text-[15px] leading-[14px] font-medium font-jost mb-4 ">
              {section.heading}
            </h4>

            <ul className=" text-[14px] leading-[23px]  font-medium !font-jost ">
              {section.items.map((item, idx) => {
                const key = `${sectionIdx}-${idx}`;
                const hasChildren =
                  Array.isArray(item.children) && item.children.length > 0;

                return (
                  <li key={key}>
                    <div
                      onClick={() => hasChildren && toggleItem(key)}
                      className="flex items-center gap-1 cursor-pointer hover:text-white "
                    >
                      <Link href={item.link}>{item.label}</Link>
                      {hasChildren && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            openItem === key ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                    {/* SUB ITEMS */}
                    {openItem === key && item.children?.length > 0 && (
                      <ul className="ml-3 mt-2 space-y-1 text-[13px]">
                        {item.children.map((child, i) => (
                          <li key={i} className="cursor-pointer">
                            <Link href={child.link}>{child.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* footer's footer */}
      <div className="flex flex-col gap-5 px-10 pb-20">
        <div className=" flex  max-w-[150px] w-full border border-white px-2 py-3">
          <select
            name="country"
            id="country"
            className="w-full text-center bg-transparent outline-none placeholder-black/70"
          >
            <option value="English">English</option>
          </select>
        </div>
        <div>
          <p className="font-jost text-[#5A2D0D0]">
            &copy; 2026 BurgerBae, All rights reserved.
            <a href="#" className="underline font-jost  hover:text-white">
              Powered By BurgerBae
            </a>
          </p>{" "}
        </div>
      </div>
    </div>
  );
}

export default Footer;
