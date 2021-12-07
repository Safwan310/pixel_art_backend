import express from 'express'
import PixelSchema, { validatePixel } from '../models/pixels.js'

const router = express.Router()

//Add a pixel art
router.post('/', async (req, res) => {
  const error = await validatePixel(req.body)
  if (error.message) {
    res.status(400).send(error.message)
  }
  let pixelArt = new PixelSchema({
    imageTitle: req.body.imageTitle,
    imageURL: req.body.imageURL,
    imageDescription: req.body.imageDescription,
    artist: {
      name: req.body.artistName,
      age: req.body.artistAge,
    },
  })

  pixelArt
    .save()
    .then((pixel) => {
      res.send(pixel)
    })
    .catch((err) => {
      res.status(500)
    })
})

//Get all pixel arts
router.get('/', (req, res) => {
  PixelSchema.find()
    .then((pixel) => {
      res.send(pixel)
    })
    .catch((err) => {
      res.status(500).send("Can't fetch pixels")
    })
})
//Get a particular pixel art by id
router.get('/:id', async (req, res) => {
  const pixel = await PixelSchema.findById(req.params.id)

  if (pixel) {
    res.send(pixel)
  } else {
    res.status(404).send('Pixel not found')
  }
})

//Update pixel by id
router.put('/:id', async (req, res) => {
  const pixel = await PixelSchema.findByIdAndUpdate(
    req.params.id,
    {
      imageTitle: req.body.imageTitle,
      imageURL: req.body.imageURL,
      imageDescription: req.body.imageDescription,
      artist: {
        name: req.body.artistName,
        age: req.body.artistAge,
      },
    },
    {
      new: true,
    }
  )
  if (!pixel) {
    res.status(404).send('Pixel not found :(')
  } else {
    res.send(pixel)
  }
})

//Delete by ID
router.delete('/:id', async (req, res) => {
  const pixel = await PixelSchema.findByIdAndDelete(req.params.id)
  if (!pixel) {
    res.status(404).send('Pixel Not found')
  } else {
    res.send(`The deleted Pixel is: ${pixel.imageTitle}`)
  }
})
export default router
