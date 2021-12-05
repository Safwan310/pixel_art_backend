import express from "express";
import PixelSchema from "../models/pixels.js";

const router = express.Router();

router.post("/",(req,res)=>{
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
        res.status(500).send("Art not uploaded");
    })
})

export default router;