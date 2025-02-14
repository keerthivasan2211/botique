const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: { type: Number, unique: true, required: true }, // Custom Primary Key
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Store Base64, File Path, or Cloud URL
  category: { type: String, required: true },
  description: { type: String, required: true }, // Product Description
  quantity: { type: Number, required: true, min: 0 }, // Available Stock Quantity
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  name: String,
  email: String,
  phone: String,
  address: String,
  amount: Number,
  items: [
    {
      productId: String,
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  status: { type: String, default: "Paid" },
  date: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Order", orderSchema);
module.exports = mongoose.model("Product", ProductSchema);


const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", UserSchema);
