import express from "express";
import PixelSchema,{ validatePixel } from "../models/pixels.js";

const router = express.Router();

router.post("/",async (req,res)=>{
    const error = await validatePixel(req.body);
    if(error.message){
        res.status(400).send(error.message);
    }
    let pixelArt = new PixelSchema({
        imageTitle:req.body.imageTitle,
        imageURL:req.body.imageURL,
        imageDescription:req.body.imageDescription,
        artist:{
            name:req.body.artistName,
            age:req.body.artistAge
        }
    });

    pixelArt.save().then((pixel)=>{
        res.send(pixel);
    }).catch((err)=>{
        res.status(500);
    })
})

export default router;