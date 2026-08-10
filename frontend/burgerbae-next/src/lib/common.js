export const mongoQueryBuilder = ({
  status,
  search,
  size,
  priceMin,
  priceMax,
  brands,
  category,
  tag,
  color,
  sortBy,
  sortOrder,
  alphabetOrder,
}) => {
  const query = {};
  const options = {
    collation: "",
    sort: {},
    populate: "",
    projection: "",
    lean: false,
    leanWithId: true,
    page: 1,
    limit: 9,
    pagination: true,
    useEstimatedCount: false,
    useCustomCountFn: false,
    forceCountFn: false,
    read: {},
    options: {},
  };

  /* PRICE FILTER */
  if (priceMin !== undefined || priceMax !== undefined) {
    query["price.cost"] = {};

    if (priceMin !== undefined) {
      query["price.cost"]["$gte"] = priceMin;
    }

    if (priceMax !== undefined) {
      query["price.cost"]["$lte"] = priceMax;
    }
  }

  /* BRAND FILTER */
  if (brands && brands.length) {
    query.brand = { $in: brands };
  }

  /* CATEGORY FILTER */
  if (category) {
    query.category = Array.isArray(category) ? { $in: category } : category;
  }

  /* SEARCH */
  if (search) {
    query.$or = [
      { "title.shortTitle": { $regex: search, $options: "i" } },
      { "title.longTitle": { $regex: search, $options: "i" } },
    ];
  }

  if (tag && tag.toLowerCase() !== "all") {
    const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Wrap both conditions in $and to avoid key collision
    query.$and = [
      ...(query.$and || []),
      { "title.longTitle": { $regex: escapedTag, $options: "i" } },
    ];
  }

  /* SORTING */
  if (alphabetOrder) {
    options.sort = { "title.longTitle": alphabetOrder === "asc" ? 1 : -1 };
  } else if (sortBy) {
    options.sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };
  }

  // color
  if (color && color.length > 0) {
    query.color = { $in: color };
  }

  // size
  if (size && size.length > 0) {
    query.size = { $in: size };
  }

  // status
 /* ✅ FIXED STATUS FILTER */
  if (status) {
    const statusMap = {
      "order confirmed": "orderConfirm",
      "shipped": "shipped",
      "out for delivery": "outForDelivery",
      "delivered": "delivered",
      "cancelled": "cancel",
      "returned": "refunded",
    };

    const statusKey = statusMap[status.toLowerCase()]; // input status is being converted into lowerCase and it is then matched with the keys of the statusMap object

    if (statusKey) {
      query.products = {
        $elemMatch: {
          [`orderStatus.${statusKey}.isConfirmed`]: true,
        },
      };
    }
  }

  return {
    query,
    options,
    isCountOnly: false,
  };
};
