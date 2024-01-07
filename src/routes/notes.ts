import express from 'express'
import Controller from '../controller/notesController'
import { authenticateJwt } from '../middleware/middleware'

const router = express.Router()

const controller = new Controller()

router.route('/test').get(controller.testEndpoint)
router.get('/', authenticateJwt, controller.getAllNotes)
router.get('/:id', authenticateJwt, controller.getNoteById)
router.post('/', authenticateJwt, controller.createNote)
router.put('/:id', authenticateJwt, controller.updateNote)
router.delete('/:id', authenticateJwt, controller.deleteNote)
router.post('/:id/share', authenticateJwt, controller.shareNote)

export default router
