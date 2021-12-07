import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/art.js'
import winston from 'winston'

dotenv.config()

const app = express()

const port = process.env.PORT || 5000

//Middleware
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: 'exceptions.log',
    }),
  ],
})

//Routes
app.use('/api/art', router)

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => logger.info('Connected to MongoDB Atlas'))
  .catch((err) => logger.error(`Error at DB Connection ${err}`))

app.listen(port, () => {
  logger.info(`Listening on http://localhost:${port}`)
})
