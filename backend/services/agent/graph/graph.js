// This Graph.js will connect every agents(nodes) together

import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent";
import { codingAgent } from "../agents/coding.agent";
import { pdfAgent } from "../agents/pdf.agent";
import { pptAgent } from "../agents/ppt.agent";
import { visionAgent } from "../agents/vision.agent.js";

//connecting with agentstate
const workflow = new StateGraph(agentState)

// Adding nodes to workflow later on it will treated as Graph

workflow.addNode("router", router)
workflow.addNode("chat", chatAgent)
workflow.addNode("coding",codingAgent)
workflow.addNode("pdf",pdfAgent)
workflow.addNode("ppt",pptAgent)
workflow.addNode("vision",visionAgent)

//conncting nodes with other nodes

workflow.addEdge("__start__","router")
workflow.addConditionalEdges("router", (state) => {
    switch (state.agent) { // deciding which agent is choose by router for resonse
        case "chat":
            return "chat";
        case "search":
            return "search";
        case "coding":
            return "coding";
        case "pdf":
            return "pdf";
        case "ppt":
            return "ppt";
        case "vision":
            return "vision";
    
        default:
            return "chat"
    }
}, {
    chat:"chat", //mapping switch return values to actual agents
    search:"search",
    coding:"coding",
    pdf:"pdf",
    ppt:"ppt",
    vision:"vision"
})

workflow.addEdge("search","chat")
workflow.addEdge("chat","__end__")
workflow.addEdge("coding","__end__")
workflow.addEdge("pdf","__end__")
workflow.addEdge("ppt","__end__")
workflow.addEdge("vision","__end__")

// compiling workflow into graph

export const graph = workflow.compile()