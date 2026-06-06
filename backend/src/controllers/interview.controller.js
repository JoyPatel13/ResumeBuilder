const pdfParse = require('pdf-parse')
const generateInterviewReport = require('../services/ai.service')
const interviewReportModel = require('../models/inteviewReport.model')

async function generateInterviewReportController(req,res){
    
    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded"
        });
    }


    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
   const {selfDescription , jobDescription} = req.body

   
    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })
    console.log("AI Response:", JSON.stringify(interViewReportByAi, null, 2));


    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })
    
    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    })

}



module.exports = {generateInterviewReportController}