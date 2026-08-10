import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

class AuthApi {
  async register(data) {
    try {
      const result = await axios.post(`${baseURL}/userapp/auth/register`, data);
      if (result.data.status === "SUCCESS") {
        return result?.data;
      } else {
        return result.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async login(data) {
    var result;
    try {
      result = await axios.post(`${baseURL}/userapp/auth/login`, data);
      console.log(result, "upper");

      if (result?.data?.status === "SUCCESS") {
        return result?.data;
      } else {
        console.log(result, "else");
        return result;
      }
    } catch (err) {
      return err.response?.data;
    }
  }

  async checkIfLoggedIn() {
    try {
      const token = localStorage.getItem("authToken");
      console.log("token", token);
      if (!token) return false;

      const result = await axios.get(`${baseURL}/userapp/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("result sent by CheckIfLoggedIN", result);
      if (result?.data?.status === "SUCCESS") {
        return result.data;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  async Update(id, data) {
    try {
      const token = localStorage.getItem("authToken");
      const result = await axios.put(
        `${baseURL}/userapp/user/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("result of update user api call", result);
      if (result?.status === 200) {
        return result?.data;
      } else {
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async sendForgotPasswordOTP(email) {
    try {
      const result = await axios.post(
        `${baseURL}/userapp/auth/reset-password-otp`,
        email,
      );
      if (result?.data?.status === "SUCCESS") {
        return result?.data;
      } else {
        console.log(result, "else");
        return result;
      }
    } catch (err) {
      return err.response?.data;
    }
  }

  async resetPassword(data) {
    try {
      const result = await axios.put(
        `${baseURL}/userapp/auth/reset-password`,
        data,
      );
      if (result?.data?.status === "SUCCESS") {
        return result?.data;
      } else {
        return result?.data;
      }
    } catch (err) {
      return err.response?.data;
    }
  }
}

export const authApi = new AuthApi();
