import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();




const connectDB = async () => {

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('DB Connected successfully');
    } catch (error) {
        console.log('An error occurred while connecting to DB!');
    }
};
export default connectDB;