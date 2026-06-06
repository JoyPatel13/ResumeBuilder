const {GoogleGenAI} = require("@google/genai")

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY
});


async function invokeGeminiAi(){
    console.log("API Key:", process.env.GOOGLE_GENAI_API_KEY?.slice(0, 10));
    const response = await ai.models.generateContent({
       model : "gemini-2.5-flash-lite", 
       contents : "Hello gemini ! Explain what is interview?"

    })
    console.log(response.text);
}

module.exports = invokeGeminiAi
