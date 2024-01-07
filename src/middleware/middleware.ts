import jwt from 'jsonwebtoken'
import { rateLimit } from 'express-rate-limit'
import dotenv from 'dotenv'
dotenv.config()

import { Response, Request, NextFunction } from 'express'
export const SECRET = process.env.SECRET_KEY || 'SECRET'

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            if (!user) {
                return res.sendStatus(403)
            }
            if (typeof user === 'string') {
                return res.sendStatus(403)
            }
            req.headers['userId'] = user.id
            next()
        })
    } else {
        res.sendStatus(401)
    }
}

export const rateLimitMiddleware = rateLimit({
    windowMs: 60 * 1000,
    limit: 20,
    message: 'You have exceeded your 20 requests per minute limit.',
    headers: true
})
