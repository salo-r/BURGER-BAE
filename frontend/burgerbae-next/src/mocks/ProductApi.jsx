import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

class ProductAPI {
  async getProductList(page, limit, filter) {
    const defaultOptions = {
      collation: "",
      sort: { name: 1 },
      populate: "",
      projection: "",
      lean: false,
      leanWithId: true,
      pagination: true,
      useEstimatedCount: false,
      useCustomCountFn: false,
      forceCountFn: false,
      read: {},
      options: {},
    };

    const requestPayload = {
      query: filter && filter.query ? filter.query : filter || {},
      options: {
        ...defaultOptions,
        ...(filter && filter.options ? filter.options : {}),
        page,
        limit,
      },
      isCountOnly: false,
    };

    try {
      console.log("ProductList Api is called ............", requestPayload);
      let result = await axios.post(
        `${baseURL}/userapp/product/list`,
        requestPayload,
      );
      if (result?.data?.status === "SUCCESS") {
        console.log("Successfully ! , product list is retrieved....");
        return result.data;
      } else {
        console.log("issue in fetching product data....");
      }
    } catch (err) {
      console.log(err.response?.data);
    }
  }

  async getProduct(id) {
    try {
      console.log("fetching single Product........");
      const result = await axios.get(`${baseURL}/userapp/product/get/${id}`);
      if (result?.data?.status === "SUCCESS") {
        console.log("Successfully ! , product is retrieved....");
        return result.data;
      } else {
        console.log("issue in fetching product data....");
      }
    } catch (err) {
      console.log(err.response?.data);
    }
  }
}

export const productApi = new ProductAPI();
