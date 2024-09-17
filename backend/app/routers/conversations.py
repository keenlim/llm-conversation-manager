from fastapi import APIRouter, HTTPException, status
from models.conversation import Conversation, ConversationFull
from typing import List, Dict
from pydantic import BaseModel, Field

router = APIRouter()

class ConversationPOST(BaseModel):
    """
    POST request for creating a new Chat
    """
    name: str = Field(description="Title of the conversation")
    params: Dict[str, str] = Field(description="Parameter dictionary for overriding defaults prescribed by the AI Model", default={})

class ConversationPUT(BaseModel):
    """
    PUT request for modifying a Chat
    """
    name: str = Field(description="Title of the conversation")
    params: Dict[str, str] = Field(description="Parameter dictionary for overriding defaults prescribed by the AI Model", default={})

# Create Conversation
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_conversation(convo_data: ConversationPOST):
    conversation = Conversation(
        name = convo_data.name,
        params = convo_data.params
    )

    conversation = await conversation.insert()
    return conversation

# Get ALL Conversations
@router.get("/", response_model=List[Conversation])
async def get_conversation():
    conversations = await Conversation.find_all().to_list()
    return conversations

# Get Specific Conversation by Id
@router.get("/{id}", response_model=ConversationFull)
async def get_conversation(id: str):
    conversation = await ConversationFull.get(id)
    if conversation is None:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation

# Update Conversation by Id
@router.put("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_conversation(id: str, update_data: ConversationPUT):
    print(update_data)
    # Find the conversation
    conversation = await Conversation.get(id)
    print(conversation)
    if conversation is None:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    if update_data.name is not None:
        conversation.name = update_data.name
    if update_data.params is not None:
        conversation.params = update_data.params
    
    await conversation.save()
    return {"message": "Conversation updated"}

# Delete Conversation by Id
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_conversation(id: str):
    conversation = await Conversation.get(id)
    if conversation is None:
        raise HTTPException(status_code=404, detail="Conversation is not found")
    
    await conversation.delete()
    return {"message": "Conversation deleted"}