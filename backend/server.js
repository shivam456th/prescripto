import express from "express";
import cors from "cors";
import "dotenv/config.js";
import connectDB from "./config/mongodb.js";
import connectionCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectionCloudinary()

// middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/admin', adminRouter);
//localhost: 4000/api/admin

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log("Server Started on port", port);
})

//dd