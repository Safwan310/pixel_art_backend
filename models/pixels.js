import mongoose from 'mongoose';
import ArtistSchema from './artist.js'

const pixelSchema = new mongoose.Schema({
    imageTitle:{
        type: String,
        required: true,
        minlength:3
    },
    imageURL:{
        type: String,
        required: true
    },
    imageDescription:{
        type: String,
        
    },
    artist:ArtistSchema.schema
})

const PixelSchema = mongoose.model("PixelSchema",pixelSchema);

export default PixelSchema;