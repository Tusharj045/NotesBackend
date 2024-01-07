import { Request, Response } from 'express'
import { Note } from '../models/note'
import { User } from '../models/user'

export default class MiscController {
    testEndpoint(req: Request, res: Response) {
        res.status(200).send('TEST OK')
    }
    async searchNotes(req: Request, res: Response) {
        const { q } = req.query
        try {
            const userId = req.headers['userId']
            const user = await User.findById(userId, { noteSharedWithMe: 1 })
            const myNotes = await Note.aggregate([
                {
                    $search: {
                        index: 'keySearch',
                        text: {
                            query: q,
                            path: {
                                wildcard: '*'
                            }
                        }
                    }
                }
            ])
            const notes = myNotes
                .filter((note) => {
                    return note.userId.toString() === userId || user?.noteSharedWithMe.includes(note._id)
                })
                .map((note) => {
                    return {
                        _id: note._id,
                        title: note.title,
                        body: note.body
                    }
                })
            res.status(201).json({ notes })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
}
