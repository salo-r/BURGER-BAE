import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;


class OrderApi {
  async createOrder(data) {
    try {
      const token = localStorage.getItem("authToken");
      console.log("Creating order with data:", data);
      let result = await axios.post(`${baseURL}/userapp/order/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result?.data?.status === "SUCCESS") {
        console.log("Order created successfully!", result?.data);
        return result.data;
      } else {
        console.log("Failed to create order.", result);
      }
    } catch (err) {
      console.error("Error creating order:", err);
    }
  }

  async listOrder(  page, limit, query) {
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
      query: query || {},
      options: {
        ...defaultOptions,
        populate: "products.productId",
        page: page || 1,
        limit: limit || 10,
      },
      isCountOnly: false,
    };

    try {
      const token = localStorage.getItem("authToken");
      console.log("OrderList Api is called ............", requestPayload);
      let result = await axios.post(
        `${baseURL}/userapp/order/list`,
        requestPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (result?.data?.status === "SUCCESS") {
        console.log("Successfully ! , order list is retrieved....");
        console.log("order list is : ", result.data);
        return result?.data;
      } else {
        console.log("issue in fetching order data....");
      }
    } catch (err) {
      console.log(err.response?.data);
    }
  }

  async getCart(userId) {
    try {
      const token = localStorage.getItem("authToken");
      console.log("getCart Api is called ............");
      let result = await axios.get(`${baseURL}/userapp/cart/get/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result?.data?.status === "SUCCESS") {
        console.log("Successfully ! , cart is retrieved....");
        console.log("cart is : ", result.data);
        return result?.data;
      } else {
        console.log("issue in fetching cart data....");
      }
    } catch (err) {
      console.log(err.response?.data);
    }
  }

  async updateOrderStatus(orderId , data) {
    try {
      const token = localStorage.getItem("authToken");
      console.log("updateOrderStatus Api is called ............");
      let result = await axios.put(`${baseURL}/userapp/order/update/${orderId}`, data , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result?.data?.status === "SUCCESS") {
        console.log("Successfully ! , order status is updated....");
        console.log("order status is : ", result.data);
        return result?.data;
      } else {
        console.log("issue in updating order status....");
      }
    } catch (err) {
      console.log(err.response?.data);
    }
  }
}
export const OrderAPI = new OrderApi();
