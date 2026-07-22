// This router agent files that will decide which agent to be used accordingly user prompt.

import { getModel } from "../config/llmModels.js"

// router agent will use state.js file

// this router will return which agent will be used to graph.js 

export const router = async (state) => {
    const llm =  await getModel("router")

    const prompt = ` You are an agent router.

    Available agents:
    - chat
    - search
    - coding
    - pdf
    - ppt
    - vision

    Rules:
    chat:
    General conversation,
    explanations,
    learning,
    questions.

    search:
    Current events,
    latest information,
    news,
    recent developments,
    internet lookup.

    coding:
    Generate code,
    debug code,
    build projects,
    architecture,
    API design.

    pdf:
    questions about generate PDFs or document context.

    ppt:
    questions about generate PPTs or ppt context.

    vision:
    Generate image.

    Return ONLY one word:
    chat
    search
    coding
    pdf
    ppt
    vision

    User Query:
    ${state.prompt}
    
    `

    const response = await llm.invoke(prompt)
    console.log(response)

    return{
        ...state, // keep state as it is just change agent, means based on user query which agent best fits.
        agent:response.content
              .trim()
              .toLowerCase()
    }
}


