"use client";

import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { authApi } from "@/mocks/authApi";

export function SetPasswordFormTextarea() {
  

  const {
     register,
      handleSubmit,
  control,
    formState: { errors },
  } = useForm();

   const onSubmit = async (data) => {
       try {
         console.log(" request to reset password accepted ......")
       console.log("Data of reset password :",data);

       const result = await authApi.resetPassword(data);
       console.log("reset password result", result);
       if (result?.status === "SUCCESS") {
         
         toast.success("You submitted:", {
           className: "bg-yellow-400 text-black ",
         duration: 1000,
           description: result?.message,
           position: "bottom-right",
         });
         // closeLogin();
       } else {
         toast.error("You submitted:", {
           description: result?.message,
           position: "bottom-right",
         });
       }
     } catch (err) {
       toast.error("You submitted:", {
         description: err?.message,
         position: "bottom-right",
       });
       console.log("Submission error :", err);
     }
 };

  return (
    <Card className="bg-white w-full max-w-[600px] p-2">
      <CardContent className=" p-0 sm:p-6 sm:!pb-2 sm:pt-0">
              <form id="login-form"
                  onSubmit={handleSubmit(onSubmit)}
              >
                  {/* otp */}
         
    <Controller
  name="code"
  control={control}
  rules={{ required: "OTP is required" }}
  render={({ field }) => (
    <InputOTP
      maxLength={6}
      value={field.value}
      onChange={field.onChange}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )}
/>

                  {/* PASSWORD */}
                  
          <Input
            type="password"
            placeholder="Enter new password"
            className="mt-3"
            {...register("newPassword", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
                  />
        {errors.password && (
  <p className="text-red-500 text-xs">
    {errors.password.message}
  </p>
)}
           
          {/* CHECKBOX */}
          <div className="flex items-start gap-2 !p-6 !pt-0 sm:!p-0 mt-3">
            <Checkbox
              id="notify"
              className="h-4 w-4 rounded-md border-gray-400 data-[state=checked]:bg-gray-400 data-[state=checked]:border-gray-400"
            />
            <Label
              htmlFor="notify"
              className="text-gray-400 text-[11px] cursor-pointer"
            >
              Notify me with offers & updates
            </Label>
          </div>

          <Button
            type="submit"
            // form="login-form"
            className="w-full mt-3 text-white bg-black"
          >
         Reset
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <div className="w-full">
         

          <p className="text-gray-400 text-[11px] mt-2 text-center">
            I accept that I have read & understood your Privacy Policy and T&Cs.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
