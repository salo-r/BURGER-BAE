import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

function Filter({
  trigger,
  price,
  setPrice,
  setPriceFilter,
  ProductCount,
  appliedFilters,
  setAppliedFilters,
  color,
  setcolor,
  size,
  setSize,
  sortOption,
  setSortOption,
}) {
  console.log("appliedfilters", appliedFilters);

  const Color = [
    "#F1ECE2",
    "#EDEBE2",
    "#2F8F9D",
    "#B11226",
    "#5C4033",
    "#111111",
    "#E6C229",
    "#1F3C88",
    "#F5F5F5",
    "#6B7280",
  ];

  const colorOptions = [
    { name: "Soft Ivory", value: Color[0] },
    { name: "Light Warm Gray", value: Color[1] },
    { name: "Teal Blue", value: Color[2] },
    { name: "Deep Crimson", value: Color[3] },
    { name: "Dark Brown", value: Color[4] },
    { name: "Jet Black", value: Color[5] },
    { name: "Mustard Yellow", value: Color[6] },
    { name: "Royal Blue", value: Color[7] },
    { name: "Smoke White", value: Color[8] },
    { name: "Cool Gray", value: Color[9] },
  ];

  const sizeOptions = ["S", "X", "XS", "L", "M"];

  const updateColorFilter = (isChecked, colorName, colorValue) => {
    setcolor((prev) =>
      isChecked ? [...prev, colorValue] : prev.filter((c) => c !== colorValue),
    );

    setAppliedFilters((prev) => {
      const current = prev.color
        ? prev.color
            .replace(/^Color:\s*/, "")
            .split(", ")
            .filter(Boolean)
        : [];

      const next = isChecked
        ? [...current, colorName]
        : current.filter((item) => item !== colorName);

      if (next.length === 0) {
        const newState = { ...prev };
        delete newState.color;
        return newState;
      }

      return {
        ...prev,
        color: `Color: ${next.join(", ")}`,
      };
    });
  };

  const updateSizeFilter = (isChecked, sizeItem) => {
    setSize((prev) =>
      isChecked
        ? [...prev, sizeItem]
        : prev.filter((item) => item !== sizeItem),
    );

    setAppliedFilters((prev) => {
      const current = prev.size
        ? prev.size
            .replace(/^Size:\s*/, "")
            .split(", ")
            .filter(Boolean)
        : [];

      const next = isChecked
        ? [...current, sizeItem]
        : current.filter((item) => item !== sizeItem);

      if (next.length === 0) {
        const newState = { ...prev };
        delete newState.size;
        return newState;
      }

      return {
        ...prev,
        size: `Size: ${next.join(", ")}`,
      };
    });
  };

  const handleClearAll = () => {
    setcolor([]);
    setPrice([100, 2000]);
    if (setPriceFilter) setPriceFilter({ min: 100, max: 2000 });
    setAppliedFilters({});
    setSize([]);
  };

  return (
    <>
      <Drawer direction="left">
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="w-full xs:max-w-[65%] sm:max-w-[35%] h-full inset-y-0 right-auto left-0 mt-0 rounded-none overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex p-4  pb-7 pl-7 pt-1 justify-between">
                <div className="font-jost font-medium  tracking-wider">
                  <p className="text-[15px] leading-[15px] mb-3">
                    FILTER AND SORT
                  </p>
                  <p className="text-[12px] leading-[12px]">
                    {ProductCount} PRODUCTS
                  </p>
                </div>
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
          <div className="w-full h-[2px] bg-gray-200"></div>

          <div className="p-4  pb-7 pl-7 font-jost">
            <div>
              <div>
                <span className="">&#8212;</span>
                <p className="text-[14px] leading-[14px] inline  pl-3 font-semibold">
                  AVAILABILITY
                </p>r
              </div>
              <div className=" my-4 flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode" className="font-normal  px-2">
                  In stock{" "}
                </Label>
              </div>
            </div>

            <div>
              <div>
                <span className="">&#8212;</span>
                <p className="text-[14px] leading-[14px] inline  pl-3 font-semibold">
                  PRICE
                </p>
              </div>
              <p className="font-jost text-sm font-medium pl-1 p-2 mt-1">
                The highest price is Rs. 2,000.00
              </p>

              {/* price slider */}
              <Slider
                value={price}
                onValueChange={(val) => {
                  console.log("val", val);
                  // const value = parseFloat(e.target.value) || 0;
                  setPrice(val);
                  setAppliedFilters((prev) => ({
                    ...prev,
                    price: `Price: ${val[0]} - ${val[1]}`,
                  }));
                }}
                max={2000}
                step={100}
                className="mx-auto  mt-2 w-full ml-0 max-w-xs"
              />

              {/* price inputs */}
              <div className=" flex flex-col  w-full gap-4 sm:flex sm:flex-row m-3 ml-0  my-6 sm:gap-3">
                <div className="flex items-center gap-2">
                  <p className=""> &#8377;</p>
                  <Input
                    value={price[0]}
                    onValueChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      console.log("value", value);
                      setPrice([value, price[1]]);
                      setAppliedFilters((prev) => ({
                        ...prev,
                        price: `Price: ${value} - ${price[1]}`,
                      }));
                    }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <p>&#8377;</p>
                  <Input
                    value={price[1]}
                    onChange={(e) => {
                      console.log("value", e.target.value);
                      const value = parseFloat(e.target.value) || 0;
                      setPrice([price[0], value]);
                      setAppliedFilters((prev) => ({
                        ...prev,
                        price: `Price: ${price[0]} - ${value}`,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* size filter  */}
            <div>
              <span className="">&#8212;</span>
              <p className="text-[14px] leading-[14px] inline  pl-3 font-semibold">
                size
              </p>
              <FieldGroup className="m-4 w-56">
                {sizeOptions.map((s) => (
                  <Field key={s} orientation="horizontal">
                    <Checkbox
                      id={`terms-checkbox-size-${s}`}
                      name="terms-checkbox-size"
                      checked={size.includes(s)}
                      onCheckedChange={(checked) =>
                        updateSizeFilter(checked, s)
                      }
                    />
                    <FieldLabel
                      className="font-normal"
                      htmlFor={`terms-checkbox-size-${s}`}
                    >
                      {s}
                    </FieldLabel>
                  </Field>
                ))}
              </FieldGroup>
            </div>

            {/* color filter */}
            <div>
              <span className="">&#8212;</span>
              <p className="text-[14px] leading-[14px] inline  pl-3 font-semibold">
                Color
              </p>
              <FieldGroup className="m-4 w-56">
                {colorOptions.map((col) => (
                  <Field key={col.name} orientation="horizontal">
                    <Checkbox
                      id={`terms-checkbox-${col.name}`}
                      name="terms-checkbox-color"
                      checked={color.includes(col.value)}
                      onCheckedChange={(checked) =>
                        updateColorFilter(checked, col.name, col.value)
                      }
                    />
                    <FieldLabel
                      className="font-normal"
                      htmlFor={`terms-checkbox-${col.name}`}
                    >
                      {col.name}
                    </FieldLabel>
                  </Field>
                ))}
              </FieldGroup>
            </div>

            {/* sort by */}
            <div className="flex flex-col  gap-3  sm:flex sm:flex-row sm:justify-between mt-8">
              <span className="text-[15px] font-medium">SORT BY </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="font-jost font-normal text-[12px] leading-[14px]"
                name="featured"
                id="feature"
              >
                <option value="FEATURED">FEATURED</option>
                <option value="BEST_SELLING">BEST SELLING</option>
                <option value="ALPHABETICALLY_AZ">ALPHABETICALLY, A-Z</option>
                <option value="ALPHABETICALLY_ZA">ALPHABETICALLY, Z-A</option>
                <option value="PRICE_LOW_TO_HIGH">PRICE, LOW TO HIGH</option>
                <option value="PRICE_HIGH_TO_LOW">PRICE, HIGH TO LOW</option>
                <option value="DATE_OLD_TO_NEW">DATE, OLD TO NEW</option>
                <option value="DATE_NEW_TO_OLD">DATE, NEW TO OLD</option>
              </select>
            </div>
          </div>

          <DrawerFooter>
            <div className="!w-full !m-0 !p-0 h-[2px] bg-gray-200"></div>
            <div className=" flex flex-row justify-around">
              <Button
                onClick={handleClearAll}
                className=" shadow-none bg-transparent text-black font-normal relative cursor-pointer px-2 py-1 uppercase
                  transition-colors duration-300
                  
                  after:absolute after:left-0 after:-bottom-[2px]
                   after:h-[1px] after:w-full
                   after:bg-current
                   after:opacity-0 after:scale-x-90
                   after:transition-all after:duration-300 after:ease-out
                   hover:after:opacity-100 hover:after:scale-x-100 hover:bg-transparent"
              >
                CLEAR
              </Button>
              <Button className="w-[50%] hover:text-black hover:bg-white hover: outline">
                APPLY
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Filter;
