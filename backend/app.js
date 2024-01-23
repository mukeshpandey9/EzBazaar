const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(cors());
// app.use(
//   cors({
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//     optionsSuccessStatus: 204, // Added to handle preflight OPTIONS requests
//     preflightContinue: false, // Added to handle preflight OPTIONS requests
//     allowedHeaders: ["Content-Type", "Authorization"], // Adjust allowed headers based on your needs
//   })
// );
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// process.env.FRONTEND_URL

// Routes

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/v1", productRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", paymentRoutes);
module.exports = app;
