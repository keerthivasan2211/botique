const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Product = require("../Models/Product");   
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const OrderModel = require("../Models/Order");
const mongoose = require("mongoose");






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
  console.log("Received Order Data:", req.body);

  try {
    const { orderId, customerName, customerEmail, customerPhone, shippingAddress, items, totalAmount, paymentStatus, orderStatus } = req.body;

    if (!orderId || !customerName || !customerEmail || !customerPhone || !shippingAddress || !items || !totalAmount) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Convert productId to ObjectId
    const updatedItems = items.map((item) => ({
      ...item,
      productId: Number(item.productId), // ✅ Ensure it's a number
    }));

    const newOrder = new OrderModel({
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items: updatedItems, // ✅ Use updated items
      totalAmount,
      paymentStatus,
      orderStatus,
    });

    const savedOrder = await newOrder.save();
    console.log("Order Saved:", savedOrder);
    res.status(201).json({ message: "Order created successfully", order: savedOrder });

  } catch (error) {
    console.error("Error Saving Order:", error);
    res.status(500).json({ message: "Order creation failed", error: error.message });
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


