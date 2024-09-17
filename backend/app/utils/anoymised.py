# Extract entities from text
import os
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import Tuple, List, Optional
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

load_dotenv()

class Entities(BaseModel):
    """Identifying information about entities"""

    names: List[str] = Field(
        ...,
        description="All the person name, organization names, address, email address, or phone number entities that appear in the text."
    )


def anoymise_text(text:str) -> str:
    """
    Anyomise sensitive information in the text.
    
    A simple example that uses Large Language Model to extract the entities, and replace the according substring with <Anoymised> string.
    """
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
    new_prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are extracting all the person name, organization names, address, email address, or phone number entities that appear in the text."
            ),
            (
                "human",
                "Use the given format to extract information from the following input: {question}"
            )
        ]
    )

    entity_chain =  new_prompt | llm.with_structured_output(Entities)
    anoymise_entity = entity_chain.invoke(text).names
    # print(anoymise_entity)

    for entity in anoymise_entity:
        text = text.replace(entity, "<Anoymised>")

    # print(text)
    return text



# anoymise_text("Hi, pleas deliver it to my house: blk 123 abc Road.")

