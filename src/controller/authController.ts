import { Request, Response } from 'express'
import { encyptPassword, getLoginToken } from '../utils/Utils'
import { User } from '../models/user'
import { userSignupInput, userLoginInput } from '../schema/schema'

export default class AuthController {
    testEndpoint(req: Request, res: Response) {
        res.status(200).send('TEST OK')
    }

    async signup(req: Request, res: Response) {
        const parsedInput = userSignupInput.safeParse(req.body)
        try {
            if (!parsedInput.success) {
                return res.status(411).json({
                    msg: parsedInput.error
                })
            }
            const { name, username, password } = parsedInput.data
            const userExists = await User.findOne({ username })
            if (userExists) {
                return res.status(400).json({ message: 'User already exists' })
            }
            const newUser = new User({ name, username, password: encyptPassword(password) })
            await newUser.save()
            const token = getLoginToken(newUser._id)
            res.status(201).json({ message: 'User created successfully', token })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }

    async login(req: Request, res: Response) {
        const parsedInput = userLoginInput.safeParse(req.body)
        try {
            if (!parsedInput.success) {
                return res.status(411).json({
                    msg: parsedInput.error
                })
            }
            const { username, password } = parsedInput.data
            const userExists = await User.findOne({ username, password: encyptPassword(password) })
            if (userExists) {
                const token = getLoginToken(userExists._id)
                return res.status(200).json({ message: 'Logged in successfully', token })
            } else {
                res.status(400).json({ message: "User doesn't exist" })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
}
