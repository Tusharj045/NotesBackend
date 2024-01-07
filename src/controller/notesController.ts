import { Request, Response } from 'express'
import { Note } from '../models/note'
import { User } from '../models/user'
import mongoose from 'mongoose'

export default class NotesController {
    testEndpoint(req: Request, res: Response) {
        res.status(200).send('TEST OK')
    }
    async getAllNotes(req: Request, res: Response) {
        // add zod validation
        try {
            const userId = req.headers['userId']
            const myNotes = await Note.find({ userId })
            const notesSharedWithMe = await User.findById(userId, { noteSharedWithMe: 1 }).populate('noteSharedWithMe')
            res.status(201).json({ myNotes, notesSharedWithMe: notesSharedWithMe?.noteSharedWithMe || [] })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
    async getNoteById(req: Request, res: Response) {
        const { id } = req.params
        // add zod validation
        try {
            const notes = await Note.findOne({ _id: id })
            res.status(201).json({ notes })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }

    async createNote(req: Request, res: Response) {
        const { title, body } = req.body
        // add zod validation
        try {
            const userId = req.headers['userId']
            const newNote = new Note({ title, body, userId })
            await newNote.save()
            res.status(201).json({ message: 'Note created successfully' })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
    async updateNote(req: Request, res: Response) {
        const { id } = req.params
        const { title, body } = req.body
        // add zod validation
        try {
            // const userId = req.headers['userId']
            const noteExists = await Note.findById(id)
            if (!noteExists) {
                return res.status(400).json({ message: "Note doesn't exist" })
            }
            await Note.updateOne({ _id: id }, { title, body })
            res.status(200).json({ message: 'Note updated successfully' })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
    async deleteNote(req: Request, res: Response) {
        const { id } = req.params
        // add zod validation
        try {
            // const userId = req.headers['userId']
            const noteExists = await Note.findById(id)
            if (!noteExists) {
                return res.status(400).json({ message: "Note doesn't exist" })
            }
            await Note.deleteOne({ _id: id })
            res.status(200).json({ message: 'Note deleted successfully' })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
    async shareNote(req: Request, res: Response) {
        const { id } = req.params
        const { username } = req.body
        // add zod validation
        try {
            const userId = req.headers['userId']
            const noteExists = await Note.find({ _id: id, userId })
            if (!noteExists) {
                return res.status(400).json({ message: "Note doesn't exist or is not owned by current User" })
            }
            const user = await User.findOne({ username })
            if (user) {
                const noteSharedWithMe = user.noteSharedWithMe || []
                noteSharedWithMe.push(new mongoose.Types.ObjectId(id))
                await User.updateOne({ _id: userId }, { noteSharedWithMe })
            }
            res.status(200).json({ message: 'Note deleted successfully' })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
}
