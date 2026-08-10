"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SetPassword } from "../SetPassword";
import { authApi } from "@/mocks/authApi";

export function ChangePasswordFormTextarea() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Form Submitted");
      console.log("Data:", data);

      const result = await authApi.sendForgotPasswordOTP(data);
      console.log("API Result:", result);

      toast("You submitted:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
       
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };
  return (
    <Card className="bg-white w-full max-w-[600px] p-2">
      <CardContent className="p-0 sm:p-6 sm:pt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* email */}

          <Input
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            className="mt-3 mr-2"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
              },
            })}
          />

          {/* SUBMIT BUTTON */}

          <SetPassword
            trigger={
              <Button type="submit" className="w-full text-white bg-black mt-3">
                Get OTP
              </Button>
            }
          />
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

export default ChangePasswordFormTextarea;
