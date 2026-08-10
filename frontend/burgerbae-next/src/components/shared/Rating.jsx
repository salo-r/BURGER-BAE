"use client"
import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ReviewsData } from "@/constants/RatingData";
import Image from "next/image";

function Rating() {
  // useStates

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 4;
  const totalPages = Math.ceil(ReviewsData.length / reviewsPerPage);

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;

  const currentReviews = ReviewsData.slice(startIndex, endIndex);

  const [sort, setSort] = useState("false");


  // accesing states from redux
  const cartItems = []
  const isLoginOpen = false
 
  const isSearchOpen = false
  const isCartOpen = false

  return (
    <>
      <Dialog visible={visible} onOpenChange={setVisible} className="!w-[50%]">
        <DialogTrigger asChild>
          <div
            className={`fixed ${visible ||isLoginOpen || isSearchOpen || isCartOpen || cartItems.length > 0 ? "hidden" : "hidden  sm:block"} z-[100] right-0 top-[38%] shadow-[0_10px_30px_rgba(0,0,0,0.15)]  `}
          >
            <div className="flex flex-col gap-0 items-center hover:text-[#169672] text-[#047857] text-lg font-bold px-2 bg-slate-50 rounded-l-md rounded-tl-md">
              <p>&#9733;</p>
              <p>&#9733;</p>
              <p>&#9733;</p>
              <p>&#9733;</p>
              <p>&#9733;</p>
              <p>4.8</p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="!p-0 !w-[90%] sm:!w-[80%] md:!w-[60%] nav:!w-[40%] !min-w-xs">
          <DialogHeader>
            <DialogTitle className=" p-1 xs:p-4 shadow-md">
              <div className=" p-0 m-0 flex flex-col gap-2 items-center">
                <p className="font-bold text-lg leading-7 ">
                  Let customers speak for us
                </p>
                <p className="text-[#047857]">
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </p>
                <p className="underline text-base font-semibold hover:no-underline ">
                  Based on 1598 reviews
                </p>
              </div>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="no-scrollbar max-h-[50vh] overflow-y-auto px-4">
            <div className="flex flex-col items-center">
              {/* Row 1*/}
              <div className="grid grid-cols-1 gap-1 xs:grid-cols-[6rem_12rem_3rem] items-center width:50%">
                <div className="text-[#047857] text-lg text-center">
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>

                <div className="bg-gray-300 h-4">
                  <div className="bg-[#047857] h-full w-[60%]"></div>
                </div>

                <p className="text-gray-400 text-center">1287</p>
              </div>

              {/* Row 2*/}
              <div className="grid grid-cols-1 gap-1 xs:grid-cols-[6rem_12rem_3rem] items-center  width:50%">
                <div className="text-[#047857] text-lg text-center">
                  &#9733;&#9733;&#9733;&#9733;&#9734;
                </div>

                <div className="bg-gray-300 h-4">
                  <div className="bg-[#047857] h-full w-[20%]"></div>
                </div>

                <p className="text-gray-400 text-center">311</p>
              </div>

              {/* row 3 */}
              <div className="grid grid-cols-1 gap-1 xs:grid-cols-[6rem_12rem_3rem] items-center  width:50%">
                <div className="text-[#047857] text-lg text-center">
                  &#9733;&#9733;&#9733;&#9734;&#9734;
                </div>

                <div className="bg-gray-300 h-4"></div>

                <p className="text-gray-400 text-center">0</p>
              </div>

              {/*row 4  */}
              <div className="grid grid-cols-1 gap-1 xs:grid-cols-[6rem_12rem_3rem] items-center  width:50%">
                <div className="text-[#047857] text-lg text-center">
                  &#9733;&#9733;&#9734;&#9734;&#9734;
                </div>

                <div className="bg-gray-300 h-4"></div>

                <p className="text-gray-400 text-center">0</p>
              </div>

              {/* row 5 */}
              <div className="grid grid-cols-1 gap-1 xs:grid-cols-[6rem_12rem_3rem] items-center  width:50%">
                <div className="text-[#047857] text-lg text-center">
                  &#9733;&#9734;&#9734;&#9734;&#9734;
                </div>

                <div className="bg-gray-300 h-4"></div>

                <p className="text-gray-400 text-center">0</p>
              </div>

              <div className=" xs:hidden my-3">
                {" "}
                <p className=" font-jost text-sm underline text-[#108474]">
                  See all reviews
                </p>
              </div>

              <button
                className=" text-white font-bold text-base mx-0 mt-[10px]  bg-[#047857]  w-[15rem] px-[2rem] xs:w-[18rem]  py-3 md:px-20  xs:px-20 hover:!bg-[#047857]"
                onClick={() => setIsReviewOpen((prev) => !prev)}
              >
                {isReviewOpen ? "Cancel review" : "Write a review"}{" "}
              </button>
            </div>

            {/* review form  */}
            <div
              className={`m-0 mx-auto p-11  w-full nav:w-[50%] transition-all duration-500 ease-in-out ${
                isReviewOpen
                  ? " block opacity-100 mt-10"
                  : "hidden max-h-0 opacity-0"
              }`}
            >
              <h3 className=" text-center font-bold text-2xl ">
                Write a review
              </h3>
              <div className="my-4 text-center">
                <p className="font-normal mb-4">Rating</p>
                <p className="text-[#047857] text-[20px] xs:text-[50px] font-bold mb-10 ">
                  {" "}
                  &#9734;&#9734;&#9734;&#9734;&#9734;
                </p>
              </div>

              {/* input fields */}
              <div>
                <div className="text-center">
                  <h3 className="font-normal mb-4">Review Title</h3>
                  <Input className="focus-visible:border-emerald-700 focus-visible:ring-0" />
                </div>
                <div className="text-center">
                  <h3 className="font-normal mt-4 mb-4">Review Content</h3>
                  <Textarea className="focus-visible:border-emerald-700 !h-[200px]  focus-visible:ring-0" />
                </div>

                <div className="text-center">
                  <h3 className="font-normal  mt-4 mb-4">
                    Picture/video(optional)
                  </h3>
                  {/* <Input type="image"></Input> */}

                  <div className="flex justify-center">
                    {" "}
                    <label
                      className="
    cursor-pointer
    flex items-center justify-center
    w-[120px] h-[120px]
    border border-gray-300
    rounded-md
    hover:bg-gray-50
  "
                    >
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                      />

                      <span className="text-3xl text-gray-400">⬆</span>
                    </label>
                  </div>
                </div>

                <FieldGroup className=" mt-4 !text-center">
                  <Field>
                    <FieldLabel
                      className=" !justify-center font-normal "
                      htmlFor="fieldgroup-name"
                    >
                      Display Name
                    </FieldLabel>
                    <Input
                      className="focus-visible:border-emerald-700 focus-visible:ring-0"
                      id="fieldgroup-name"
                      placeholder="Jordan Lee"
                    />
                  </Field>
                  <Field>
                    <FieldLabel
                      className=" !justify-center  font-normal"
                      htmlFor="fieldgroup-email"
                    >
                      Email address
                    </FieldLabel>
                    <Input
                      className="focus-visible:border-emerald-700 focus-visible:ring-0"
                      id="fieldgroup-email"
                      type="email"
                      placeholder="name@example.com"
                    />
                  </Field>

                  <p className="text-base font-medium">
                    How we use your data: We'll only contact you about the
                    review you left, and only if necessary. By submitting your
                    review, you agree to Judge.me's terms, privacy and content
                    policies.
                  </p>
                  <Field
                    orientation="horizontal"
                    className="flex justify-center"
                  >
                    <Button
                      className="text-[#047857] text-xl px-4 py-5 border border-[#047857] rounded-none"
                      type="reset"
                      variant="outline"
                    >
                      Cancel review
                    </Button>
                    <Button
                      className="text-white px-4 py-5 bg-[#047857] rounded-none font-semibold text-xl"
                      type="submit"
                    >
                      Submit Review
                    </Button>
                  </Field>
                </FieldGroup>
              </div>
            </div>

            {/* trust badges */}
            <div className="flex gap-8 items-center justify-center my-5">
              <Image
                className="w-[70px] sm:w-[100px]"
                src="https://judgeme-public-images.imgix.net/judgeme/medals-v2-2025-rebranding/mon_rec/platinum_hollow.svg?auto=format"
                 width={100}
    height={100}
                alt="monthly_record"
              />
              <Image
                className="w-[70px] sm:w-[100px]"
                src="https://judgeme-public-images.imgix.net/judgeme/medals-v2-2025-rebranding/tops/5-percent.svg?auto=format"
                 width={100}
    height={100}
                alt="top_5%_stores"
              />
              <Image
                className="w-[70px] sm:w-[100px]"
                src="https://judgeme-public-images.imgix.net/judgeme/medals-v2-2025-rebranding/tops_trend/5-percent.svg?auto=format"
                alt="top_5%_trend_stores"
                 width={100}
    height={100}
              />
            </div>

            <hr />
            <div className="flex  flex-col xs:flex-row my-8 gap-3 font-jost">
              <h3 className="text-[#047857] font-semibold p-1 text-center text-[clamp(0.5rem,1rem,1.5rem)] bg-[#a3e7d3]">
                Product Reviews (1597)
              </h3>
              <h3 className="text-[#047857] font-semibold underline">
                Shop Reviews (1)
              </h3>
            </div>

            <hr />

            {/* select tag */}
            <div className="mt-3 font-jost text-[#047857] text-sm">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                name="rating"
                id="rating"
              >
                <option value="Most Recent">Most Recent</option>
                <option value="Highest rating">Highest rating</option>
                <option value="Lowest rating">Lowest rating</option>
                <option value="Only Pictures">Only Pictures</option>
                <option value="pictures First">pictures First</option>
                <option value="Videos First">Videos First</option>
                <option value="Most Helpful">Most Helpful</option>
              </select>
            </div>

            {/* Rating Data */}

            {currentReviews.length > 0 &&
              currentReviews.map((review) => (
                <div>
                  <hr />
                  <div className="font-jost p-3 flex flex-col gap-1 mb-3">
                    {/* about -Product name  */}

                    <div className="flex gap-2">
                      <p className="text-[#3d3b3b] text-[17px] font-semibold">
                        about
                      </p>
                      <h1 className=" text-[#047857] hover:text-[#3a987d] underline  text-[15px] xs:text-[17px] font-semibold">
                        {review.about}
                      </h1>
                    </div>

                    {/* rating and date */}
                    <div className="flex justify-between my-1">
                      <div>
                        {[...Array(5)].map((_, index) => (
                          <span key={index} className="text-[#047857]">
                            {index < review.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm">{review.date}</p>
                    </div>
                    {/* username */}
                    <div className="flex items-center ">
                      <Image width={30} height={30}
                        className="w-[30px]"
                        src="data:image/png;base64,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"
                        alt=""
                      />
                      <p className="text-[#047857] font-semibold">
                        {review.name}
                      </p>
                      {review.verified ? (
                        <div className="bg-[#047857] text-white text-sm px-1 ml-2">
                          Verified
                        </div>
                      ) : null}
                    </div>

                    {/* user review */}
                    <div className="flex flex-col my-2 gap-2">
                      <h3 className="text-lg font-medium">{review.heading}</h3>
                      <p className="font-medium text-[#343232]">
                        {review.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            {/* pagination data */}
            <Pagination>
              <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {/* Page numbers */}
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setCurrentPage(index + 1)}
                      isActive={currentPage === index + 1}
                      className="cursor-pointer"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < totalPages &&
                      setCurrentPage(currentPage + 1)
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                    c
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Rating;
