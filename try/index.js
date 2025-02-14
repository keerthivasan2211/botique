
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: "duwnpxi4w",
    api_key: "596957249146999",
    api_secret: "bHn9UJtcTZWZMdiBHu7t1eQNmG8"
  });
  
  // Function to upload an image with a custom name
  const uploadImage = async (imagePath, customName) => {
    try {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "uploads", // Optional: specify a folder
        public_id: customName, // Custom name for the image
        overwrite: true, // Overwrite if the same name exists
      });
  
      console.log("Upload Successful!");
      console.log("Image URL:", result.secure_url);
      return result.secure_url;
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };
  
  // Ensure custom name is a string
  const imagePath = "D:\\boutique-store\\Blouse\\blouse9.jpg";
  const customName = "blouse9"; // Make sure this is a string

  uploadImage(imagePath, customName);
  
  // Call the function with the local image path and custom name
