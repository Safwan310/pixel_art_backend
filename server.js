import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import router from "./routes/art.js"

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

//Routes
app.use('/api/art',router);

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