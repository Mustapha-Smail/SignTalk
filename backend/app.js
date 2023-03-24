// import modules 
import dotenv from 'dotenv'
import path from 'path'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
// import error handlers 
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// import routes 
import dictionaryRoute from './routes/dictionaryRoute.js'
import alphabetRoute from './routes/alphabetRoute.js'
import userRoute from './routes/userRoute.js'
import historyRoute from './routes/historyRoute.js'
import callsRoute from './routes/callsRoute.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/dictionary', dictionaryRoute)
app.use('/api/alphabet', alphabetRoute)
app.use('/api/users', userRoute)
app.use('/api/history', historyRoute)
app.use('/api/calls', callsRoute)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}

app.use(notFound)
app.use(errorHandler)


//export app for testing 
export default app 
