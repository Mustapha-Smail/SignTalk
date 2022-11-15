// import modules 
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
// import error handlers 
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// import routes 
import dictionaryRoute from './routes/dictionaryRoute.js'
import alphabetRoute from './routes/alphabetRoute.js'
import userRoute from './routes/userRoute.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/dictionary', dictionaryRoute)
app.use('/api/alphabet', alphabetRoute)
app.use('/api/users', userRoute)

app.use(notFound)
app.use(errorHandler)


//export app for testing 
export default app 
