import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.use(cors());
dotenv.config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB ");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB connection lost");
});

//middleware
app.use(cookieParser());
app.use(express.json()); //to allow sending req with json body

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/hotels", hotelsRoute);
app.use("/api/v1/rooms", roomsRoute);

app.use((err, req, res, next) => {
  //custom error handling middleware
  const errStatus = err.status || 500;
  const errMessage = err.message || "something wrong with api request!";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connectToDb();
  console.log("server running 0n 8800");
});
