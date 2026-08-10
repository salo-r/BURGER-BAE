export async function generateMetadata({ params }) {

  const { slug } = await params;

  const formattedSlug = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedSlug} | Burger Bae`,
    description: ` ${formattedSlug} `,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  console.log(slug);
  return (
    <div className="mt-[100px] h-[50vh] font-jost flex flex-col justify-center items-center gap-4">
      <h1 className=" text-6xl font-bold uppercase">{slug}</h1>
      <p className="text-base ">page not found</p>
    </div>
  );
}
