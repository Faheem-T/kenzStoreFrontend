import toast from "react-hot-toast";
import { orderApi } from "../api/orderApi";
import { store } from "../store";
import { NavigateFunction } from "react-router";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

if (!RAZORPAY_KEY_ID)
  throw new Error(
    "VITE_RAZORPAY_KEY_ID is not defined. Please set it in your .env"
  );

function loadScript(src: string) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      console.log("script already loaded");
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function displayRazorpay({
  amount,
  id,
  currency,
  orderId,
  navigate,
}: {
  amount: number;
  id: string;
  currency: string;
  orderId: string;
  navigate: NavigateFunction;
}) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    toast.error(
      "Falide to load Razorpay. Please check your internet connection."
    );
    return;
  }

  const options = {
    key: RAZORPAY_KEY_ID,
    amount,
    currency,
    name: "Kenz Store",
    description: "Test Transaction",
    //   image: "https://example.com/your_logo",
    order_id: id,

    handler: async (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => {
      try {
        await store.dispatch(
          orderApi.endpoints.verifyPayment.initiate({ ...response, orderId })
        );
        navigate("/order-confirmation", { state: { orderId, error: false } });
      } catch (error) {
        console.log(error);
      }
    },
    modal: {
      escape: false,
      ondismiss: function () {
        navigate("/order-confirmation", { state: { orderId, error: true } });
      },
    },
    // notes: {
    //   address: "Razorpay Corporate Office",
    // },
    // theme: {
    //   color: "#3399cc",
    // },
  };
  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.on("payment.failed", function (response: any) {
    console.error("Payment failed:", response);
    toast.error("Payment failed! Please try again.");

    // Show specific error details in the console for debugging
    console.table({
      "Error Code": response.error.code,
      Description: response.error.description,
      Source: response.error.source,
      Step: response.error.step,
      Reason: response.error.reason,
      "Order ID": response.error.metadata.order_id,
      "Payment ID": response.error.metadata.payment_id,
    });
  });

  paymentObject.open();
}
