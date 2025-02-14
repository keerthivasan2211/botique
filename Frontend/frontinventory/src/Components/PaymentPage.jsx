import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import axios from "axios";

const TELEGRAM_BOT_TOKEN = "7846765291:AAGI3l_rWHxns8GDUa7E4HEJOPntGhq7eU";
const TELEGRAM_CHAT_ID = "1010637203";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Set default customer details if not available
  const customer = location.state?.customer || {
    name: "Sivasri",
    email: "siva@gmail.com",
    phone: "9751907490",
  };

  // Set default cart details if cart is empty
  const cartItems = location.state?.cartItems?.length
    ? location.state.cartItems
    : [{ name: "Sample Product", quantity: 1 }];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const paymentURL = `https://your-payment-gateway.com/pay?name=${encodeURIComponent(
    customer.name
  )}&email=${encodeURIComponent(customer.email)}&amount=100`;

  const handleCompleteOrder = async () => {
    setLoading(true);
    setMessage("");

    try {
      const cartDetails = cartItems
        .map((item) => `- ${item.name} (Qty: ${item.quantity})`)
        .join("\n");

      const telegramMessage = `🛒 *New Order Received*:\n\n👤 *Customer*: ${customer.name}\n✉️ *Email*: ${customer.email}\n📞 *Phone*: ${customer.phone}\n🛍 *Cart Items*:\n${cartDetails}`;

      const telegramURL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      await axios.post(telegramURL, {
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "Markdown",
      });

      setMessage("✅ Order details sent to Telegram!");
      setTimeout(() => navigate("/success"), 2000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Failed to send order details. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Payment Page</h1>

        <div className="mb-6">
          <h2 className="text-lg font-medium">Customer Details</h2>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
        </div>

        <div className="mb-6 text-left">
          <h2 className="text-lg font-medium">Cart Items</h2>
          <ul className="list-disc pl-5">
            {cartItems.map((item, index) => (
              <li key={index}>{item.name} (Qty: {item.quantity})</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">Scan the QR code to proceed with payment</p>
          <QRCodeCanvas value={paymentURL} size={200} />
        </div>

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          onClick={handleCompleteOrder}
          disabled={loading}
        >
          {loading ? "Processing..." : "Complete Order"}
        </button>

        {message && <p className="mt-4 text-red-500">{message}</p>}

        <p className="mt-4 text-blue-500">
          <a href={paymentURL} target="_blank" rel="noopener noreferrer">
            Click here if QR code is not working
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
