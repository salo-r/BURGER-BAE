"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkIfUserLoggedIn } from "@/redux/slices/auth";
import Navbar from "@/components/layout/Navbar";
import DiscountCode from "@/components/shared/DiscountCode";
import Rating from "@/components/shared/Rating";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/layout/footer";

export default function LayoutProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const verifyUser = async () => {
    const result = await dispatch(checkIfUserLoggedIn());
    setIsLoggedIn(!!result);
  };

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <>
      <Toaster richColors />
      <DiscountCode />
      <Navbar isLoggedIn={isLoggedIn} onLoginSuccess={verifyUser} />
      <Rating />
      {children}
      <Footer />
    </>
  );
}
