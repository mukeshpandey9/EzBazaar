const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();

app.use((req, res, next) => {
  // Allow requests from the client domain (app.example.com)
  res.setHeader("Access-Control-Allow-Origin", "https://ez-bazaar.vercel.app");

  // Allow credentials (cookies) to be sent
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Specify allowed HTTP methods (e.g., GET, POST)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  // Optionally specify allowed headers (e.g., Authorization)
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");

  next();
});
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Routes

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
module.exports = app;
