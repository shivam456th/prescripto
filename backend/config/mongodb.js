import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/prescripto")
        console.log("Database connected successfully");
        
    } catch (error) {
        console.error(error.message)
    }
}

export default connectDB