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
import { Register } from "../register";
import ChangePassword from "../changePassword";
import { authApi } from "@/mocks/authApi";

export function FormTextarea({ closeLogin, onLoginSuccess }) {
  const [loginMethod, setLoginMethod] = useState("phone");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);

      const result = await authApi.login(data);
      console.log("login result", result);
      if (result?.status === "SUCCESS") {
        localStorage.setItem("authToken", result?.data?.token);
        await onLoginSuccess();
        toast.success("You submitted:", {
          className: "bg-yellow-400 text-black ",
          duration: 1000,
          description: result?.message,
          position: "bottom-right",
        });
        closeLogin();
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
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          {/* PHONE INPUT */}
          {loginMethod === "phone" && (
            <>
              <Input
                className="mt-3 mr-2"
                type="tel"
                placeholder="Enter phone number"
                maxLength={10}
                inputMode="numeric"
                {...register("username", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
              />

              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
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
                className="mt-3 mr-2"
                {...register("username", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })}
              />

              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
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

          <ChangePassword
            trigger={
              <p className="text-[11px] text-center cursor-pointer hover:underline mt-2">
                Forget Password ?
              </p>
            }
          />

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
            form="login-form"
            className="w-full mt-3 text-white bg-black"
          >
            Submit
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <div className="w-full">
          <Register
            trigger={
              <p className="text-center my-2 text-sm  text-[#000] hover:text-[#514646] hover:underline">
                Create new account
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
