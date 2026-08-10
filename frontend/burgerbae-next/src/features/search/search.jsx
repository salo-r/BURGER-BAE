"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollHorizontal } from "./components/horizontalScrollbar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import HoodieCard from "@/components/shared/HoodieCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setSearchOpen } from "@/redux/slices/uiSlice";
import { productApi } from "@/mocks/ProductApi";
import { mongoQueryBuilder } from "@/lib/common";
import { useRouter } from "next/navigation";

export function Search({ trigger }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);
  const [value, setValue] = useState("");
  const [tag, setTag] = useState("all");

  // Build query every time inputs change so we always request fresh data
  const getFilteredData = async (filter) => {
    console.log("filter -", filter);

    const Apiresult = await productApi.getProductList(1, 4, filter);
    console.log("api result", Apiresult);
    if (Apiresult?.status === "SUCCESS") {
      // Some API responses use { data: { data: [...] } } while others use { data: [...] }
      const list = Apiresult?.data?.data ?? Apiresult?.data ?? [];
      console.log("i am list returned by api", list);
      const finalList = Array.isArray(list) ? list : [];
      setFilteredData(finalList);

      console.log("filtered data", finalList);
    } else {
      setFilteredData([]);
      console.log("Product list response not successful", Apiresult);
    }
  };

  // const handleChange = (e) => {
  //   console.log("value", e.target.value)
  // }
  console.log("value", value);
  console.log("tag", tag);

  useEffect(() => {
    const { query } = mongoQueryBuilder({
      search: value,
      priceMin: 0,
      priceMax: undefined,
      brands: null,
      tag: tag,
    });

    getFilteredData(query);
  }, [value, tag]);

  return (
    <Drawer
      onOpenChange={(open) => {
        dispatch(setSearchOpen(open));
      }}
      direction="right"
      className="!overflow-scroll"
    >
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className=" max-w-[20rem] sm:max-w-[25rem] md:max-w-[45%] w-full h-full inset-y-0 right-0 left-auto mt-0 overflow-y-hidden">
        <DrawerHeader>
          <DrawerTitle>
            <div className="flex !p-1 ">
              <Input
                className="outline-0 border-0 rounded-none 
                    focus:ring-0
             focus-visible:ring-0 font-jost font-normal !text-[18px] leading-[18px]"
                type="text"
                name="search"
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const slug = value
                      .trim()
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9\-]/g, "");
                    if (!slug) return;
                    setValue(slug);
                    dispatch(setSearchOpen(false));
                    router.push(`/collections/${slug}`);
                  }
                }}
                value={value}
                placeholder="Search for anything"
              ></Input>
              <DrawerClose asChild>
                <Button
                  variant="outline-0 border-none"
                  className="text-xl !ml-[40px] !p-0"
                >
                  ✕
                </Button>
              </DrawerClose>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <div className="h-[1px] w-full bg-gray-400"></div>

        <div className="overflow-y-scroll">
          <div className="w-full">
            <ScrollHorizontal setTag={setTag} />
          </div>

          <div>
            <p className="font-jost p-2 ml-2 pb-0 font-medium text-[14px]">
              TRENDING NOW
            </p>
            <ScrollArea>
              <div className="flex p-4 gap-3 xl:grid xl:grid-cols-2 xl:grid-rows-2 xl:gap-6">
                {filteredData.length > 0 ? (
                  filteredData?.map((item) => (
                    <HoodieCard
                      className="!h-full !w-[12rem] sm:!w-full"
                      key={item.id}
                      item={item}
                    />
                  ))
                ) : (
                  <p className="text-center w-full mt-[100px]">
                    No products found
                  </p>
                )}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
