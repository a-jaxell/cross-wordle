import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
export default async function databaseConnect(){
   await mongoose.connect(process.env.MONGODB_URI as string).catch((error)=> {
        console.log(error);
    });

}