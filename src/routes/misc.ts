import express from 'express'
import Controller from '../controller/miscController'
import { authenticateJwt } from '../middleware/middleware'

const router = express.Router()

const controller = new Controller()

router.route('/test').get(controller.testEndpoint)
router.get('/search', authenticateJwt, controller.searchNotes)

export default router
