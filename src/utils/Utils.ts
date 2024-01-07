import { createHash } from 'crypto'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const encyptPassword = (password: string): string => {
    return createHash('sha256').update(password).digest('hex')
}
export const getLoginToken = (id: mongoose.Types.ObjectId): string => {
    const token = jwt.sign(
        {
            id
        },
        process.env.SECRET_KEY || 'SECRET',
        { expiresIn: '48h' }
    )
    return token
}
