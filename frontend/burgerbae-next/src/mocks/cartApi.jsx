import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

class cartApi {
  async cartList() {
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
      query: { isDeleted: false },
      options: {
        ...defaultOptions,
        populate: "products.productId",
      },
      isCountOnly: false,
    };

    try {
      const token = localStorage.getItem("authToken");
      console.log("CartList Api is called ............");
      let result = await axios.post(
        `${baseURL}/userapp/cart/list`,
        requestPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Cart list result from api", result);
      if (result?.data?.status === "SUCCESS") {
        console.log("Successfully ! , cart list is retrieved....");
        return result.data;
      } else {
        return result;
      }
    } catch (err) {
      console.log(err.response?.data);
    }
  }
  async addToCart(data) {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Adding to cart with data:", data);
      const result = await axios.post(`${baseURL}/userapp/cart/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.status === "SUCCESS") {
        return result?.data;
      } else {
        return result.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async removeFromCart(cartId) {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Removing cart item:", { cartId });
      const result = await axios.delete(
        `${baseURL}/userapp/cart/soft-delete/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (result.data.status === "SUCCESS") {
        return result?.data;
      } else {
        return result.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateCart(id, data) {
    try {
      const token = localStorage.getItem("authToken");
      const result = await axios.put(
        `${baseURL}/userapp/cart/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (result.data.status === "SUCCESS") {
        return result?.data;
      } else {
        return result.data;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
export const CartApi = new cartApi();
