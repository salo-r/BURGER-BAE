"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mongoQueryBuilder } from "@/lib/common";
import { OrderAPI } from "@/mocks/OrderApi";
import { CPagination } from "@/components/shared/pagination";
import Image from "next/image";

const STATUS_OPTIONS = [
  "order confirmed",
  "shipped",
  "out for delivery",
  "delivered",
  "cancelled",
  "returned",
];

function Orders() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { query, options } = mongoQueryBuilder({
    status: status,
    sort: { createdAt: -1 }, // ✅ ADD HERE
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [status]);

  useEffect(() => {
    getOrderList();
  }, [status, currentPage]);

  const getOrderList = async () => {
    try {
      let result = await OrderAPI.listOrder(
        currentPage,
        5,
        query ? query : {},
        options,
      );
      if (result?.status === "SUCCESS") {
        console.log("Successfully ! , order list is retrieved....");
        setOrderList(result.data.data);
        setTotalPages(result.data.paginator?.pageCount || 1);
        console.log("order list is from getOrderList : ", result.data.data);
        return result.data.data;
      } else {
        setOrderList(null);
        console.log("issue in fetching order data....");
      }
    } catch {
      console.log("error in fetching order list");
    }
  };

  /* Status key mapping (same as in common.js) */
  const statusMap = {
    "order confirmed": "orderConfirm",
    shipped: "shipped",
    "out for delivery": "outForDelivery",
    delivered: "delivered",
    cancelled: "cancel",
    returned: "refunded",
  };

  /* ✅ Helper: get readable status for a product */
  const getReadableStatus = (orderStatus) => {
    if (!orderStatus) return "Pending";

    const statusPriority = [
      "refunded",
      "cancel",
      "delivered",
      "outForDelivery",
      "shipped",
      "orderConfirm",
    ];

    for (let key of statusPriority) {
      if (orderStatus[key]?.isConfirmed) {
        return key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
      }
    }

    return "Order Placed";
  };

  /* ✅ Helper: check if a product matches the selected status filter */
  const doesProductMatchStatus = (product) => {
    if (!status) return true; // no filter = show all
    const key = statusMap[status.toLowerCase()];
    if (!key) return true;
    return product?.orderStatus?.[key]?.isConfirmed === true;
  };

  return (
    <div className="flex mt-[100px]  w-full border">
      {/* Fixed Sidebar */}
      <aside className="w-56 shrink-0 border-r border-black sticky top-[100px] h-[calc(100vh-100px)] overflow-y-auto p-4">
        <p className="underline font-semibold mb-4">Filters</p>

        <div>
          <p className="font-semibold mb-2">Status</p>
          <div className="flex flex-col gap-3">
            {STATUS_OPTIONS.map((option) => (
              <label
                key={option}
                htmlFor={option}
                className="flex items-center gap-2 cursor-pointer text-sm capitalize"
              >
                <input
                  type="checkbox"
                  id={option}
                  name={option}
                  checked={status === option}
                  onChange={() =>
                    setStatus((prev) => (prev === option ? "" : option))
                  }
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Scrollable Order List */}
      <main className="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
        <div>
          {!orderList || orderList.length === 0 ? (
            <p className="text-sm text-gray-500">
              {status
                ? `No products found for status "${status}".`
                : "No products found in the page."}
            </p>
          ) : (
            orderList.map((item, index) => {
              const filteredProducts = (item?.products || []).filter(
                doesProductMatchStatus,
              );
              if (filteredProducts.length === 0) return null;
              return (
                <div
                  className="border mb-3 p-3 rounded-md"
                  key={item?._id || index}
                >
                  {filteredProducts.map((product, pIndex) => (
                    <div
                      onClick={() =>
                        router.push(`/track-order/${item?.id}/${product?._id}`)
                      }
                      key={pIndex}
                      className="border mb-3 p-3 rounded-md "
                    >
                      <div className="flex mb-3 last:mb-0">
                        <div className="relative w-20 h-20 overflow-hidden rounded-md">
                          <Image
                            src={product?.productId?.image}
                            alt={
                              product?.productId?.title?.longTitle || "Product"
                            }
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-xs">
                            {product?.productId?.title?.longTitle}
                          </p>
                          <p>₹{product?.productId?.price?.cost}</p>
                          <p className="text-sm capitalize text-gray-500">
                            {getReadableStatus(product?.orderStatus)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && orderList && orderList.length > 0 && (
          <div className="my-6">
            <CPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default Orders;
