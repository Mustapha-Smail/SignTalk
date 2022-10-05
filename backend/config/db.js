//TODO DB SETUP
import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(`Error: ${err.message}`)
        process.exit(1)
    }
}

const disconnectDB = () => { return mongoose.disconnect(); }

export default connectDB
export { disconnectDB } 