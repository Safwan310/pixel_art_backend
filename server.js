import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';


dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

mongoose.connect(
    process.env.MONGO_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    )
.then(()=>console.log("Connected to MongoDB Atlas"))
.catch((err)=>console.log(`Error at DB Connection ${err}`));

app.listen(port,()=>{
    console.log(`Listening on http://localhost:${port}`);
})