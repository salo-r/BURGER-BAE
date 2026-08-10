"use client"
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

function ProductReview() {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  return (
    <>
      <div className=" mt-[100px] p-3">
        <div className="flex flex-col justify-center items-center font-jost">
          <h2 className="text-2xl font-bold  mb-2 nav:mb-8 ">
            Customer Reviews
          </h2>
          <div className=" w-[100%] nav:pl-[9rem] flex flex-col items-center justify-center nav:gap-24  mx-5 nav:flex-row ">
            <div className=" flex-col">
              <p className="text-[#047857] text-[30px] font-bold text-center nav:text-left">
                {" "}
                &#9734;&#9734;&#9734;&#9734;&#9734;
              </p>
              <p className="text-lg font-normal">
                Be the first to write a review
              </p>
            </div>
            <div className="border-r-2 h-16 hidden nav:block"></div>

            <button
              className=" text-white font-bold text-base mx-0 mt-3 nav:mt-0 bg-[#047857] md:w-[22rem] w-[94%] py-3 md:px-20  px-20 hover:!bg-[#047857]"
              onClick={() => setIsReviewOpen((prev) => !prev)}
            >
              {isReviewOpen ? "Cancel review" : "Write a review"}{" "}
            </button>
          </div>

          {/* review form  */}
          <div
            className={`overflow-hidden p-11 w-full sm:w-[85%] nav:w-[50%] transition-all duration-500 ease-in-out ${
              isReviewOpen ? "block opacity-100 mt-10" : " hidden max-h-0 opacity-0"
            }`}
          >
            <h3 className=" text-center font-bold text-2xl ">Write a review</h3>
            <div className="my-4 text-center">
              <p className="font-normal mb-4">Rating</p>
              <p className="text-[#047857] text-[50px] font-bold mb-10 ">
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
                  How we use your data: We'll only contact you about the review
                  you left, and only if necessary. By submitting your review,
                  you agree to Judge.me's terms, privacy and content policies.
                </p>
                <Field orientation="horizontal" className="flex justify-center">
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
        </div>
      </div>{" "}
    </>
  );
}

export default ProductReview;
