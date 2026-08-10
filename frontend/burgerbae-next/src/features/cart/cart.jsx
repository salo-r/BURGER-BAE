"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { cartList, fetchRelatedItems } from "@/redux/slices/cart";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSelector } from "react-redux";
import { Login } from "@/features/auth/Login";
import { CartApi } from "@/mocks/cartApi";
import Checkout from "../checkout/checkout";
import Image from "next/image";

function Cart({ navbarTrigger, ItemTrigger }) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  // cartItems
  let cartItems = useSelector((state) => state.cart.items);
  let user = useSelector((state) => state.auth.user);
  console.log("user in cart component", user);
  const cartListData = cartItems?.data || [];
  const limitedCartItems = cartListData.slice(0, 20);

  const dispatch = useDispatch();

  const relatedItems = useSelector((state) => state.cart.relatedItems);
  const RelatedItems = relatedItems?.length > 0 ? relatedItems : [];

  console.log("related items in cart component", relatedItems);

  useEffect(() => {
    if (cartListData.length > 0) {
      dispatch(fetchRelatedItems());
    }
  }, [cartListData]);

  useEffect(() => {
    
    if(user){
      setIsLoggedIn(true);
    }
  }, []);

  console.log("isLoggedIn in cart component", isLoggedIn);
  const estimatedTotal = cartItems?.data?.reduce((total, item) => {
    const itemTotal =
      item.products[0].productId.price.cost * item.products[0].qty;
    return total + itemTotal;
  }, 0);

  const totalMrp = cartItems?.data?.reduce((total, item) => {
    const itemMrpTotal =
      item.products[0].productId.price.mrp * item.products[0].qty;
    return total + itemMrpTotal;
  }, 0);

  const totalDiscount = cartItems?.data?.reduce((total, item) => {
    const itemDiscount =
      (item.products[0].productId.price.mrp -
        item.products[0].productId.price.cost) *
      item.products[0].qty;
    return total + itemDiscount;
  }, 0);

  const increaseQuantity = async (item) => {
    let currentQty = item.products[0].qty;

    if (currentQty >= 5) return;

    const newQty = currentQty + 1;

    await CartApi.updateCart(item.id, {
      products: [
        {
          productId: item.products[0].productId._id,
          qty: newQty,
        },
      ],
    });

    dispatch(cartList()); // 🔥 important
  };

  const decreaseQuantity = async (item) => {
    let currentQty = item.products[0].qty;

    if (currentQty <= 1) return;

    const newQty = currentQty - 1;

    await CartApi.updateCart(item.id, {
      products: [
        {
          productId: item.products[0].productId._id,
          qty: newQty,
        },
      ],
    });

    dispatch(cartList()); // 🔥 refresh UI
  };

  const handleDelete = async (cartId) => {
    try {
      console.log("Removing cart item with cartId:", cartId);
      const result = await CartApi.removeFromCart(cartId);
      if (result.status === "SUCCESS") {
        console.log("Item removed successfully:", result);
        dispatch(cartList()); // Refresh cart list after deletion
      } else {
        console.log("Failed to remove item:", result);
      }
    } catch (err) {
      console.log("Error removing item from cart:", err);
    }
  };

  return (
    <Drawer
      onOpenChange={(open) => {
        console.log("you are in cart", open);
        if (open) {
          dispatch(cartList());
          //  dispatch(fetchRelatedItems());
        }
        // dispatch(setCartOpen(open));
      }}
      direction="right "
      className="relative"
    >
      <DrawerTrigger asChild>{navbarTrigger}</DrawerTrigger>

      <DrawerTrigger asChild>{ItemTrigger}</DrawerTrigger>

      <DrawerContent className=" max-sm: max-w-[23rem]  sm:max-w-[25rem] md:max-w-[50%] w-full h-full inset-y-0 right-0 left-auto mt-0 transition-transform  overflow-y-hidden duration-300">
        <div className="relative ">
          <DrawerTitle className="p-4 flex justify-between w-full">
            <p className="font-jost font-normal text-base text-[#343232]">
              {cartItems?.data?.length > 0
                ? `YOUR CART (${cartItems?.data?.length})`
                : "YOUR CART"}
            </p>

            <DrawerClose asChild>
              <button>&#10005;</button>
            </DrawerClose>
          </DrawerTitle>

          <hr />
        </div>
        <div
          className={` ${cartListData?.length > 0 ? "overflow-y-scroll" : "overflow-y-hidden"}
        `}
        >
          {/* when no item in cart */}
          <div
            className={`mt-[15rem] flex flex-col  items-center justify-center 
        ${cartListData?.length > 0 ? "hidden" : "block"}`}
          >
            <Image 
              width={50} height = {50}
              src="data:image/png;base64,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"
              alt=""
            />

            <p className="font-jost text-gray-400">
              Your cart is currently empty
            </p>
            <button className="bg-[#ec9b12] p-3 rounded text-lg mt-2 text-white font-jost">
              Continue Shopping
            </button>
          </div>

          {/* when items are added to cart */}

          <div className="p-3 ">
            <div
              className={`bg-gray-100 rounded-md font-jost p-2 ${cartListData?.length > 0 ? "block" : "hidden"}`}
            >
              {/* selected item */}

              {cartListData &&
                cartListData?.length > 0 &&
                limitedCartItems?.map((item, index) => (
                  <div className="flex gap-2 p-2" key={index}>
                    <div className=" relative max-sm: max-w-[150px] sm:max-w-[153px] max-sm: max-h-[90px] aspect-[3/2] w-full rounded-md overflow-hidden">
                      <Image fill
                        className="object-cover rounded-md"
                        src={
                          item?.products.length > 0
                            ? item?.products[0]?.productId?.productImages
                                .length > 0
                              ? item?.products[0]?.productId?.productImages[0]
                                  ?.path
                              : item?.products[0]?.productId?.image
                            : null
                        }
                        alt="product_img"
                      />
                    </div>
                    {/* info div*/}
                    <div>
                      {/* description and price div */}
                      <div className="flex justify-between gap-5 w-[100%]">
                        <div className="flex flex-col  sm:w-[70%]">
                          <p className="text-[#373434] text-sm font-normal text-ellipsis">
                            {item?.products.length > 0
                              ? item?.products[0]?.productId?.title?.longTitle
                              : "item not found"}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {item?.products.length > 0
                              ? item?.products[0]?.size
                              : "size not found"}
                          </p>
                        </div>
                        <div className="flex flex-col text-sm items-end">
                          <p className="font-bold">
                            ₹
                            {item?.products[0].productId.price.cost *
                              item?.products[0].qty}
                          </p>
                          <p className="text-gray-400 line-through">
                            ₹
                            {item?.products[0].productId.price.mrp *
                              item?.products[0].qty}
                          </p>
                        </div>
                      </div>
                      {/* delete and quantity div */}
                      <div className="flex items-center gap-2">
                        <div
                          onClick={() => {
                            console.log("delete item", item);
                            handleDelete(item.id);
                          }}
                          className="border-gray-300 rounded-sm pointer pt-4 max-w-max cursor-pointer"
                        >
                          <FontAwesomeIcon className="pointer" icon={faTrash} />
                        </div>

                        <div className="flex w-full mt-4 gap-3">
                          <div className="flex border-[1px] rounded-sm border-gray-300 w-max bg-white ">
                            <span
                              onClick={() => {
                                console.log("decrease", item);
                                decreaseQuantity(item, index);
                              }}
                              className="px-2 text-gray-400 cursor-pointer"
                            >
                              {" "}
                              &minus;{" "}
                            </span>
                            <span className="px-2">{item.products[0].qty}</span>
                            <span
                              onClick={() => {
                                console.log("increase", item);
                                increaseQuantity(item);
                              }}
                              className="px-2 text-gray-400 cursor-pointer"
                            >
                              {" "}
                              &#x2b;{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* coupon code */}
            <div
              className={`m-2 w-[99%] p-2 font-jost border border-gray-300 rounded-md  ${cartListData?.length > 0 ? "block" : "hidden"}`}
            >
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Enter coupon code"
              />
            </div>

            {/* related items */}
            <div
              className={`flex justify-center border rounded-md border-gray-300 p-2  ${cartListData?.length > 0 ? "block " : "hidden"}`}
            >
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-[85%] "
              >
                {" "}
                <p className="underline text-[#116d33] font-jost  text-sm sm:text-base">
                  You might also like
                </p>
                <CarouselContent className="w-full">
                  {RelatedItems?.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="!max-w-[300px] !max-sm:p-0"
                    >
                      <div className="p-1 flex">
                        <Card>
                          <CardContent className="flex flex-col  gap-2 border-none border-l-2 items-center justify-center p-2">
                            <div className="p-2 flex flex-col gap-2">
                              {" "}
                              <div className="flex gap-2">
  {/* IMAGE */}
  <div className="relative max-w-[80px] w-full aspect-[3/2] overflow-hidden rounded-md">
    <Image
      src={item?.image}
      alt={item?.title?.longTitle || "product image"}
      fill
      className="object-fill rounded-md"
    />
  </div>

  {/* INFO */}
  <div className="font-jost">
    <p className="text-xs sm:text-sm text-[#787474]">
      {item.title.longTitle}
    </p>

    <p className="text-xs font-semibold">
      ₹{item.price.cost}
    </p>
  </div>
</div>
                              <button className="w-full text-center text-[#116e33] border border-[#116e33] rounded-md">
                                + ADD
                              </button>
                            </div>
                          </CardContent>
                        </Card>{" "}
                        <hr />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-10" />
                <CarouselNext className="-right-10" />
              </Carousel>
            </div>

            <div></div>
          </div>
        </div>
        {/* checkout and total  */}
        <DrawerFooter>
          <div
            className={`relative overflow-hidden font-jost ${cartItems?.data?.length > 0 ? "block" : "hidden"}`}
          >
            <div
              className={` transform 
          transition-all duration-300 ease-in-out
          ${open ? "-translate-y-2" : "translate-y-0"} 
        `}
            >
              {/* Trigger (Top) */}
              <hr />
              <div
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center px-3 py-2 cursor-pointer"
              >
                <h3>Estimated total</h3>
                <div className="flex items-center gap-1">
                  <h3 className="font-semibold">₹{estimatedTotal}</h3>
                  <FontAwesomeIcon className="text-xs" icon={faChevronDown} />
                </div>
              </div>

              {/* Content (Below) */}
              {open && (
                <div className="space-y-2 p-3 bg-white">
                  <hr />
                  <div className="flex justify-between text-[#656262] text-sm">
                    <p>Total MRP</p> <h3>₹{totalMrp}</h3>
                  </div>
                  <hr />
                  <div className="flex justify-between text-[#656262]  text-sm">
                    <p>Delivery fees</p> <h3>To be calculated</h3>
                  </div>
                  <hr />
                  <div className="flex justify-between text-[#656262]  text-sm">
                    <p>Discount on MRP</p>{" "}
                    <h3 className="text-[#5AA171]">₹{totalDiscount}</h3>
                  </div>
                  <hr />
                  <div className="flex justify-between text-[#656262]  text-sm">
                    <p>Coupon discount</p> <h3>₹0</h3>
                  </div>
                  <hr />
                  <div className="flex justify-between text-[#656262]  text-sm">
                    <p>Grand Total</p> <h3>₹{estimatedTotal}</h3>
                  </div>
                </div>
              )}
            </div>
          </div>

          {isLoggedIn && (
            <Checkout
              totalDiscount={totalDiscount}
              totalMrp={totalMrp}
              estimatedTotal={estimatedTotal}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              handleDelete={handleDelete}
              RelatedItems={RelatedItems}
              checkoutTrigger={
                <button
                  className={` w-full text-white text-center p-3 font-jost text-lg font-medium rounded-md bg-[#ec9b12] ${cartItems?.data?.length > 0 ? "block" : "hidden"}`}
                >
                  Checkout
                </button>
              }
            />
          )}
          {!isLoggedIn && (
            <Login
              logintrigger={
                <button
                  className={` w-full text-white text-center p-3 font-jost text-lg font-medium rounded-md bg-[#ec9b12] ${cartItems?.data?.length > 0 ? "block" : "hidden"}`}
                >
                  Checkout
                </button>
              }
            />
          )}

          <DrawerClose></DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default Cart;
