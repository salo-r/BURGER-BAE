"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faChevronDown,
  faTrash,
  faAngleRight,
  faArrowLeft,
  faCartShopping,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faHouseCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector, useDispatch } from "react-redux";
import { OrderAPI } from "@/mocks/OrderApi";
import { PaymentAPI } from "@/mocks/paymentApi";
import { checkIfUserLoggedIn, updateUserThunk } from "@/redux/slices/auth";
import { emptyCartThunk } from "@/redux/slices/cart";
import { productApi } from "@/mocks/ProductApi";
import { storePaymentDetails } from "@/redux/slices/payment";
import Image from "next/image";

function Checkout({
  productDtrigger,
  checkoutTrigger,
  totalDiscount,
  totalMrp,
  estimatedTotal,
  increaseQuantity,
  decreaseQuantity,
  handleDelete,
  RelatedItems,
  buyNowProduct,
}) {
  console.log("buyNowProduct", buyNowProduct);
  const isBuyNow = !!buyNowProduct; //true
  console.log("isBuyNow", isBuyNow);
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(buyNowProduct?._buyQty || 1);
  const [addAddress, SetaddAddress] = useState(true);
  const [open, setOpen] = useState(false);
  const [refreshOrders, setRefreshOrders] = useState(0);
  const [DeliveryAddress, setDeliveryAddress] = useState(
    user?.address?.[0]?.addresstype || null,
  );
  const [paymentChannel, setPaymentChannel] = useState("");
  const [address, setAddress] = useState(false);
  const [pincode, setPincode] = useState("");
  const [addressField, setAddressField] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [fullname, setFullname] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState("Home");
  const [customLabel, setCustomLabel] = useState("");
  const [editingAddressId, setEditingAddressId] = useState(null);
  const countries = [
    { name: "India", code: 91, flag: "🇮🇳" },
    { name: "United States", code: 1, flag: "🇺🇸" },
    { name: "United Kingdom", code: 44, flag: "🇬🇧" },
    { name: "Canada", code: 1, flag: "🇨🇦" },
    { name: "Australia", code: 61, flag: "🇦🇺" },
    { name: "Germany", code: 49, flag: "🇩🇪" },
    { name: "France", code: 33, flag: "🇫🇷" },
    { name: "Japan", code: 81, flag: "🇯🇵" },
    { name: "China", code: 86, flag: "🇨🇳" },
    { name: "Brazil", code: 55, flag: "🇧🇷" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const cart = useSelector((state) => state.cart.items);
  const cartItemsFromCart = cart?.data || [];
  // Buy Now mode: build a cart-like item from the product
  const buyNowItems = isBuyNow
    ? [
        {
          id: `buynow-${buyNowProduct.id}`,
          products: [
            {
              productId: buyNowProduct,
              qty: quantity,
              size: buyNowProduct._buySize || buyNowProduct.size?.[0],
            },
          ],
        },
      ]
    : [];

  const cartItems = isBuyNow ? buyNowItems : cartItemsFromCart;

  // Compute totals for buy-now mode
  const computedMrp = isBuyNow
    ? (buyNowProduct.price?.mrp || 0) * quantity
    : totalMrp;
  const computedCost = isBuyNow
    ? (buyNowProduct.price?.cost || 0) * quantity
    : estimatedTotal;
  const computedDiscount = isBuyNow
    ? computedMrp - computedCost
    : totalDiscount;

  // Fetch related items for buy-now mode based on the product's category
  const [buyNowRelatedItems, setBuyNowRelatedItems] = useState([]);

  useEffect(() => {
    if (!isBuyNow) return;
    const category = buyNowProduct?.category;
    if (!category) return;
    let cancelled = false;
    const fetch = async () => {
      const res = await productApi.getProductList(1, 6, { category });
      if (cancelled || res?.status !== "SUCCESS") return;
      const products = res?.data?.data || [];
      // exclude the product being bought
      const filtered = products
        .filter((p) => p.id !== buyNowProduct.id)
        .slice(0, 4);
      setBuyNowRelatedItems(filtered);
    };
    fetch();
    return () => {
      cancelled = true;
    };
  }, [isBuyNow, buyNowProduct?.id]);

  const resolvedRelatedItems = isBuyNow ? buyNowRelatedItems : RelatedItems;

  console.log("cartItems data", cartItems);
  const showAddress = user?.address.length > 0 ? "true" : "false";

  const openRazorpay = (data, order_id) => {
    console.log("Razorpay data received:", data);

    if (!window.Razorpay) {
      toast.error("Payment gateway not loaded.");
      return;
    }

    const options = {
      key: data.key_id,
      amount: data.amount,
      currency: "INR",
      name: "Your App",
      description: "Order Payment",

      order_id: data.razorpayOrderId,

      // ✅ Show all payment methods
      method: {
        upi: true,
        card: true,
        netbanking: true,
        wallet: true,
      },

      // ✅ MAIN INTEGRATION POINT
      // runs after successful payment
      handler: async function (response) {
        console.log("Payment Success:", response);

        try {
          const verifyResult = await PaymentAPI.verifyRazorPay({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyResult?.status === "SUCCESS") {
            toast.success("Payment verified successfully ✅");
            console.log("Verified:", verifyResult);
            router.push("/paymentsuccessfull");
            dispatch(storePaymentDetails(verifyResult.data.payment));

            let updateOrder = await OrderAPI.updateOrderStatus(order_id, {
              products: cartItems?.map((item) => {
                return {
                  productId: `${item?.products[0]?.productId?.id}`,
                  qty: item?.products[0]?.qty,
                  orderStatus: {
                    orderConfirm: {
                      isConfirmed: true,
                      date: new Date().toISOString(),
                    },
                  },
                };
              }),

              paymentStatus: "full",
            });

            if (updateOrder.status === "SUCCESS") {
              toast.success("Order updated successfully!");
            } else {
              toast.error("Order not updated");
            }
          } else {
            toast.error("Payment verification failed ❌");
          }
        } catch (err) {
          console.error(err);
          toast.error("Verification error");
        }
      },

      // ✅ Detect user closing popup (cancel case)
      modal: {
        ondismiss: function () {
          console.log("User closed payment popup");
          toast.error("Payment cancelled by user ❌");
        },
      },

      prefill: {
        name: "Test User",
        email: "test@test.com",
        contact: "9999999999",
      },

      theme: {
        color: "#3399cc",
      },
    };

    console.log("Final Razorpay options:", options);

    const rzp = new window.Razorpay(options);

    // ✅ Detect payment failure (UPI, wallet, netbanking)
    rzp.on("payment.failed", function (response) {
      console.log("Payment Failed:", response);
      toast.error("Payment failed ❌");
    });

    rzp.open();
  };

  const updateUser = async () => {
    try {
      let updatedAddresses;

      if (editingAddressId) {
        //  EDIT existing address
        updatedAddresses = user.address.map((addr) =>
          addr.id === editingAddressId
            ? {
                ...addr,
                name: fullname,
                email: email,
                tel: Number(phone),
                locality: addressField,
                city: city,
                state: state,
                zipcode: pincode,
                addresstype: selected,
              }
            : addr,
        );
      } else {
        //  ADD new address
        updatedAddresses = [
          ...(user?.address || []),
          {
            name: fullname,
            email: email,
            tel: Number(phone),
            locality: addressField,
            city: city,
            state: state,
            zipcode: pincode,
            addresstype: selected,
          },
        ];
      }

      const result = await dispatch(
        updateUserThunk(user?.id, { address: updatedAddresses }),
      );

      console.log(result, "result of updateUser in checkout page");
      if (result?.data?.status === 200) {
        console.log(
          "result of update address function is success.....",
          result,
        );
        await dispatch(checkIfUserLoggedIn());
      }

      toast.success(
        editingAddressId
          ? "Address updated successfully"
          : "Address added successfully",
      );
      setEditingAddressId(null); // reset
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const updatedAddresses = user?.address?.filter(
        (addr) => String(addr.id) !== String(id),
      );

      console.log("after delete", updatedAddresses);
      const result = await dispatch(
        updateUserThunk(user?.id, { address: updatedAddresses }),
      );
      if (result?.status === "SUCCESS") {
        console.log(
          "result of delete address function is success.....",
          result,
        );
        await dispatch(checkIfUserLoggedIn());
        toast.success("Address deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createPayment = async (paymentChannel, order_id) => {
    console.log(computedCost, "computedCost---------------");
    try {
      if (paymentChannel === "cash") {
        const payment = await PaymentAPI.createPayment({
          userId: user?.id,
          paymentChannel: paymentChannel,
          totalpayment: computedCost,
          paymentStatus: "full",
        });
        if (payment?.status === "SUCCESS") {
          toast.success("Payment created successfully!");
          console.log("payment created successfully!", payment);
        }
      } else {
        console.log(
          paymentChannel,
          computedCost,
          "paymentChannel------------------",
        );
        const payment = await PaymentAPI.razorPayPayment({
          amount: computedCost,
          currency: "INR",
          orderId: order_id,
          paymentMode: paymentChannel,
        });
        if (payment?.status === "SUCCESS") {
          toast.success("Payment created successfully!");
          console.log("payment created successfully!", payment);
          openRazorpay(payment.data, order_id);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Payment failed. Please try again.");
      router.push("/paymentfailed");
    }
  };
  const createOrder = async (selectedPaymentChannel) => {
    try {
      let order = await OrderAPI.createOrder({
        userId: user?.id,
        products: cartItems?.map((item) => {
          return {
            productId: `${item?.products[0]?.productId?.id}`,
            qty: isBuyNow ? quantity : item?.products[0]?.qty,
            orderStatus: {
              orderConfirm: {
                isConfirmed: true,
                date: new Date().toISOString(),
              },
              shipped: { isConfirmed: false },
              outForDelivery: { isConfirmed: false },
              delivered: { isConfirmed: false },
              cancel: { isConfirmed: false },
              refunded: { isConfirmed: false },
            },
          };
        }),
        address: user?.address?.find(
          (addr) => addr.addresstype === DeliveryAddress,
        ),
        status: "pending",
        paymentStatus: "pending",
      });
      const products = cartItems?.map((item) => {
        return {
          productId: `${item?.products[0]?.id}`,
          qty: item?.products[0]?.qty,
        };
      });
      console.log("products for order:", products);
      console.log("order created with id", order);
      if (order?.status === "SUCCESS") {
        toast.success("Order created successfully!");
        console.log("order created successfully!", order);
        router.push("/track-order");
        await createPayment(selectedPaymentChannel, order?.data?.id);
        if (!isBuyNow) {
          await dispatch(emptyCartThunk());
        }

        setRefreshOrders((prev) => prev + 1);
      }
    } catch (err) {
      toast.error("Failed to create order. Please try again.");
      console.log(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{checkoutTrigger}</DialogTrigger>
      <DialogTrigger asChild>{productDtrigger}</DialogTrigger>

      {/* ✅ Dialog */}
      <DialogContent className="!p-0 h-full md:h-[85vh] md:!max-w-[40%] flex flex-col overflow-hidden">
        {/* ✅ ROOT container for drawer */}
        <div id="dialog-root" className=" relative h-full flex flex-col">
          {/* HEADER */}
          <DialogHeader className="shrink-0">
            <DialogTitle className="!p-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon icon={faArrowLeft} />

                  <div className="relative h-[40px] w-[40px]">
                    <Image
                      src="https://d3jr4uzi9y3yv6.cloudfront.net/e31de82d-d898-4547-a5b6-eff77729c4dc-1758276717New_App_Icon_Logo_512x512.jpg"
                      alt="logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="mr-7 flex flex-col items-center font-medium">
                  <p className="text-sm text-[#55585d]">₹{computedCost}</p>
                  <p className="line-through text-xs text-[#bfc1c4]">
                    {`₹${computedDiscount}` || `₹ 0`}
                  </p>
                </div>
              </div>
            </DialogTitle>

            <DialogDescription>
              <p className="text-white bg-black text-center">
                Extra ₹70 Off on UPI | Orders Above ₹1000
              </p>
            </DialogDescription>
          </DialogHeader>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
            {/* ORDER SUMMARY */}
            <Collapsible
              open={open}
              onOpenChange={setOpen}
              className="border rounded-md overflow-hidden"
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center"
                >
                  <div className="flex items-center gap-2 text-[#4D4D4D]">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span>Order summary</span>
                  </div>

                  <div className="flex items-center gap-2 text-[#4D4D4D] font-normal">
                    <span>
                      {`${cartItems.length} item${cartItems.length !== 1 ? "s" : ""} ` ||
                        `0 items`}
                    </span>
                    <FontAwesomeIcon
                      className={`font-normal transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                      icon={faChevronDown}
                    />
                  </div>
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="p-2 space-y-3 max-h-[300px] overflow-y-auto">
                {cart &&
                  cartItems?.length > 0 &&
                  cartItems?.map((item, index) => (
                    <div className="flex gap-2 p-2" key={index}>
                      <div className="relative  max-sm:max-w-[150px] sm:max-w-[153px] max-sm:max-h-[90px] aspect-[3/2] w-full rounded-md overflow-hidden"
                      >
                        <Image
                          src={
                            item?.products.length > 0
                              ? item?.products[0]?.productId?.productImages
                                  ?.length > 0
                                ? item?.products[0]?.productId?.productImages[0]
                                    ?.path
                                : item?.products[0]?.productId?.image
                              : "/placeholder.png"
                          }
                          alt="product_img"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      {/* info div*/}
                      <div>
                        {/* description and price div */}
                        <div className="flex justify-between gap-5 w-[100%]">
                          <div className="flex flex-col  sm:w-[70%]">
                            <p className="text-[#373434] text-sm font-normal text-ellipsis">
                              {item?.products.length > 0
                                ? item?.products[0]?.productId?.title?.longTitle
                                : "item not found"}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {item?.products.length > 0
                                ? item?.products[0]?.size
                                : "size not found"}
                            </p>
                          </div>
                          <div className="flex flex-col text-sm items-end">
                            <p className="font-bold">
                              ₹
                              {item?.products[0].productId.price.cost *
                                item?.products[0].qty}
                            </p>
                            <p className="text-gray-400 line-through">
                              ₹
                              {item?.products[0].productId.price.mrp *
                                item?.products[0].qty}
                            </p>
                          </div>
                        </div>
                        {/* delete and quantity div */}
                        <div className="flex items-center gap-2">
                          {!isBuyNow && (
                            <div
                              onClick={() => {
                                console.log("delete item", item);
                                handleDelete(item.id);
                              }}
                              className="border-gray-300 rounded-sm pointer pt-4 max-w-max cursor-pointer"
                            >
                              <FontAwesomeIcon
                                className="pointer"
                                icon={faTrash}
                              />
                            </div>
                          )}

                          <div className="flex w-full mt-4 gap-3">
                            <div className="flex border-[1px] rounded-sm border-gray-300 w-max bg-white ">
                              <span
                                onClick={() => {
                                  console.log("decrease", item);
                                  if (isBuyNow) {
                                    setQuantity((prev) =>
                                      prev > 1 ? prev - 1 : 1,
                                    );
                                    decreaseQuantity(item, index);
                                  } else {
                                    decreaseQuantity(item, index);
                                  }
                                }}
                                className="px-2 text-gray-400 cursor-pointer"
                              >
                                {" "}
                                &minus;{" "}
                              </span>
                              <span className="px-2">
                                {item.products[0].qty}
                              </span>
                              <span
                                onClick={() => {
                                  console.log("increase", item);
                                  if (isBuyNow) {
                                    setQuantity((prev) => prev + 1);
                                    increaseQuantity(item);
                                  } else {
                                    increaseQuantity(item);
                                  }
                                }}
                                className="px-2 text-gray-400 cursor-pointer"
                              >
                                {" "}
                                &#x2b;{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* TOTALS */}

                <div className="border-t pt-2 text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#605e5e] font-medium">Subtotal</span>
                    <span>₹{computedMrp}</span>
                  </div>

                  <div className="flex justify-between text-green-600">
                    <span className="text-[#605e5e] font-medium">
                      Discount on MRP
                    </span>
                    <span>₹{computedDiscount}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#605e5e] font-medium">
                      Shipping cost
                    </span>
                    <span className="text-green-600">Not applied</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#605e5e] font-medium">Total</span>
                    <span>₹{computedCost}</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* ADDRESS SECTION */}

            <div className=" relative flex flex-col gap-5 justify-between w-full  text-[#4D4D4D] border border-slate-200 rounded-md p-2">
              <div className="flex justify-between">
                <div className="flex gap-1 items-center">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p>
                    {" "}
                    Deliver to
                    <span
                      className={` ml-2 border  rounded-md text-medium text-sm p-1 text-[#5d6065] bg-slate-100 ${showAddress && user?.address?.length > 0 ? "" : "hidden"}`}
                    >
                      {DeliveryAddress}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <p
                    onClick={() => {
                      setAddress((prev) => !prev);
                      setEditingAddressId(null); // optional: reset form
                      setFullname("");
                      setEmail("");
                      setPhone("");
                      setAddressField("");
                      setCity("");
                      setState("");
                      setPincode("");
                      setSelected("home");
                      setCustomLabel("");
                    }}
                  >
                    {" "}
                    Add address
                  </p>
                  <FontAwesomeIcon
                    className={` transition-transform ${address ? "rotate-90" : ""}`}
                    icon={faAngleRight}
                  />
                </div>
              </div>
              {/* ADDRESS OPTIONS */}
              <div className=" sm:w-full">
                <RadioGroup
                  className=" relative  sm:w-full "
                  value={DeliveryAddress}
                  onValueChange={(val) => setDeliveryAddress(val)}
                >
                  {user?.address?.length > 0 &&
                    user?.address.map((item, id) => (
                      <FieldLabel
                        className=" sm:w-full"
                        onClick={() => setDeliveryAddress(item.addresstype)}
                        key={item.id}
                        htmlFor={item.id}
                      >
                        <Field
                          className="!w-[300px] sm:w-full "
                          orientation="horizontal"
                        >
                          <FieldContent>
                            <FieldTitle>{item.addresstype}</FieldTitle>
                            <FieldDescription className="!w-full md:!max-w-[350px] min-[901px]:!max-w-full !break-all">
                              <div className="w-full max-w-full break-words md:min-w-0">
                                <h1>{item?.name}</h1>
                                <p className="break-all">
                                  {item?.locality},{item?.city},{item?.state},
                                  {item?.country},{item?.zipcode}
                                </p>
                                <p className="break-all">
                                  {item?.tel},{item?.email}
                                </p>
                              </div>
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem
                            className="absolute top-2 right-8"
                            value={item.addresstype}
                            id={item.id}
                          />
                          <div className="absolute right-2 top-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  className="!border-0 !p-0 !mb-2"
                                  variant="outline"
                                >
                                  <FontAwesomeIcon
                                    className="mb-[20px]"
                                    icon={faEllipsisVertical}
                                  />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setEditingAddressId(item.id);
                                    setFullname(item.name);
                                    setEmail(item.email);
                                    setPhone(item.tel);
                                    setSelectedCountry(
                                      countries.find(
                                        (c) => c.code === item.country_code,
                                      ),
                                    );
                                    setAddressField(item.locality);
                                    setCity(item.city);
                                    setState(item.state);
                                    setPincode(item.zipcode);
                                    setSelected(item.addresstype);
                                    setCustomLabel(
                                      item.addresstype === "other"
                                        ? item.customLabel
                                        : "",
                                    );
                                    setAddress((prev) => !prev);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faPenToSquare} />
                                  <p>Edit</p>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FontAwesomeIcon
                                    className="pointer"
                                    icon={faTrash}
                                  />
                                  <p
                                    onClick={() => {
                                      deleteAddress(item.id);
                                      setAddress(false);
                                    }}
                                  >
                                    Delete
                                  </p>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FontAwesomeIcon
                                    icon={faTriangleExclamation}
                                  />
                                  Report an issue
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </Field>
                      </FieldLabel>
                    ))}
                </RadioGroup>
              </div>
              <div
                className={`bg-[#F5F5F5] rounded-md  ${showAddress && user?.address?.length > 0 ? "hidden" : ""}`}
              >
                <p
                  className={`text-center text-[#979A9A] font-medium font-jost ${showAddress && user?.address?.length > 0 ? "hidden" : ""}`}
                >
                  No saved Address
                </p>
              </div>
            </div>

            {/* set address */}
            <div
              className={`w-full border bg-[#ffffff] rounded-md transform transition-all duration-500 ease-in-out overflow-hidden ${
                address ? "translate-y-0 opacity-100" : "translate-y-8 hidden"
              }`}
            >
              <div className="  flex justify-between sticky  -top-[8px] z-10  bg-white  w-full h-[50px]   ">
                <p className="p-2">
                  {editingAddressId ? "Edit address" : "Add new address"}
                </p>
                <FontAwesomeIcon
                  onClick={() => setAddress(false)}
                  className={`p-2 }`}
                  icon={faXmark}
                />
              </div>

              <div className="p-2">
                {/* pincode */}
                <div className="relative  w-full">
                  <input
                    id="pincode"
                    type="number"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-yellow-500 transition-all"
                  />

                  <label
                    htmlFor="pincode"
                    className={`
          absolute left-0 text-gray-500 text-sm transition-all
          ${pincode ? "-top-3 text-xs text-yellow-500" : "top-2"}
          peer-focus:-top-3 peer-focus:text-xs peer-focus:text-yellow-500
        `}
                  >
                    PinCode*
                  </label>
                </div>

                {/* address */}
                <div className="relative w-full mt-6">
                  <input
                    id="address"
                    type="text"
                    value={addressField}
                    onChange={(e) => setAddressField(e.target.value)}
                    className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-yellow-500 transition-all"
                  />

                  <label
                    htmlFor="address"
                    className={`
          absolute left-0 text-gray-500 text-sm transition-all
          ${addressField ? "-top-3 text-xs text-yellow-500" : "top-2"}
          peer-focus:-top-3 peer-focus:text-xs peer-focus:text-yellow-500
        `}
                  >
                    Address*
                  </label>
                </div>

                {/* city */}
                <div className="relative w-full mt-6">
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-yellow-500 transition-all"
                  />

                  <label
                    htmlFor="city"
                    className={`
          absolute left-0 text-gray-500 text-sm transition-all
          ${city ? "-top-3 text-xs text-yellow-500" : "top-2"}
          peer-focus:-top-3 peer-focus:text-xs peer-focus:text-yellow-500
        `}
                  >
                    City*
                  </label>
                </div>

                {/* state */}
                <div className="relative w-full mt-6">
                  <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-yellow-500 transition-all"
                  />

                  <label
                    htmlFor="state"
                    className={`
          absolute left-0 text-gray-500 text-sm transition-all
          ${state ? "-top-3 text-xs text-yellow-500" : "top-2"}
          peer-focus:-top-3 peer-focus:text-xs peer-focus:text-yellow-500
        `}
                  >
                    State*
                  </label>
                </div>

                {/* phone no */}
                <div className="w-full mt-6">
                  <label htmlFor="no" className="text-sm text-gray-500">
                    Phone number *
                  </label>

                  <div className="flex items-center border-b-2 border-gray-300 focus-within:border-orange-500 transition-all mt-1">
                    {/* Country Select */}
                    <div className="flex items-center gap-2 pr-2 border-r border-gray-300">
                      <select
                        value={selectedCountry?.name}
                        onChange={(e) => {
                          const country = countries.find(
                            (c) => c.name === e.target.value,
                          );
                          setSelectedCountry(country);
                        }}
                        className="bg-transparent outline-none text-sm cursor-pointer"
                      >
                        {countries.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.flag} ({c.code})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Input */}
                    <div className="flex items-center w-full px-2">
                      <span className="text-sm text-gray-700 mr-2">
                        {selectedCountry?.code}
                      </span>

                      <input
                        id="no"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number"
                        className="w-full py-2 outline-none bg-transparent text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* fullname */}
                <div className={"relative w-full mt-6"}>
                  <input
                    id="fullname"
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-yellow-500 transition-all"
                  />

                  <label
                    htmlFor="fullname"
                    className={`
          absolute left-0 text-gray-500 text-sm transition-all
          ${fullname ? "-top-3 text-xs text-yellow-500" : "top-2"}
          peer-focus:-top-3 peer-focus:text-xs peer-focus:text-yellow-500
        `}
                  >
                    Full Name
                  </label>
                </div>

                {/* email */}
                <div className={`relative w-full mt-6 `}>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 text-sm outline-none focus:border-yellow-500 transition-all"
                  />

                  <label
                    htmlFor="email"
                    className={`
          absolute left-0 text-gray-500 text-sm transition-all
          ${email ? "-top-3 text-xs text-yellow-500" : "top-2"}
          peer-focus:-top-3 peer-focus:text-xs peer-focus:text-yellow-500
        `}
                  >
                    Email
                  </label>
                </div>

                <div className="mt-4">
                  {/* UI display */}
                  <p className="text-sm text-gray-600 mb-2">
                    Save as:{" "}
                    <span className="font-medium capitalize">
                      {selected === "other" && customLabel
                        ? customLabel
                        : selected}
                    </span>
                  </p>

                  <ToggleGroup
                    type="single"
                    size="sm"
                    variant="outline"
                    value={selected}
                    onValueChange={(val) => {
                      if (val) {
                        setSelected(val);
                        if (val !== "other") setCustomLabel("");
                      }
                    }}
                    className="flex gap-2 flex-wrap"
                  >
                    <ToggleGroupItem
                      className={`mr-1 ${selected === "home" ? "border border-orange-700" : "border-slate-400"}`}
                      value="home"
                    >
                      <FontAwesomeIcon className="" icon={faHouse} />
                      Home
                    </ToggleGroupItem>

                    <ToggleGroupItem
                      className={`mr-1 ${selected === "friends" ? "border border-orange-700" : "border-slate-400"}`}
                      value="friends"
                    >
                      <FontAwesomeIcon icon={faUserGroup} className="mr-1" />
                      Friends
                    </ToggleGroupItem>

                    <ToggleGroupItem
                      className={`mr-1 ${selected === "work" ? "border border-orange-700" : "border-slate-400"}`}
                      value="work"
                    >
                      <FontAwesomeIcon icon={faBriefcase} className="mr-1" />
                      Work
                    </ToggleGroupItem>

                    <ToggleGroupItem
                      className={`mr-1 ${selected === "other" ? "border border-orange-700" : "border-slate-400"}`}
                      value="other"
                    >
                      <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                      Other
                    </ToggleGroupItem>
                  </ToggleGroup>

                  {/* Input only for OTHER */}
                  {selected === "other" && (
                    <input
                      type="text"
                      value={customLabel}
                      onChange={(e) => setCustomLabel(e.target.value)}
                      placeholder="e.g. Simpson's house"
                      className="mt-3 w-full border-b-2 border-gray-300 focus:border-orange-500 outline-none py-2 text-sm"
                    />
                  )}
                </div>

                <div className="mt-3 font-jost text-sm font-normal text-[#888c90]">
                  {" "}
                  <FontAwesomeIcon
                    className="h-[12px] mr-1"
                    icon={faHouseCircleCheck}
                  />
                  This address will be secured with OTP on Shopflo checkouts.
                  View{" "}
                  <span className="underline cursor-pointer">
                    Terms and conditions
                  </span>{" "}
                  and{" "}
                  <span className="underline cursor-pointer">
                    Privacy Policy
                  </span>
                </div>

                <button
                  className="bg-[#ea9724]  font-jost mt-3  p-2 text-white font-medium w-full rounded-md"
                  type="submit"
                  onClick={() => {
                    updateUser();
                  }}
                >
                  {" "}
                  Save And Continue
                </button>
              </div>
            </div>

            {/* coupon code section */}
            <div className=" mt-7">
              <p className="text-[#4D4D4D]  font-medium text-sm ">
                Offers & Rewards
              </p>
              <div className=" border p-2 mt-3 rounded-md border-gray-300">
                <input
                  className="w-full outline-none"
                  type="text"
                  placeholder="Enter coupon code"
                />
              </div>
            </div>

            {/* related items */}
            <div
              className={`flex justify-center border rounded-md border-gray-300 p-2  ${cartItems?.length > 0 ? "block " : "hidden"}`}
            >
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-full max-w-[85%] "
              >
                {" "}
                <p className="underline text-[#116d33] font-jost  text-sm sm:text-base">
                  You might also like
                </p>
                <CarouselContent className="w-full">
                  {resolvedRelatedItems?.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="!max-w-[300px] !max-sm:p-0"
                    >
                      <div className="p-1 flex">
                        <Card>
                          <CardContent className="flex flex-col  gap-2 border-none border-l-2 items-center justify-center p-2">
                            <div className="p-2 flex flex-col gap-2">
                              {" "}
                              <div className="flex gap-2">
                                <div className="relative max-w-[80px] w-full aspect-[3/2] overflow-hidden rounded-md">
  <Image
    src={item?.image}
    alt={item?.title?.longTitle || "product image"}
    fill
    className="object-fill rounded-md"
  />
</div>

                                <div className="font-jost">
                                  <p className=" text-xs sm:text-sm text-[#787474]">
                                    {item.title.longTitle}
                                  </p>
                                  <p className="text-xs font-semibold">
                                    {item.price.cost}
                                  </p>
                                </div>
                              </div>
                              <button className="w-full text-center text-[#116e33] border border-[#116e33] rounded-md">
                                + ADD
                              </button>
                            </div>
                          </CardContent>
                        </Card>{" "}
                        <hr />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-10" />
                <CarouselNext className="-right-10" />
              </Carousel>
            </div>

            {/* payment methods */}
            <div className="flex flex-col gap-3">
              {/* cash on delivery   */}
              {/* <Orders  refreshOrders={refreshOrders}/> */}

              <div
                onClick={() => {
                  setPaymentChannel("cash");
                  createOrder("cash");
                  router.push("/track-order");
                }}
                className={`flex justify-between items-center border border-gray-400 rounded-md p-1 `}
              >
                <div className="flex justify-between items-center">
                  <div className="relative rounded-md h-[30px] w-[20%] mb-7 overflow-hidden">
  <Image
    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-gringotts/images/cash-icon.svg"
    alt="cod_img"
    fill
    className="object-contain"
  />
</div>
                  <div className="flex flex-col">
                    <h4 className="text-[#413f41] font-medium">
                      Cash on Delivery
                    </h4>
                    <p className="text-[#929192] text-sm">
                      Due to handling costs , a nominal fee of ₹50 will be
                      charged
                    </p>
                  </div>
                </div>
                <div className="flex justify-center item-center text-[#413f41]">
                  <h3>
                    {" "}
                    {computedCost + 50 > 0 ? `₹ ${computedCost + 50}` : `₹ 0`}
                    <FontAwesomeIcon
                      className={` transition-transform`}
                      icon={faAngleRight}
                    />
                  </h3>
                </div>
              </div>

              {/* upi  */}
              <div
                onClick={() => {
                  setAddress((prev) => !prev);
                  setPaymentChannel("upi");
                  createOrder("upi");
                }}
                className={`flex justify-between items-center border border-gray-400 rounded-md p-1 `}
              >
                <div className="flex justify-between items-center">
                  <div className="relative rounded-md h-[70px] w-[35%] mb-7 overflow-hidden">
  <Image
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyMtlvLVZxQmyUFGsHbEscjU4hylfqElodOQ&s"
    alt="payment image"
    fill
    className="object-contain"
  />
</div>
                  <div className="flex flex-col">
                    <h4 className="text-[#413f41] font-medium">Pay via UPI</h4>
                    <p className="text-[#929192] text-sm">
                      Use any registered UPI ID
                    </p>
                    <p className="text-green-600 text-xs">
                      {" "}
                      <FontAwesomeIcon className="h-3 " icon={faPercent} />
                      get ₹70 off
                    </p>
                  </div>
                </div>
                <div className="flex justify-center item-center text-[#413f41]">
                  <h3>
                    {" "}
                    {computedCost > 0 ? `₹ ${computedCost}` : `₹ 0`}{" "}
                    <FontAwesomeIcon
                      className={` transition-transform`}
                      icon={faAngleRight}
                    />
                  </h3>
                </div>
              </div>

              {/* Debit */}
              <div
                onClick={() => {
                  setAddress((prev) => !prev);
                  setPaymentChannel("card");
                  createOrder("card");
                }}
                className="flex justify-between items-center border border-gray-400 rounded-md p-1"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center justify-center rounded-md h-[70px] w-[23%] mb-7">
                    <FontAwesomeIcon className="h-30" icon={faCreditCard} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[#413f41] font-medium">
                      Debit/Credit Cards
                    </h4>
                    <p className="text-[#929192] text-sm">
                      Visa,Mastercard,RuPay & more
                    </p>
                  </div>
                </div>
                <div className="flex justify-center item-center text-[#413f41]">
                  <h3>
                    {computedCost > 0 ? `₹ ${computedCost}` : `₹ 0`}
                    <FontAwesomeIcon
                      className={` transition-transform`}
                      icon={faAngleRight}
                    />
                  </h3>
                </div>
              </div>

              {/* Wallets */}
              <div
                onClick={() => {
                  setAddress((prev) => !prev);
                  setPaymentChannel("wallet");
                  createOrder("wallet");
                }}
                className="flex justify-between items-center border border-gray-400 rounded-md p-1"
              >
                <div className="flex justify-between items-center">
                  <div className=" flex justify-center items-center rounded-md h-[70px] w-[23%] mb-7">
                    <FontAwesomeIcon icon={faWallet} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[#413f41] font-medium">Wallets</h4>
                    <p className="text-[#929192] text-sm">
                      Paypal , Airtel, PayZapp & more
                    </p>
                  </div>
                </div>
                <div className="flex justify-center item-center text-[#413f41]">
                  <h3>
                    {computedCost > 0 ? `₹ ${computedCost}` : `₹ 0`}
                    <FontAwesomeIcon
                      className={` transition-transform`}
                      icon={faAngleRight}
                    />
                  </h3>
                </div>
              </div>

              {/* Netbanking */}
              <div
                onClick={() => {
                  setAddress((prev) => !prev);
                  setPaymentChannel("netbanking");
                  createOrder("netbanking");
                }}
                className="flex justify-between items-center border border-gray-400 rounded-md p-1"
              >
                <div className="flex justify-between items-center">
                  <div className=" flex justify-center items-center rounded-md h-[70px] w-[23%] mb-7">
                    <FontAwesomeIcon icon={faHouse} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[#413f41] font-medium">NetBanking</h4>
                    <p className="text-[#929192] text-sm">
                      Select from a list of banks
                    </p>
                  </div>
                </div>
                <div className="flex justify-center item-center text-[#413f41]">
                  <h3>
                    {computedCost > 0 ? `₹ ${computedCost}` : `₹ 0`}
                    <FontAwesomeIcon
                      className={` transition-transform`}
                      icon={faAngleRight}
                    />
                  </h3>
                </div>
              </div>
            </div>

            {/* logOut */}
            <div className="flex font-jost items-center justify-between text-[#595d62]">
              <p>Logged in with {user ? user.phone || user.email : ""}</p>
              <button className="border p-1  font-normal text-[#3e4246] rounded-md px-2">
                Log out
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Checkout;
