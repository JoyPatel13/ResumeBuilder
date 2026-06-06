const express = requires('express');
const authMiddlewar = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interview.controller')

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description
 * , resume pdf and job description 
 * @access Private
 */

interviewRouter.post('/' , authMiddlewar.authUser , interviewController.generateInterviewReportController);


module.exports = interviewRouter