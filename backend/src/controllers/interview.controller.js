const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/inteviewReport.model')

async function generateInterviewReportController(req,res){
    const resumeFile = req.file

    const resumeContent = pdfParse(req.file.buffer)
   const {selfDescription , jobDescription} = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

}



module.exports = {generateInterviewReportController}