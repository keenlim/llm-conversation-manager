from beanie import Document
from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from enum import Enum
from models.prompt import Prompt


class Conversation(Document):
    """
    Create the Chat Schema with messages
    """
    name: str
    params: Dict[str, str] = Field(description="Parameter dictionary for overriding defaults prescribed by the AI Model", default={}) # Custom parameters for LLM interactions
    tokens: int = Field(description = "Total number of tokens consumed in this chat", default = 0) # Track the total number of tokens used

    class Settings:
        name = "conversation"

class ConversationFull(Conversation):
    messages: List[Prompt] = Field(description="Chat messages to be included", default=[])