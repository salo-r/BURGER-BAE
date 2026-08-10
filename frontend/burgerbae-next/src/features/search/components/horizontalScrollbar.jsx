import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function ScrollHorizontal({ setTag }) {
  const [selected, setSelected] = React.useState(null);
  const options = [
    "ALL",
    "BASICS",
    "HOODIES",
    "IT GIRL BABY TEE",
    "TEES",
    "BOTTOMS",
    "CO-ORDS",
    "TOPS",
  ];

  return (
    <>
      <div>
        <p className="font-jost p-3 ml-2 mt-2 pb-0 font-medium text-[13px]">
          POPULAR SEARCHES
        </p>
        <ScrollArea className="w-full !hide-scrollbar !overflow-y-auto whitespace-nowrap">
          <div className="flex w-max space-x-4 p-4">
            {options.map((o) => {
              const isActive = selected === o;
              return (
                <div
                  key={o}
                  className={`font-jost text-[12px] font-medium px-4 py-2 border border-gray-300 rounded-3xl transition-colors duration-150 ${
                    isActive
                      ? "bg-black text-white"
                      : "bg-white text-black hover:text-white hover:bg-black"
                  }`}
                  onClick={() => {
                    const nextSelected = selected === o ? null : o;
                    setSelected(nextSelected);
                    setTag(
                      nextSelected === null ? "all" : o === "ALL" ? "all" : o,
                    );
                  }}
                >
                  {o}
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
