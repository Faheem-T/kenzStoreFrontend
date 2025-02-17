import { orderApi } from "../api/orderApi";
import { store } from "../store";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

if (!RAZORPAY_KEY_ID)
  throw new Error(
    "VITE_RAZORPAY_KEY_ID is not defined. Please set it in your .env"
  );

function loadScript(src: string) {
  return new Promise((resolve) => {
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
}: {
  amount: number;
  id: string;
  currency: string;
  orderId?: string;
}) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razropay failed to load!!");
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
    // callback_url: "http://localhost:3001/api/v1/orders/verify",
    handler: async (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => {
      try {
        await store.dispatch(
          orderApi.endpoints.verifyPayment.initiate({ ...response, orderId })
        );
      } catch (error) {
        console.log(error);
      }
    },
    config: {
      display: {
        blocks: {
          utib: {
            //name for Axis block
            name: "Pay Using Axis Bank",
            instruments: [
              {
                method: "card",
                // issuers: ["UTIB"],
              },
              {
                method: "netbanking",
                // banks: ["UTIB"],
              },
            ],
          },
          other: {
            //  name for other block
            name: "Other Payment Methods",
            instruments: [
              {
                method: "card",
                // issuers: ["ICIC"],
              },
              {
                method: "netbanking",
              },
              {
                method: "upi",
                flows: ["qr"],
                apps: ["google_pay", "phonepe"],
              },
            ],
          },
        },
        // hide: [
        //   {
        //     method: "upi",
        //   },
        // ],
        sequence: ["block.utib", "block.other"],
        preferences: {
          show_default_blocks: false, // Should Checkout show its default blocks?
        },
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
  // paymentObject.on("payment.failed", function (response: any) {
  //   alert(response.error.code);
  //   alert(response.error.description);
  //   alert(response.error.source);
  //   alert(response.error.step);
  //   alert(response.error.reason);
  //   alert(response.error.metadata.order_id);
  //   alert(response.error.metadata.payment_id);
  // });
  paymentObject.open();
}
