// This is states that will be accessible by router agent to decide to which agent user prompt is belong to.

// agents can only access states so we have to add user prompts in state file

import { Annotation } from  "@langchain/langgraph"

// Creating custom states

export const agentState = Annotation.Root({
    prompt:Annotation(),
    aiResponse:Annotation(),
    agent:Annotation(),
    conversationId:Annotation()
})