import mongoose from 'mongoose'

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  age: {
    type: Number,
    min: 10,
  },
})

const ArtistSchema = mongoose.model('ArtistSchema', artistSchema)

export default ArtistSchema
