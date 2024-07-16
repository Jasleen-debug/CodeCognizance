// Database connection configuration
import mongoose from "mongoose";
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: '../.env' })

const DBConnection = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI

    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.log('Error while connecting to MongoDB: ', error.message);
    process.exit(1)
  }
}

export default DBConnection