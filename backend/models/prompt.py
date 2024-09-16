from pydantic import BaseModel
from enum import Enum

class QueryRoleType(str, Enum):
    """
    Chat roles for each individual message
    - system: Message is a system message
    - user: Message is a prompt from the user 
    - assistant: Message is a reply from the LLM model
    - function: Message is a function call message
    """
    system = "system"
    user = "user"
    assistant = "assistant"
    function = "function"

class Prompt(BaseModel):
    role: QueryRoleType
    content: str