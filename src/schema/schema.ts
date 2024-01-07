import { z } from 'zod'

export const userSignupInput = z.object({
    name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
    username: z.string().min(2, { message: 'Must be 2 or more characters long' }),
    password: z.string().min(2, { message: 'Must be 8 or more characters long' })
})

export const userLoginInput = z.object({
    username: z.string().min(2, { message: 'Must be 2 or more characters long' }),
    password: z.string().min(2, { message: 'Must be 8 or more characters long' })
})
