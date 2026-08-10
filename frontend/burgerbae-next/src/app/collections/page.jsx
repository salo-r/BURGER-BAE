
import React from "react";
import Category from "@/features/category/category";


export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: "Collections | Burger Bae",
  description: "Check out different collections at Burger Bae.",

  openGraph: {
    title: "Collections | Burger Bae",
    description: "Explore trending streetwear collections at Burger Bae.",
    url: "/collections",

    images: [
      {
        url: "https://www.burgerbaeclothing.com/cdn/shop/files/daddy-i-want-pony-burger-bae-round-neck-crop-baby-tee-burgerbae-1.jpg?v=1753536489&width=640",
        width: 640,
        height: 800,
        alt: "Burger Bae Collection",
      },
    ],

    siteName: "Burger Bae",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Collections | Burger Bae",
    description: "Explore trending streetwear collections at Burger Bae.",
    images: [
      "https://www.burgerbaeclothing.com/cdn/shop/files/daddy-i-want-pony-burger-bae-round-neck-crop-baby-tee-burgerbae-1.jpg?v=1753536489&width=640",
    ],
  },
};

export default function CategoryPage() {
  return (
    <Category />
  )
}