
const pdfParse = require('pdf-parse')
const { generateInterviewReport, generateResumePdf } = require('../services/ai.service')
const interviewReportModel = require('../models/inteviewReport.model')

/** 
 * @description controller to generate interview report based on user self description,resume and job description
 * 
 * 
 * 
*/

async function generateInterviewReportController(req, res) {

    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }


        const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
        const { selfDescription, jobDescription } = req.body


        const interViewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })
        console.log("AI Response:", JSON.stringify(interViewReportByAi, null, 2));


        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        })
    } catch (err) {
        // Gemini overloaded / unavailable
        if (err.message?.includes('503') || err.message?.includes('UNAVAILABLE')) {
            return res.status(503).json({
                message: "AI service is currently busy. Please try again in a moment."
            });
        }

        // Gemini quota exceeded
        if (err.message?.includes('429') || err.message?.includes('RESOURCE_EXHAUSTED')) {
            return res.status(429).json({
                message: "AI quota exceeded. Please try again later."
            });
        }

        // Generic fallback
        res.status(500).json({
            message: "Failed to generate interview report. Please try again."
        });
    }

    }

    async function getInterviewReportByIdController(req, res) {
        const { interviewId } = req.params;
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found"
            })
        }

        res.status(200).json({
            message: "Interview report fetched successfully",
            interviewReport
        })
    }

    /**
     * @description Controlller to get all interview reports of logged in user
     */

    async function getAllInterviewController(req, res) {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    }

    /**
     * @description controller to generate resume PDF based on user self description , resume and job description
     * 
     */
    async function generateResumePdfController(req, res) {
        try {
            const { interviewReportId } = req.params;
            const interviewReport = await interviewReportModel.findById(interviewReportId)

            if (!interviewReport) {
                return res.status(404).json({
                    message: "Interview Report not found"
                })
            }

            const { resume, jobDescription, selfDescription } = interviewReport;
            const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription });

            res.set({
                "Content-Type": 'application/pdf',
                "Content-Disposition": `attachment; filename = resume_${interviewReportId}.pdf`
            })
            res.send(pdfBuffer);
        } catch (err) {
            res.status(500).json({
                message: err
            })
        }



    }

    module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewController, generateResumePdfController }