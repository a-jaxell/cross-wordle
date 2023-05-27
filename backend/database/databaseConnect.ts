import mongoose from "mongoose";

export default async function databaseConnect(){
   await mongoose.connect(process.env.MONGODB_URI as string).catch((error)=> {
        console.log(error);
    });

}