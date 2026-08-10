"use client";

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Login } from "../Login";
import { authApi } from "@/mocks/authApi";

export function RegisterFormTextarea() {

  const [loginMethod, setLoginMethod] = useState("phone");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Form Submitted");
      console.log("Data:", data);

      const result = await authApi.register(data);
      console.log("API Result:", result);

      toast("You submitted:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
       state: setLoginMethod("phone"),
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
          
          {/* NAME */}
          <Input
            className="mt-3"
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
             
            })}
          />

          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.name.message}
            </p>
          )}

          {/* PHONE INPUT */}
          {loginMethod === "phone" && (
            <>
              <Input
                className="mt-3"
                type="tel"
                placeholder="Enter phone number"
                maxLength={11}
                inputMode="numeric"
               pattern="[0-9]*"
                {...register("phone", {
                  required: "Phone number is required",
                  
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                     
                  },
                  setValueAs: (value) => Number(value),
                })}
              />

              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </>
          )}

          {/* EMAIL INPUT */}
          {loginMethod === "email" && (
            <>
              <Input
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                className="mt-3"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </>
          )}

          {/* PASSWORD */}
          <Input
            type="password"
            placeholder="Enter your password"
            className="mt-3"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}

          {/* SWITCH LOGIN METHOD */}
          {loginMethod === "phone" && (
            <p
              onClick={() => setLoginMethod("email")}
              className="text-blue-400 text-[11px] text-center cursor-pointer hover:underline mt-2"
            >
              or Login through E-mail
            </p>
          )}

          {loginMethod === "email" && (
            <p
              onClick={() => setLoginMethod("phone")}
              className="text-blue-400 text-[11px] text-center cursor-pointer hover:underline mt-2"
            >
              or Login through Phone Number
            </p>
          )}

          {/* CHECKBOX */}
          <div className="flex items-start gap-2 p-6 pt-0 sm:p-0 mt-3">
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

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            className="w-full text-white bg-black mt-3"
          >
            Submit
          </Button>

        </form>
      </CardContent>

      <CardFooter>
        <div className="w-full">
          <Login
            registerTrigger={
              <p className="text-center my-2 text-sm text-[#000] hover:text-[#514646] hover:underline">
                Login into your account
              </p>
            }
          />

          <p className="text-gray-400 text-[11px] mt-2 text-center">
            I accept that I have read & understood your Privacy Policy and T&Cs.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}