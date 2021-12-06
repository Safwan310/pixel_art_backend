import mongoose from 'mongoose';
import ArtistSchema from './artist.js'
import yup from 'yup';

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

const validatePixel = pixelArt =>{
    const schema = yup.object().shape({
        imageTitle:yup.string().required().min(3,"Image title should be larger than 3 characters"),
        imageURL:yup.string().required(),
        imageDescription:yup.string(),
        artistName:yup.string().required().min(3,"Artist name must be greater than 3 characters"),
        artistAge:yup.number().min(10,"Artist age must be greater than 10")
    });

    return schema
    .validate(pixelArt)
    .then(pixelArt=>pixelArt)
    .catch(err=>{
        return{
            message: err.errors[0]
        }
    });
}

const PixelSchema = mongoose.model("PixelSchema",pixelSchema);

export { validatePixel };
export default PixelSchema;