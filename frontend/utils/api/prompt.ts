import { Prompt } from "@/types/Prompt";

const backendUrl = "http://localhost:8000"

// Query Prompt
export const generateResponse = async (conversation_id: string, prompt: Prompt) => {
    const res = await fetch(`${backendUrl}/queries/${conversation_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prompt)
    })

    const results = await res.json()
    return results
}