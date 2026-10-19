const express = require('express')
const interviewRouter = express.Router()
const interviewController = require('../controllers/interview.controller')
const authMiddleware = require('../middleware/auth.middleware')
const upload = require('../middleware/file.middleware')


/**
 * @route POST api/interview
 * @description Generate an interview report based on the provided resumePDF, self-description, and job description.
 * @access Private
 */

interviewRouter.post('/', authMiddleware.authUser, upload.single("resume") , interviewController.interview)

interviewRouter.get('/report/:interviewId', authMiddleware.authUser, interviewController.getReportById)

interviewRouter.get('/', authMiddleware.authUser, interviewController.getAllReportsByUser)

interviewRouter.post('/resume/pdf/:interviewId', authMiddleware.authUser, interviewController.generateResumePdfController)

module.exports = interviewRouter