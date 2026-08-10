import Image from "next/image";
function ReviewCard({ item }) {
  return (
    <div className=" flex flex-col gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)]  h-full w-[225px]">
      {/* image wrapper */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden w-full rounded-t-md">
        <div className="relative w-full h-[250px] bg-red-500">
          <Image
            src={item.img}
            alt={item.name}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* information wrapper */}
      <div className="flex flex-col gap-2">
        {/* rating */}
        {item.rating > 0 && (
          <div className="flex gap-1 justify-center">
            <p className="flex gap-1">
              {Array.from({ length: item.rating }, (_, i) => (
                <span key={i} className="text-[#108474] text-xl">
                  ★
                </span>
              ))}
            </p>
          </div>
        )}

        {/* name and verified */}
        <div className="flex  justify-center items-center gap-2">
          <h6 className="font-semibold font-jost text-[#108474]">
            {item.name}
          </h6>
          {item.verified && (
            <span className="text-xs bg-[#108474] text-white px-2 py-0.5 rounded font-jost">
              Verified
            </span>
          )}
        </div>

        {/* title & description */}
        <div className="flex flex-col px-4">
          <h6 className="text-center font-jost">{item.heading}</h6>
          <p className="text-center text-sm text-gray-600 line-clamp-3 font-jost">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
