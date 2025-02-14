const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Product = require("../Models/Product");   
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const Order = require("../Models/Product");




// 🔹 Configure Cloudinary
cloudinary.config({ 
  cloud_name: "duwnpxi4w", 
  api_key: "596957249146999", 
  api_secret: "bHn9UJtcTZWZMdiBHu7t1eQNmG8" 
});

// 🔹 GET Request to Fetch Images from Cloudinary
router.get("/images", async (req, res) => {
    try {
      // Fetch resources from Cloudinary
      const result = await cloudinary.api.resources({
        type: "upload", // Fetch uploaded images
        max_results: 10  // Limit the number of results
      });
  
      // Extract Names & URLs
      const images = result.resources.map((img) => ({
        name: img.public_id.split("/").pop(), // Extract filename
        url: img.secure_url
      }));
  
      res.json({ images }); // Send response as JSON
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch images", details: error.message });
    }
  });
  



    router.post("/products", async (req, res) => {
        try {
        const { name, price, image, category } = req.body;
    
        if (!name || !price || !image || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }
    
        const product = new Product({ name, price, image, category });
    
        await product.save();
        res.status(201).json({ message: "Product created", product });
        } catch (error) {
        res.status(500).json({ error: "Failed to create product", details: error.message });
        }
    });


    router.get("/products", async (req, res) => {
        try {
          const products = await Product.find();
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch products", details: error.message });
        }
      });


    //   router.post("/order", async (req, res) => {
    //     try {
    //         const { productId, quantity } = req.body;
    
    //         if (!productId || quantity === undefined || quantity <= 0) {
    //             return res.status(400).json({ error: "Valid productId and quantity are required" });
    //         }
    
    //         // Find the product by productId
    //         const product = await Product.findOne({ productId });
    
    //         if (!product) {
    //             return res.status(404).json({ error: "Product not found" });
    //         }
    
    //         if (product.quantity < quantity) {
    //             return res.status(400).json({ error: "Not enough stock available" });
    //         }
    
    //         // Reduce quantity in the database
    //         product.quantity -= quantity;
    //         await product.save();
    
    //         res.status(200).json({
    //             message: "Order placed successfully!",
    //             productId: product.productId,
    //             remainingStock: product.quantity,
    //         });
    
    //     } catch (error) {
    //         res.status(500).json({ error: "Failed to place order", details: error.message });
    //     }
    // });

    router.post("/orders", async (req, res) => {
      try {

        const { name, email, phone, address, amount, items } = req.body;
        console.log(name, email, phone, address, amount, items )
        if (!name || !email || !phone || !address || !amount || !items.length) {
          return res.status(400).json({ success: false, message: "All fields are required." });
        }
    
        const newOrder = new Order({ name, email, phone, address, amount, items });
        await newOrder.save();
    
        res.status(201).json({ success: true, orderId: newOrder._id });
      } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    });


    router.post("/signup", async (req, res) => {
      try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
    
        await newUser.save();
        res.json({ message: "Signup successful!" });
      } catch (error) {
        res.status(400).json({ error: "Email already in use" });
      }
    });
    
    router.post("/google-signup", (req, res) => {
      const { name, email, uid } = req.body;
      console.log("Google User:", { name, email, uid });
      res.json({ message: "Google Sign-Up Successful" });
    });
    
      
    router.post("/api/update-stock", async (req, res) => {
      console.log("wdcmoi")
      try {
        const { cartItems } = req.body;
    
        if (!Array.isArray(cartItems)) {
          return res.status(400).json({ error: "Invalid data format. Expected an array of cart items." });
        }
    
        for (let item of cartItems) {
          const product = await Product.findOne({ productId: item.productId });
    
          if (!product) {
            return res.status(404).json({ error: `Product ${item.productId} not found!` });
          }
    
          if (product.quantity < item.quantity) {
            return res.status(400).json({ error: `Insufficient stock for ${product.name}!` });
          }
    
          await Product.updateOne(
            { productId: item.productId },
            { $inc: { quantity: -item.quantity } }
          );
        }
    
        res.status(200).json({ message: "Stock updated successfully!" });
      } catch (error) {
        console.error("Error updating stock:", error);
        res.status(500).json({ error: "Failed to update stock" });
      }
    });
    

    router.post("/send-message", async (req, res) => {
      const { chat_id, text } = req.body;
      const botToken = "YOUR_BOT_TOKEN";
    
      try {
        const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          chat_id,
          text,
        });
    
        res.json(response.data);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });



module.exports = router;


