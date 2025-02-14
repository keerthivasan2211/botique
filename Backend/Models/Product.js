const mongoose = require("./db")

const ProductSchema = new mongoose.Schema({
  productId: { type: Number, unique: true, required: true }, // Custom Primary Key
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Store Base64, File Path, or Cloud URL
  category: { type: String, required: true },
  description: { type: String, required: true }, // Product Description
  quantity: { type: Number, required: true, min: 0 }, // Available Stock Quantity
});

module.exports = mongoose.model("Product", ProductSchema);


