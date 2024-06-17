import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import userRouter from './api/routes/user.route.js';
import userRouter from "./api/routes/user.route.js";
import authRouter from "./api/routes/auth.route.js";
import listingRouter from "./api/routes/listing.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

let Port = process.env.PORT || 4000;
// import path from "path";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.listen(Port, () => {
  console.log("Server is running on port ", `${Port}`);
});
app.get("/", (req, res) => {
  try {
    return res.send("<h1>Server IS Listning!</h1>");
  } catch (error) {
    console.log("error Something Went Wrong!");
    return res
      .status(500)
      .json({ message: "Something Went Wrong!", error: error.message });
  }
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
