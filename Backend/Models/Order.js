const mongoose = require("./db");

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    items: [
      {
        productId: {type: Number, ref: "Product", required: true },
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    orderStatus: { type: String, enum: ["Processing", "Shipped", "Delivered", "Cancelled"], default: "Processing" },
  },
  { timestamps: true }
);

// Ensure the model is correctly defined
const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel; // ✅ Export OrderModel properly
