const express = require('express')

const authRouter = express.Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middleware/auth.middleware')

/**
 * @route POST api/auth/register
 */

authRouter.post('/register', authController.registerUser)

authRouter.post('/verify-mail', authController.verifyEmail)
/**
 * @route POST api/auth/login
 */

authRouter.post('/login', authController.loginUser)

/**
 * @route GET api/auth/logout
 */

authRouter.get('/logout', authController.logoutUser)

/**
 * @route GET api/auth/get-me
 */

authRouter.get('/get-me', authMiddleware.authUser, authController.getUser)

module.exports = authRouter