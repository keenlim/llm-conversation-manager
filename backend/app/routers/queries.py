import os
import openai
from openai import OpenAI
from fastapi import APIRouter, HTTPException, status
from models.prompt import Prompt, QueryRoleType
from models.conversation import ConversationFull
from dotenv import load_dotenv
from utils.anoymised import anoymise_text, anonymize_text_using_reg

router = APIRouter()

# Load environment variables
load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

# OpenAI
client = OpenAI()

# Create Prompt
@router.post("/{conversation_id}", status_code=status.HTTP_201_CREATED)
async def create_prompt(conversation_id: str, prompt: Prompt):
    # Get conversation based on the Conversation id
    conversation = await ConversationFull.get(conversation_id)
    print(conversation)
    if conversation is None:
        raise HTTPException(status_code=404, detail="Conversation is not found")
    
    # Anoymised the prompt content (Remove and sensitive information)
    anoymised_content = anonymize_text_using_reg(prompt.content)
    user_prompt = Prompt(role = prompt.role, content = anoymised_content)
    # Append the message into the messages list 
    conversation.messages.append(user_prompt)

    # Get the list of conversation --> Conversation history for LLM
    prompt_history = [{"role": msg.role, "content": msg.content} for msg in conversation.messages]

    try : 
        stream = client.chat.completions.create(
            model = "gpt-4o-mini",
            messages = prompt_history,
            **conversation.params
        )
    except openai.OpenAIError as e:
        raise HTTPException(status_code=422, detail=f"Error: {str(e)}")
    
    # Get the assistant response
    assistant_content = stream.choices[0].message.content

    # Anoymised the response
    anoymised_assistant = anonymize_text_using_reg(assistant_content)
    assistant_prompt = Prompt(role=QueryRoleType.assistant, content=assistant_content)
    # Append it to conversation
    conversation.messages.append(assistant_prompt)

    # Update the token count 
    total_tokens = stream.usage.total_tokens
    conversation.tokens += total_tokens

    # Save the updated conversation
    await conversation.save()

    # Return original user_prompt and assistant_content before anoymised
    return {
        "query": user_prompt, 
        "response": assistant_content
    }