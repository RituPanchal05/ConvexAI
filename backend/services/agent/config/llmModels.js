import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
})

const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
})

//this will basically tells, give me your agent name i will share model accordingly
export const getModel = async (agent) => {
    switch (agent) {
        case "chat":
            return groq;
        case "search":
            return groq;
        case "coding":
            return gemini;
        case "pdf":
            return groq;
        case "ppt":
            return groq;
        case "vision":
            return gemini;
        
        default:
            return groq;
    }
}