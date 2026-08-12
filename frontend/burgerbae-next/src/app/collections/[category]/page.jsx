import React , { cache } from "react";
import Collection from "@/features/category/Collection";
import { NavData } from "@/constants/navConstant";
export const dynamic = "force-dynamic"; 

const getProducts = cache(async (category) => {
  try {
    const formattedCategory = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/userapp/product/list`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: {
            category: formattedCategory,
          },
          options: {
            page: 1,
            limit: 4,
            pagination: true,
            sort: { name: 1 },
          },
          isCountOnly: false,
        }),
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const result = await res.json();

    return result?.data?.data || [];
  } catch (error) {
    console.log("Error fetching products:", error);
    return [];
  }
});

// Generate SEO Metadata
export async function generateMetadata({ params }) {
  const { category } = await params;

  const formattedCategory = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
 
  const product = await getProducts(category)
  console.log(product, "product");
  const image = product?.[0].productImages?.[0]?.path || product?.[0]?.image;
  console.log(image,"image");
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ),

    title: `${formattedCategory} Collection | Burger Bae`,

    description: `Explore the best ${formattedCategory} collection at Burger Bae.`,

    openGraph: {
      title: `${formattedCategory} Collection | Burger Bae`,

      description: `Explore the best ${formattedCategory} collection at Burger Bae.`,

      url: `/collections/${category}`,

      siteName: "Burger Bae",

      images: [
        {
          url: image || "https://www.burgerbaeclothing.com/cdn/shop/files/9b0f03b6-5d78-4678-ab10-1bba2907a62d_e68f4ef5-19f1-44be-aad3-2c13a267cf3d.jpg?crop=center&height=350&v=1768899353&width=375",

          width: 640,
          height: 800,

          alt: `${formattedCategory} Collection`,
        },
      ],

      locale: "en_IN",

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title: `${formattedCategory} Collection | Burger Bae`,

      description: `Explore the best ${formattedCategory} collection at Burger Bae.`,

      images: [
       image || "https://www.burgerbaeclothing.com/cdn/shop/files/9b0f03b6-5d78-4678-ab10-1bba2907a62d_e68f4ef5-19f1-44be-aad3-2c13a267cf3d.jpg?crop=center&height=350&v=1768899353&width=375"
      ],
    },
  };
}

// Generate Static Routes
// export async function generateStaticParams() {
//   const categorySet = new Set();

//   const addCategory = (link) => {
//     if (!link || typeof link !== "string") return;

//     // only collections routes
//     if (!link.startsWith("/collections/")) return;

//     const slug = link.replace("/collections/", "").trim().toLowerCase();

//     // skip invalid/static routes
//     if (!slug || slug === "all" || slug.includes("[") || slug.includes("]")) {
//       return;
//     }

//     categorySet.add(slug);
//   };

//   NavData.forEach((item) => {
//     addCategory(item.link);
//     addCategory(item.titleLink);

//     item.subCategory?.forEach((sub) => {
//       addCategory(sub.link);

//       sub["sub-subCateogry"]?.forEach((child) => {
//         addCategory(child.link);
//       });
//     });
//   });

//   return [...categorySet].map((category) => ({
//     category,
//   }));
// }

// Page Component
export default async function Page({ params }) {
  const { category } = await params;

  const initialProducts = await getProducts(category);

  return <Collection initialProducts={initialProducts} category={category} />;
}
