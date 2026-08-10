
import ProductD from "@/features/product/components/ProductD";

import React from "react";
import ProductReview from "@/features/product/components/ProductReview";
import CheckoutFeatures from "@/features/product/components/checkoutFeatures";
import RelatedItem from "@/features/product/components/RelatedItem";
import Footer from "@/components/layout/footer";
import Recognization from "@/features/product/components/recognization";
function HeroProductPage() {
  return (
    <>
      <ProductD />
      <ProductReview />
      <CheckoutFeatures />
      <RelatedItem />
      <Recognization />
    </>
  );
}

export default HeroProductPage;
