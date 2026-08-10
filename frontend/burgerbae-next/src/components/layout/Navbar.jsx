"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { NavData } from "../../constants/navConstant";
import { logoutUser } from "@/redux/slices/auth";
import { Login } from "@/features/auth/Login";
import { Search } from "@/features/search/search";
import Cart from "@/features/cart/cart";

const Navbar = ({ onLoginSuccess }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  console.log("user", user);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      console.log("token found in Navbar", token);
    } else {
      dispatch(logoutUser());
      console.log("token not found in Navbar, user logged out");
    }
  }, []);

  const cart = useSelector((state) => state.cart.items);
  const cartItems = cart?.data;

  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const location = usePathname();
  const isCollections = location.toLowerCase().startsWith("/collections"); //returns boolean value
  const isAccount = location.toLowerCase().startsWith("/account");

  const path = location.toLowerCase();

  const matchRoute = (route) => path === route || path.startsWith(route + "/");

  const routeMap = {
    isOrders: "/track-order",
    ispage: "/pages",
    ispolicies: "/policies",
    isOrderPage: "/track-order/:id",
    isCollections: "/collections",
    isAccount: "/account",
    isPaymentSuccess: "/paymentsuccessfull",
    isPaymentCancel: "/paymentfailed",
  };

  const routeFlags = Object.fromEntries(
    Object.entries(routeMap).map(([key, value]) => [key, matchRoute(value)]),
  );

  const isWhiteBgRoute = Object.values(routeFlags).some(Boolean);
  const isLightNavbar = isCollections || isSticky || isAccount;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)"); // lg breakpoint

    const handleResize = (e) => {
      if (e.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleResize);

    // Run once on mount
    if (mediaQuery.matches) {
      setIsMobileMenuOpen(false);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (title) => {
    setActiveMenu(title);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setActiveSub(null);
  };

  const handleSubMouseEnter = (subTitle) => {
    setActiveSub(subTitle);
  };

  const handleSubMouseLeave = () => {
    setActiveSub(null);
  };

  return (
    <>
      <div
        className={` group flex justify-between items-center z-20 py-3
   m-0 px-4 w-full hover:bg-white
    transition-all duration-300 
    ${isSticky ? "fixed top-0" : "absolute"}
    ${
      isMobileMenuOpen || isWhiteBgRoute
        ? "bg-white shadow-md"
        : isSticky
          ? "bg-white shadow-md "
          : "bg-transparent hover:bg-white"
    }
  `}
      >
        {/* hamburger menu for mobile */}
        <div className="lg:hidden">
          <i
            className="fa fa-bars cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-hidden="true"
          ></i>
        </div>

       {/* burger_bae image div */}
<div
  onClick={() => {
    router.push("/");
  }}
  className="relative ml-8 sm:ml-0 px-5 md:px-6 sm:w-14 lg:w-30 flex justify-center items-center lg:justify-start aspect-[7/5] cursor-pointer"
>
  {/* Transparent logo */}
  <Image
    src="https://www.burgerbaeclothing.com/cdn/shop/files/Transparent_logo.png?v=1752318551"
    alt="burger-bae-transparent-logo"
    fill
    className={`object-contain absolute transition-opacity duration-300 z-10
      ${
        isSticky || isWhiteBgRoute
          ? "opacity-0"
          : "opacity-100 group-hover:opacity-0"
      }
    `}
  />

  {/* White/black logo */}
  <Image
    src="https://www.burgerbaeclothing.com/cdn/shop/files/top_bar_logo.png?v=1737617698"
    alt="burger_bae logo"
    fill
    className={`object-contain absolute transition-opacity duration-300 z-20
      ${
        isSticky || isMobileMenuOpen || isWhiteBgRoute
          ? "opacity-100"
          : "opacity-0 group-hover:opacity-100"
      }
    `}
  />
</div>
        {/* div for nav-links */}
        <div
          className={`hidden lg:flex space-x-4 w-3/4 flex-wrap justify-center gap-3 ${isMobileMenuOpen ? "absolute top-full left-0 w-full bg-white flex flex-col items-center py-4 z-10" : ""}`}
        >
          {NavData &&
            NavData.length > 0 &&
            NavData.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(item?.title)}
                onMouseLeave={handleMouseLeave}
              >
                {item.subCategory ? (
                  <span
                    className={`relative cursor-pointer px-2 py-1 uppercase  transition-colors duration-300
                    ${isSticky || isWhiteBgRoute ? "text-black" : "text-white group-hover:text-black"} 
                   after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current
                   after:scale-x-0 after:origin-left
                   after:transition-transform after:duration-300
                    hover:after:scale-x-100`}
                    // onClick={() => {
                    //   () => fetchProducts(item.    category);
                    // }}
                  >
                    {item.title}
                    <span className="ml-1 ">
                      <FontAwesomeIcon
                        className="text-xs"
                        icon={faChevronDown}
                      />
                    </span>
                  </span>
                ) : (
                  <Link
                    href={item.link}
                    className={` 
                   relative cursor-pointer px-2 py-1 uppercase
                  transition-colors duration-300
                  
                  after:absolute after:left-0 after:-bottom-[2px]
                   after:h-[1px] after:w-full
                   after:bg-current
                   after:opacity-0 after:scale-x-90
                   after:transition-all after:duration-300 after:ease-out
                   hover:after:opacity-100 hover:after:scale-x-100
                   ${isSticky || isWhiteBgRoute ? "text-black" : "text-white group-hover:text-black"}
                     `}
                  >
                    {item.title}
                  </Link>
                )}
                {activeMenu === item.title && item.subCategory && (
                  // creates dropdown for menu option
                  <div className="absolute top-full left-0 bg-white border border-gray-300 shadow-lg z-10 min-w-max mt-1">
                    {item.subCategory.map((sub, subIndex) => (
                      <div key={subIndex} className="relative">
                        {/* checks if sub-subcategory exists or not */}
                        {sub["sub-subCateogry"] ? (
                          // if exist
                          <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onMouseEnter={() =>
                              handleSubMouseEnter(sub.subCategoryTitle)
                            }
                            onMouseLeave={handleSubMouseLeave}
                          >
                            {sub.subCategoryTitle}
                            {activeSub === sub.subCategoryTitle && (
                              // forms div for sub-subcategory that appears only when mouse is over the particular subcategory title having sub-subcategories
                              <div className="absolute left-full top-0 bg-white border border-gray-300 shadow-lg min-w-max">
                                {sub["sub-subCateogry"].map(
                                  (subSub, subSubIndex) => (
                                    <Link
                                      key={subSubIndex}
                                      href={subSub.link}
                                      className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                      {subSub["sub-subCateogry-Title"]}
                                    </Link>
                                  ),
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          // if sub-subcategory doesn't exist
                          <Link
                            href={sub.link}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {sub.subCategoryTitle}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* div for nav-icons */}
        <div className="nav-icons flex justify-center items-center gap-3">
          {user ? (
            // Logged in → just show circle, no Login dialog
            <div
              onClick={() => router.push("/account")}
              className={`
            w-7 h-7 rounded-full cursor-pointer flex items-center 
            justify-center text-xs font-bold
            ${isLightNavbar ? "bg-black text-white" : "bg-white text-black"}
        `}
            >
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          ) : (
            // Not logged in → show icon that opens Login dialog
            <Login
              onLoginSuccess={onLoginSuccess}
              trigger={
                <button className="cursor-pointer">
                  <i className="fa fa-user-o text-sm md:text-xl" />
                </button>
              }
            />
          )}
          <Search
            trigger={
              <button className="cursor-pointer">
                <i className="fa fa-search text-sm md:text-xl" />
              </button>
            }
          />
          <Cart
            navbarTrigger={
              <button className="relative cursor-pointer">
                {/* Cart Icon */}
                <i className="fa fa-shopping-cart text-sm md:text-xl"></i>

                {/* Badge */}
                {cartItems?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ec9b12] text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {cartItems?.length > 99 ? "99+" : cartItems?.length}
                  </span>
                )}
              </button>
            }
          />
        </div>
      </div>

      {/* Mobile menu slider */}

      <div
        className={`
    fixed p-4 w-[70%] font-jost left-0   bg-white z-40  h-[calc(100vh-60px)]
    overflow-y-auto hide-scrollbar
    transition-all duration-300 ease-out  lg:hidden
   block
    ${isSticky ? "top-[44px] sm:top-[64px] " : "top-[92px]  sm:top-[100px] "}
    ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
  `}
      >
        {/* MAIN MENU */}
        {!activeMobileMenu && (
          <ul>
            {NavData.map((item, index) => (
              <li
                key={index}
                className="p-4 border-b text-black uppercase flex justify-between cursor-pointer"
                onClick={() => {
                  const hasChildren = item.subCategory?.length > 0;

                  if (hasChildren) {
                    setActiveMobileMenu(item);
                  } else {
                    setIsMobileMenuOpen(false);
                    router.push(item.link);
                  }
                }}
              >
                <span className="font-jost text-[14px] leading-[20px]">
                  {item.title}
                </span>

                {item.subCategory && <span>→</span>}
              </li>
            ))}
          </ul>
        )}

        {/* SUB CATEGORY MENU — SAME DIV */}
        {activeMobileMenu && (
          <>
            <div
              className="p-4 border-b uppercase cursor-pointer font-medium"
              onClick={() => setActiveMobileMenu(null)}
            >
              <span>←</span>
              <span className="p-2 , font-jost text-[12px] leading-[20px] text-gray-500">
                {activeMobileMenu.title}
              </span>
            </div>

            <ul>
              {activeMobileMenu.subCategory?.map((sub, index) => (
                <li
                  key={index}
                  className="p-4 border-b font-jost  uppercase cursor-pointer text-[14px] leading-[20px]"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push(sub.link);
                  }}
                >
                  {sub.subCategoryTitle}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
