"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { NavData } from "@/constants/navConstant";
import HoodieCard from "@/components/shared/HoodieCard";
import { CPagination } from "@/components/shared/pagination";
import Filter from "@/components/shared/filter";
import { useDispatch, useSelector } from "react-redux";
import { getProductList, clearProductList } from "@/redux/slices/Product";
import { mongoQueryBuilder } from "@/lib/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Collection = ({
  initialProducts = [],
  category,
}) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([100, 2000]);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [color, setcolor] = useState([]);
  const [size, setSize] = useState([]);
  // const [priceFilter, setPriceFilter] = useState({ min: 100, max: 2000 });
  const [alphabetOrder, setAlphabetOrder] = useState(null);
  const [sortOption, setSortOption] = useState("FEATURED");

  // Collect data from the store
  const reduxProducts = useSelector(
    (state) => state.product.products
  );

  const paginator = useSelector(
    (state) => state.product.paginator
  );

  // Use SSR products initially, Redux after filtering/pagination
  const products =
    reduxProducts?.length > 0
      ? reduxProducts
      : initialProducts;

  const totalPages = paginator?.pageCount || 1;
  const currentProducts = products;

  // normalize URL value and search term
  const routeCategory = category
    ? category.toLowerCase()
    : "all";

  const categoryName = routeCategory.replaceAll(
    "-",
    " "
  );

  const knownCategorySlugs = React.useMemo(() => {
    const set = new Set(["all"]);

    const addSlug = (link) => {
      if (!link || typeof link !== "string")
        return;

      const part = link
        .replace(/^(\/collections\/)?/, "")
        .toLowerCase();

      if (part) set.add(part);
    };

    NavData.forEach((item) => {
      addSlug(item.link);

      if (item.category) {
        set.add(item.category.toLowerCase());
      }

      item.subCategory?.forEach((sub) => {
        addSlug(sub.link);

        if (sub.category) {
          set.add(sub.category.toLowerCase());
        }

        sub["sub-subCateogry"]?.forEach(
          (child) => {
            addSlug(child.link);

            if (child.category) {
              set.add(
                child.category.toLowerCase()
              );
            }
          }
        );
      });
    });

    return set;
  }, []);

  const isKnownCategory =
    knownCategorySlugs.has(routeCategory);

  const categoryFilter =
    isKnownCategory &&
    routeCategory !== "all"
      ? routeCategory
          .split("-")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() +
              word.slice(1)
          )
          .join("-")
      : null;

  const searchTerm =
    routeCategory === "all"
      ? null
      : isKnownCategory
      ? null
      : categoryName;

  // filter products based on URL
  const filteredProducts = products;

  // ✅ Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, price, color, size, sortOption]);

  useEffect(() => {
    // Skip first fetch if SSR products already exist
    if (
      currentPage === 1 &&
      initialProducts?.length > 0 &&
      price[0] === 100 &&
      price[1] === 2000 &&
      color.length === 0 &&
      size.length === 0 &&
      sortOption === "FEATURED"
    ) {
      return;
    }

    // if category is known, category filter; else treat route as search query
    const filter = categoryFilter;

    let sortBy = null;
    let sortOrder = null;
    let alphabet = null;

    switch (sortOption) {
      case "ALPHABETICALLY_AZ":
        alphabet = "asc";
        break;

      case "ALPHABETICALLY_ZA":
        alphabet = "desc";
        break;

      case "PRICE_LOW_TO_HIGH":
        sortBy = "price.cost";
        sortOrder = "asc";
        break;

      case "PRICE_HIGH_TO_LOW":
        sortBy = "price.cost";
        sortOrder = "desc";
        break;

      case "DATE_OLD_TO_NEW":
        sortBy = "createdAt";
        sortOrder = "asc";
        break;

      case "DATE_NEW_TO_OLD":
        sortBy = "createdAt";
        sortOrder = "desc";
        break;

      default:
        break;
    }

    const { query, options } =
      mongoQueryBuilder({
        priceMin: price[0],
        priceMax: price[1],
        brands: null,
        category: filter,
        color:
          color.length > 0 ? color : null,
        search: searchTerm,
        tag: null,
        sortBy,
        sortOrder,
        size: size.length > 0 ? size : null,
        alphabetOrder: alphabet,
      });

    dispatch(clearProductList());

    console.log(
      `calling api from ${routeCategory} collection with the query`,
      query,
      options
    );

    console.log("colors selected", color);

    dispatch(
      getProductList(currentPage, 4, {
        query,
        options,
      })
    );
  }, [
    category,
    currentPage,
    price,
    color,
    size,
    sortOption,
  ]);

  return (
    <>
      <div className="relative py-10 px-5 sm:top-11 sm:px-10 sm:py-14">
        <div className="relative top-10">
          <Link
            className="font-jost font-medium text-[12px] text-black underline p-1"
            href="/"
          >
            Home
          </Link>

          <span className="text-gray-400">
            /
          </span>

          <Link
            className="font-jost text-[12px] font-medium text-black underline p-1"
            href={"/collections/all"}
          >
            Shop
          </Link>

          <span className="text-gray-400">
            /
          </span>

          <a
            className="font-jost font-medium text-[12px] text-black p-2"
            href="#"
          >
            {categoryName}
          </a>
        </div>

        {/* Page heading */}
        <div className="m-14 p-8">
          <h1 className="text-center text-2xl sm:text-6xl font-bold uppercase">
            {categoryName}
          </h1>
        </div>

        <div className="m-5 mx-0 flex justify-between">
          <Filter
            color={color}
            setcolor={setcolor}
            appliedFilters={appliedFilters}
            setAppliedFilters={
              setAppliedFilters
            }
            price={price}
            size={size}
            setSize={setSize}
            setPrice={setPrice}
            ProductCount={
              currentProducts.length
            }
            alphabetOrder={alphabetOrder}
            setAlphabetOrder={
              setAlphabetOrder
            }
            sortOption={sortOption}
            setSortOption={setSortOption}
            trigger={
              <div className="flex gap-2 items-center">
            <span className="relative w-[30px] h-[30px] block">
  <Image
    src="https://www.shutterstock.com/image-vector/filter-icon-glyph-solid-black-260nw-1911680962.jpg"
    alt="filter icon"
    fill
    className="object-fill"
  />
</span>

                <span className="font-jost text-[10px] leading-[14px] font-semibold sm:text-[14px] sm:leading-[17px]">
                  FILTER AND SORT
                </span>
              </div>
            }
          />

          <div className="flex gap-10">
            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value)
              }
              className="font-jost font-semibold text-[10px] sm:text-[14px] sm:leading-[17px]"
              name="featured"
              id="feature"
            >
              <option value="FEATURED">
                FEATURED
              </option>

              <option value="BEST_SELLING">
                BEST SELLING
              </option>

              <option value="ALPHABETICALLY_AZ">
                ALPHABETICALLY, A-Z
              </option>

              <option value="ALPHABETICALLY_ZA">
                ALPHABETICALLY, Z-A
              </option>

              <option value="PRICE_LOW_TO_HIGH">
                PRICE, LOW TO HIGH
              </option>

              <option value="PRICE_HIGH_TO_LOW">
                PRICE, HIGH TO LOW
              </option>

              <option value="DATE_OLD_TO_NEW">
                DATE, OLD TO NEW
              </option>

              <option value="DATE_NEW_TO_OLD">
                DATE, NEW TO OLD
              </option>
            </select>

            <p className="hidden sm:block font-jost text-[14px] leading-[17px] pt-2 font-semibold">
              {currentProducts.length} Product
            </p>
          </div>
        </div>

        {Object.keys(appliedFilters).length >
          0 && (
          <div className="flex gap-2 items-center p-2 font-jost">
            <span className="text-black text-sm">
              Applied Filters:
            </span>

            {Object.entries(
              appliedFilters
            ).map(
              ([filterKey, filterLabel]) => (
                <span
                  key={filterKey}
                  className="text-black border border-black p-2 text-sm"
                >
                  {filterLabel}{" "}
                  <button
                    className="ml-1"
                    onClick={() => {
                      setAppliedFilters(
                        (prev) => {
                          const newFilters = {
                            ...prev,
                          };

                          delete newFilters[
                            filterKey
                          ];

                          return newFilters;
                        }
                      );

                      if (
                        filterKey === "color"
                      ) {
                        setcolor([]);
                      }

                      if (
                        filterKey === "price"
                      ) {
                        setPrice([
                          100,
                          2000,
                        ]);
                      }

                      if (
                        filterKey === "size"
                      ) {
                        setSize([]);
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      className="text-xs"
                      icon={faXmark}
                    />
                  </button>
                </span>
              )
            )}
          </div>
        )}

        {/* Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-3">
            {currentProducts.map((item) => (
              <HoodieCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No products found.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 &&
        filteredProducts.length > 0 ? (
          <div className="my-4 mb-52">
            <CPagination
              currentPage={currentPage}
              setCurrentPage={
                setCurrentPage
              }
              totalPages={totalPages}
            />
          </div>
        ) : (
          <div className="h-[80px] w-full"></div>
        )}
      </div>
    </>
  );
};

export default Collection;