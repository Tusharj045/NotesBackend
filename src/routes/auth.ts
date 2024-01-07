import express from 'express'
import Controller from '../controller/authController'
const router = express.Router()

const controller = new Controller()

router.route('/test').get(controller.testEndpoint)
router.route('/signup').post(controller.signup)
router.route('/login').post(controller.login)

export default router
