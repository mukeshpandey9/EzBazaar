const app = require("./app");
const dotenv = require("dotenv");
const mongoDB = require("./config/db");

const cloudinary = require("cloudinary");

// Config dotenv

dotenv.config({ path: "backend/config/.env" });

// Database
mongoDB();

// Cloudinary Config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
