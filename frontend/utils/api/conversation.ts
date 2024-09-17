import { Conversation, ConversationFull, ConversationPOST, ConversationPUT } from "@/types/Conversation";

const backendUrl = "http://localhost:8000";

// Create New Conversation
export const addNewConversation = async (conversation: ConversationPOST) => {
    const res = await fetch(`${backendUrl}/conversations/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(conversation)
    })

    const conversationId = await res.json()
    return conversationId
}

// Get the list of ALL Conversation
export const getAllConversation = async () => {
    console.log(backendUrl)
    try {
        const res = await fetch(`${backendUrl}/conversations`)
        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`)
        }
        const allConversation = await res.json()
        console.log("CONVERSATIONS")
        console.log(allConversation)
        return allConversation
    } catch (error) {
        throw error;
    }
}

// Get conversation by Conversation Id
export const getSpecificConversation = async (id: string) => {
    const res = await fetch(`${backendUrl}/conversations/${id}`)
    const foundConversation = await res.json()

    return foundConversation
}

// Update conversation by Id
export const updateConversationbyId = async (conversation_id: string, update_data: ConversationPUT) => {
    const res = await fetch(`${backendUrl}/conversations/${conversation_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(update_data)
    })
    
}

// Delete conversation by Id
export const deleteConversationbyId = async (id: string) => {
    const res = await fetch(`${backendUrl}/conversations/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
