"use client"
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { productApi } from "@/mocks/ProductApi";
import HoodieCard from "@/components/shared/HoodieCard";

function RelatedItem() {
  const { category, slug } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    console.log("category and slug in related item", category, slug);
    const loadRelatedProducts = async () => {
      if (!category) {
        setFilteredProducts([]);
        return;
      }

      const formatCategory = (value) =>
        value
          .split("-")
          .map(
            (part) =>
              part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(),
          )
          .join("-");

      const normalizedCategory = formatCategory(category);
      console.log("normalized category", normalizedCategory);
      const normalizedSlug = slug?.toLowerCase();

      try {
        const res = await productApi.getProductList(1, 6, {
          category: category,
        });
        console.log("API response for related products", res);
        const items = res?.status === "SUCCESS" ? (res?.data?.data ?? []) : [];
        const related = items.filter(
          (product) => product?.slug?.toLowerCase() !== normalizedSlug,
        );
        console.log("related products", related);
        setFilteredProducts(related);
      } catch (error) {
        console.error("Error fetching related products:", error);
        setFilteredProducts([]);
      }
    };

    loadRelatedProducts();
  }, [category, slug]);

  return (
    <>
      <hr />
      <div className="mx-4 desk:mx-14 ">
        <div className="font-jost mt-20 mb-10">
          <h1 className="font-semibold text-[26px] leading-[27px] md:text-[30px] md:leading-[32px]">
            YOU MAY ALSO LIKE
          </h1>
          <p className="font-medium text-[17px] leading-[22px] md:text-[19px] md:leading-[24px] mt-1">
            Combine your style with these products
          </p>
        </div>

        <div className="w-full">
          <ScrollArea className=" w-full whitespace-nowrap">
            <div className="flex gap-5 ">
              {filteredProducts?.length > 0 &&
                filteredProducts.map((item, idx) => (
                  <HoodieCard
                    className=" h-[387px] max-w-[290px] xs:min-w-[250px] sm:min-w-[320px] xs:w-full xs:!h-auto"
                    item={item}
                    key={idx}
                  />
                ))}
            </div>
            <ScrollBar orientation="horizontal" className="lg:hidden" />
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

export default RelatedItem;
