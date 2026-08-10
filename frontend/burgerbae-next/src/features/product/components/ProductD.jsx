"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Cart from "../../cart/cart";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { productApi } from "@/mocks/ProductApi";
import { CartApi } from "@/mocks/cartApi";
import { checkIfUserLoggedIn } from "@/redux/slices/auth";
import { cartList, updateCartThunk } from "@/redux/slices/cart";
import { toast } from "sonner";
import { Login } from "../../auth/Login";
import Checkout from "../../checkout/checkout";
import Image from "next/image";


function ProductD({ item, className }) {
  const { slug } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filteredData, setFilteredData] = useState(item || null);
  const [size, setSize] = useState(item?.size?.[0] || null);

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const verifyUser = async () => {
    console.log("verifyUser is called");
    const result = await dispatch(checkIfUserLoggedIn()); // action is dispatched (middleware- thunk)
    console.log("result returned by checkIfUserLoggedIn", result);
    setIsLoggedIn(!!result);
  };
  console.log("isloggedin", isLoggedIn);
  useEffect(() => {
    let mounted = true;

    const loadProduct = async () => {
      if (item && !Array.isArray(item)) {
        if (!mounted) return;
        setFilteredData(item);
        setSize(item?.size?.[0] || null);
        return;
      }

      if (!slug) return;

      try {
        const res = await productApi.getProductList(1, 1, { slug });
        if (!mounted) return;
        if (res?.status === "SUCCESS") {
          console.log("Product data retrieved successfully:", res.data);
          const product = res?.data?.data?.[0];
          setFilteredData(product);
          setSize(product?.size?.[0] || null);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      }
    };

    loadProduct();

    return () => {
      mounted = false;
    };
  }, [item, slug]);

  useEffect(() => {
    if (filteredData?.size?.[0]) {
      setSize(filteredData.size[0]);
    }
  }, [filteredData]);

  useEffect(() => {
    verifyUser();
  }, []);

  const handleAdd = async () => {
    const productToAdd = filteredData;

    // Step 1: Check cart limit FIRST
    if (cartItems?.data?.length >= 20) {
      toast.error("Cart is full. Cannot add or update items.");
      return;
    }

    const isItemInCart = cartItems?.data?.some((cartItem) => {
      return cartItem.products[0]?.productId.id === productToAdd.id;
    });

    // step : 2 If already exists , update quantity
    if (isItemInCart) {
      cartItems?.data?.forEach((cartItem) => {
        if (cartItem.products[0]?.productId.id === productToAdd.id) {
          const newQty = (cartItem.products[0].qty || 0) + quantity;

          dispatch(
            updateCartThunk(cartItem.id, {
              products: [{ productId: productToAdd.id, qty: newQty, size }],
            }),
          );
        }
      });
      return;
    }

    //Step 3: Add new product
    const productWithQuantity = {
      products: [
        {
          productId: productToAdd.id,
          qty: quantity,
          size: size,
        },
      ],
    };

    const res = await CartApi.addToCart(productWithQuantity);
    if (res?.status === "SUCCESS") {
      await dispatch(cartList());
    }
  };
  console.log("filtered data in product details", filteredData);

  if (!filteredData) {
    return <div>Loading product...</div>;
  }

  return (
    <>
      <div
        className={` flex flex-col mt-20  desk:mt-32  mx-2 desk:mx-10  nav:flex-row gap-6 ${className}`}
      >
        {/* left */}
        {/* images */}
        <div className="w-full nav:w-1/2">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-full desk:w-max space-x-4 p-4">
              {filteredData?.productImages?.length > 0 &&
                filteredData?.productImages?.map((i, idx) => (
                 <div
        key={idx}
        className="relative 
                     w-[280px] h-[380px]
                     sm:w-[340px] sm:h-[460px]
                     desk:w-[420px] desk:h-[560px]
                     shrink-0 overflow-hidden rounded-md"
      >
        <Image
          src={i.path}
          alt={`product-image-${idx}`}
          fill
          className="object-cover"
        />
      </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" className="lg:hidden" />
          </ScrollArea>
        </div>

        {/* right */}

        <div className=" w-full nav:w-1/2 p-3 font-jost ">
          <p className="text-[#787878] mb-4 text-[11px] leading-[14px] font-medium">
            BURGER BAE
          </p>
          {/* description or title of product */}
          <h1 className="text-[30px] leading-[34px] font-medium mb-2">
            {filteredData?.title?.longTitle || filteredData?.title?.shortTitle}
          </h1>
          {/* price */}
          <span className="line-through text-gray-300 text-xl ">
            Rs. {filteredData?.price?.mrp}{" "}
          </span>{" "}
          <span className="mt-4 ml-4 text-[#D87021] text-xl font-normal">
            Rs. {filteredData?.price?.cost}
          </span>
          {/* sale */}
          <span className="ml-6 text-white bg-black rounded-full py-1 px-4 text-[12px]">
            SALE
          </span>
          {/* size selected */}
          <div className="flex justify-between mt-3">
            <div className="flex items-center gap-1">
              <p className="text-sm leading-[17px] font-semibold">SIZE: </p>
              <span className="text-sm font-normal">{size}</span>
            </div>
            <p className="text-sm font-normal">Size Guide</p>
          </div>
          {/* size chart (availaible) */}
          {filteredData?.size?.length > 0 && (
            <div className="flex my-2">
              {filteredData?.size?.map((s, index) => (
                <div
                  onClick={() => setSize(s)}
                  key={index}
                  className={`outline outline-1  px-7 py-2 text-xs cursor-pointer  transition-colors duration-200 ${
                    size === s ? "outline-black" : "outline-slate-300"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
          {/* available color */}
          <p className="mt-4 text-sm leading-[17px] font-semibold">COLOR :</p>
          {filteredData?.color?.length > 0 && (
            <div className="flex flex-wrap  gap-1 m-2">
              {filteredData?.color?.map((color, index) => (
                <span key={index} className="border p-2 border-black ">
                  <span
                    className=" flex w-5 h-5 rounded-full border"
                    style={{ backgroundColor: color }}
                  >
                    {" "}
                  </span>
                </span>
              ))}
            </div>
          )}
          {/* offer */}
          <div className="mt-5 border-black border-[2px] border-dashed p-3  rounded">
            <p className="text-[20px] leading-[38px] font-medium">
              Available Offer
            </p>
            <div className="flex gap-2 items-center">
              <span className="relative w-[25px] h-[25px] block">
                <Image
                  fill classname="object-contain"
                  src="data:image/png;base64,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"
                  alt=""
                />
              </span>
              <span className="text-[17px] leading-[22px] font-medium">
                Pick any 3 acid wash hoodies, One's on us <br /> Offer
                auto-applied at checkout
              </span>
            </div>
          </div>
          {/* buttons */}
          <div className="flex  w-full mt-4 gap-3">
            <div
              className="flex
            gap-3 border-[1px] rounded-sm border-black w-max py-2 "
            >
              <span
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-2 text-gray-400 cursor-pointer"
              >
                {" "}
                &minus;{" "}
              </span>
              <span>{quantity}</span>
              <span
                onClick={() => {
                  setQuantity((prev) => Math.min(5, prev + 1));
                }}
                className="px-2 text-gray-400 cursor-pointer"
              >
                {" "}
                &#x2b;{" "}
              </span>
            </div>

            {isLoggedIn && (
              <Cart
                navbarTrigger={
                  <button
                    onClick={handleAdd}
                    className="w-full rounded border-[1px] font-medium animate-vibrate-interval transition-colors duration-200 border-black hover:text-white hover:bg-black "
                  >
                    ADD TO CART
                  </button>
                }
              />
            )}

            {!isLoggedIn && (
              <Login
                logintrigger={
                  <button
                    onClick={handleAdd}
                    className="w-full rounded border-[1px] font-medium animate-vibrate-interval transition-colors duration-200 border-black hover:text-white hover:bg-black "
                  >
                    ADD TO CART
                  </button>
                }
              />
            )}
          </div>
          {isLoggedIn && (
            <Checkout
              buyNowProduct={{
                ...filteredData,
                _buyQty: quantity,
                _buySize: size,
              }}
              productDtrigger={
                <button className="w-full text-white bg-black font-medium p-3 mt-3 rounded text-base cursor-pointer">
                  BUY IT NOW
                </button>
              }
            />
          )}
          {!isLoggedIn && (
            <Login
              logintrigger={
                <button className="w-full text-white bg-black font-medium p-3 mt-3 rounded text-base cursor-pointer">
                  BUY IT NOW
                </button>
              }
            />
          )}
          <div className="flex items-center gap-2 mt-4">
            <div className="w-[5px] h-[5px] rounded-full bg-green-500"></div>
            <p className="text-green-500">In stock</p>
          </div>
          <div className="h-[4px] rounded bg-green-500 mt-3"></div>
          <Accordion
            type="single"
            collapsible
            defaultValue="shipping"
            className=" w-full !desk:max-w-lg mt-4"
          >
            <AccordionItem value="shipping">
              <AccordionTrigger className="hover:no-underline text-lg !font-jost ">
                Description
              </AccordionTrigger>
              <AccordionContent>
                Bringing Seoul streetwear vibes to your wardrobe, the Seoul
                Cargo Tracks are designed for those who move with style. Built
                for both men and women, these cargos are the perfect mix of
                comfort, edge, and everyday versatility. Article Sku : BB0627
                Price (MRP) : 2999 Country of production : INDIA Common generic
                name : Bottoms Net Quantity: 1N Manufactured by : Bxb Socials,
                Plot No. B24/3038#2, Jain Colony, Sunder Nagar - 141007,
                Ludhiana, Punjab, India Marketed By : Burger bae Clothing, Plot
                No. B24/3038#2, Jain Colony, Sunder Nagar - 141007, Ludhiana,
                Punjab, India. Date of manufacture : Sep. 2023 Customer service
                : In case of any complaint, write to Bxb Social (Burger bae
                Clothing), Plot No. B24/3038#2, Jain Colony, Sunder Nagar -
                141007, Ludhiana, Punjab, India, Email :
                superheroes@burgerbaeclothing.com Disclaimer : The information
                provided on this website is accurate to the best of our
                knowledge and belief. However, we cannot guarantee its
                completeness, timeliness, or accuracy. Users are advised to
                independently verify any information presented here before
                making decisions or taking action based on it. We do not accept
                any liability for errors or omissions in the content provided.
                Additionally, the opinions expressed on this website are those
                of the authors and do not necessarily reflect the views of the
                organization. By using this website, you acknowledge and agree
                to these terms.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger className="hover:no-underline text-lg !font-jost">
                Career Guide
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  <li>
                    Wash Similar Colors Together – Prevents color bleeding.
                  </li>
                  <li>
                    Use Cold Water (30°C) – Preserves fabric & prevents
                    shrinking.
                  </li>
                  <li>
                    Turn Clothes Inside Out – Protects prints & embroidery.
                  </li>
                  <li>
                    Air Dry Whenever Possible – Reduces shrinkage & maintains
                    shape.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="support">
              <AccordionTrigger className="hover:no-underline text-lg !font-jost">
                Composition/Fabric
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  <li>
                    Stay warm, look cool – winter fashion that keeps you cozy in
                    style!
                  </li>
                  <li>
                    COMPOSTION : Fleece : Cotton-Polyester Blend (80% Cotton,
                    20% Polyester) – Soft, breathable, and durable.
                  </li>
                  <li>GSM : 350</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* social media logo */}
          <div className=" mt-2 flex gap-2 items-center cursor-pointer">
          <div className="relative w-[50px] aspect-square overflow-hidden">
  <Image
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXNDRBLeRrDfDH2SgJshPR3c1gs-0LlfcxFA&s"
    alt="facebook icon"
    fill
    className="cursor-pointer object-cover"
  />
</div>

            <Image
              width={22} height={22}
              src="data:image/png;base64,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"
              alt="twitter icon"
            />

            <Image
              width={30}
              height={30}
              src="data:image/png;base64,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"
              alt="pinterest icon"
            />

            <Image
              width={24}
              height={50}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWWvJ9qFB1aI2-_kTNbVtTBsi_nZDJtWhaAg&s"
              alt=" whatsapp icon"
            />

            <Image
              width={24}
              height={50}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0aDmvffM-bcxB8vPH6vny0NJ9lqkuj4pnXg&s"
              alt="copy icon"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductD;
