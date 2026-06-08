const { GoogleGenAI } = require("@google/genai")
const puppeteer = require('puppeteer')
const {z} = require('zod');
const {zodToJsonSchema} = require('zod-to-json-schema');
const { getInterviewReportById } = require("../../../frontend/src/features/interview/services/interview.api");


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `Generate an interview report for a candidate with the following details:
        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                required: ["title", "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"],
                properties: {
                    title: { type: "string" },
                    matchScore: { type: "number" },
                    technicalQuestions: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                question: { type: "string" },
                                intention: { type: "string" },
                                answer: { type: "string" }
                            },
                            required: ["question", "intention", "answer"]
                        }
                    },
                    behavioralQuestions: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                question: { type: "string" },
                                intention: { type: "string" },
                                answer: { type: "string" }
                            },
                            required: ["question", "intention", "answer"]
                        }
                    },
                    skillGaps: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                skill: { type: "string" },
                                severity: { type: "string", enum: ["low", "medium", "high"] }
                            },
                            required: ["skill", "severity"]
                        }
                    },
                    preparationPlan: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                day: { type: "number" },
                                focus: { type: "string" },
                                tasks: { type: "array", items: { type: "string" } }
                            },
                            required: ["day", "focus", "tasks"]
                        }
                    }
                }
            }
        }
    })

    return JSON.parse(response.text)
}


async function generatePdfFromHtml(htmlContent  ) {
    const browser = await puppeteer.launch();
    const page  = await browser.newPage();
    await page.setContent(htmlContent,{waitUntil:"networkidle0"});
    const pdfBuffer = await page.pdf({format:"A4"});
    await browser.close();

    return pdfBuffer;
}


async function generateResumePdf({resume,selfDescription,jobDescription}) {
    const resumePdfSchema = z.object({
        html : z.string().describe("The Html content of the resume which can be converted to pdf using puppeteer")
    });
    const prompt  = `Generate resume for a candidate with following details:
                        Resume : ${resume}
                        Self Description : ${selfDescription}
                        Job Description : ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer

    `
    const response = await ai.models.generateContent({
        model:"gemini-3-flash-preview",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema : zodToJsonSchema(resumePdfSchema)
        }
    })
    const jsonContent =  JSON.parse(response.text)
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
    return pdfBuffer
}

module.exports = {generateInterviewReport , generateResumePdf}