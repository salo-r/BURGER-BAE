import React from "react";
import ProductD from "@/features/product/components/ProductD";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function ItemAddCart({ isOpenCart, item, trigger }) {
  return (
    <>
      <Drawer direction="right">
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="sm:max-w-[25rem] md:max-w-[50%] w-full h-full inset-y-0 right-0 left-auto mt-0 transition-transform  overflow-hidden duration-300 rounded-tr-none">
          <DrawerHeader>
            <DrawerTitle className=" pt-1 px-2 flex justify-between  ">
              <p className="font-jost tracking-wide text-base font-medium pl-3">
                SELECT OPTIONS
              </p>
              <DrawerClose asChild>
                <button>&#10005;</button>
              </DrawerClose>
            </DrawerTitle>
          </DrawerHeader>

          <div
            className={`
  transform transition-transform duration-300 ease-in-out overflow-y-auto
  ${isOpenCart ? "translate-x-0" : "translate-x-full"}`}
          >
            <ProductD item={item} className="flex !flex-col !m-3" />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ItemAddCart;
