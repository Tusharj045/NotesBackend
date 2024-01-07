import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import authRoutes from './routes/auth'
import notesRoutes from './routes/notes'
import miscRoutes from './routes/misc'

import { rateLimitMiddleware } from './middleware/middleware'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(rateLimitMiddleware)

app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)
app.use('/api', miscRoutes)

// for all other routes, return 404
app.use((req, res, next) => {
    res.status(404).send({ message: 'Allo! Catch-all route.' })
    next()
})

export default app
