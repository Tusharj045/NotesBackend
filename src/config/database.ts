import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error)
        process.exit(1)
    }
}
