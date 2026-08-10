import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

class paymentApi {
    async createPayment(data) {
        try {
            const token = localStorage.getItem("authToken");

            let result = await axios.post(`${baseURL}/userapp/payment/create`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(result?.data?.status === "SUCCESS") {
                console.log("Payment created successfully!", result);
                return result.data;
            }
            else {
                console.log("Failed to create payment.", result);
                throw new Error(result?.data?.message || "Payment creation failed");
            }
            
        } catch (err) {
            console.log("Error creating payment:", err);
        }
    }

    async razorPayPayment(data) {
        try {

            console.log("data being sent in the razorpay api", data);
            const token = localStorage.getItem("authToken");

            let result = await axios.post(`${baseURL}/userapp/payment/razorpay/create`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(result?.data?.status === "SUCCESS") {
                console.log("Razorpay payment successfully!", result);
                return result.data;
            }
            else {
                console.log("Failed to create Razorpay payment.", result);
                throw new Error(result?.data?.message || "Razorpay payment creation failed");
            }
            
        } catch (err) {
            console.log("Error creating Razorpay payment:", err);
        }
    }

    async verifyRazorPay(data) {
        try {
            const token = localStorage.getItem("authToken");

            let result = await axios.post(`${baseURL}/userapp/payment/razorpay/verify`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if(result?.data?.status === "SUCCESS") {
                console.log("Razorpay payment verified successfully!", result);
                return result.data;
            }
            else {
                console.log("Failed to verify Razorpay payment.", result);
                throw new Error(result?.data?.message || "Razorpay payment verification failed");
            }
            
        } catch (err) {
            console.log("Error verifying Razorpay payment:", err);
        }
    }
}
export const PaymentAPI = new paymentApi();
