const {GoogleGenAI} = require("@google/genai")
const {z} = require("zod");
const {zodToJsonSchema} = require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked during the interview"),
        intention:z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question in an interview , what points to cover , what approach to take , etc.")
    })).describe("The technical questions can be asked during the interview along with the intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
         question: z.string().describe("The behavioral question can be asked during the interview"),
        intention:z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question in an interview , what points to cover , what approach to take , etc.")

    })).describe("The behavioral questions can be asked during the interview along with the intention and how to answer them"),
    skillGaps : z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking based on the resume and job description"),
        severity: z.enum(["low","medium","high"]).describe("The severity of the skill gap"),
    })).describe("List of skill gaps in the candidate's profile based on the resume and job description along with the severity of the gap"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan starting from 1"),
        focus : z.string().describe("The main focus of the day in the preparation plan"),
        tasks: z.array(z.string()).describe("List of The tasks to be done on this day to follow the preparation plan")
    })).describe("A day-wise preparation plan for the candidate to prepare for the interview")
})

async function generateInterviewReport({resume, selfDescription , jobDescription}){
    
    const prompt = `Generate an interview report for a candidate based on the following information:
     Resume: ${resume}  
     Self Description: ${selfDescription}
     Job Description: ${jobDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-liteS",
        contents :prompt,
        config:{
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    })
    console.log(JSON.parse(response.text))
}

module.exports = generateInterviewReport
