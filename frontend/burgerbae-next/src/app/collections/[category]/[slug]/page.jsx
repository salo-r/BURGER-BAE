import HeroProductPage from "@/features/product/heroProductPage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch single product

async function getProduct(slug) {
  try {
    const res = await fetch(`${API_URL}/userapp/product/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          slug: slug,
        },
        options: {
          page: 1,
          limit: 1,
          pagination: true,
          sort: { name: 1 },
          lean: false,
          leanWithId: true,
          useEstimatedCount: false,
          useCustomCountFn: false,
          forceCountFn: false,
        },
        isCountOnly: false,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const result = await res.json();

    return result?.data?.data?.[0] || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Metadata (SEO + OG)

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const product = await getProduct(slug);

  const title =
    product?.title?.longTitle || product?.title?.shortTitle || "Product";

  const description = product?.description || `Explore ${title} at Burger Bae.`;

  const image =
    product?.productImages?.[0]?.path || product?.productImages?.image;

  return {
    title: `${title} - Burger Bae`,
    description,

    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function Page() {
  return <HeroProductPage />;
}
