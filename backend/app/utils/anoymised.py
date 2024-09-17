# Extract entities from text
import os
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import Tuple, List, Optional
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
import re

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
                "You are only to extract all Sensitive Information such as Name, Phone Number and Email Address that appear in the text. Do not extract the entire sentence."
            ),
            (
                "human",
                "Use the given format to extract information from the following input: {question}"
            )
        ]
    )

    entity_chain =  new_prompt | llm.with_structured_output(Entities)
    anoymise_entity = entity_chain.invoke(text).names
    print(anoymise_entity)

    for entity in anoymise_entity:
        text = text.replace(entity, "<Anoymised>")

    # print(text)
    return text


def anonymize_text_using_reg(text):
    """
    Anonymizes sensitive information in the given text using regular expressions.
    
    Args:
        text (str): The input text to be anonymized.
        
    Returns:
        str: The anonymized text.
    """
    # Replace email addresses
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    text = re.sub(email_pattern, '[EMAIL]', text)
    
    # Replace phone numbers (e.g., (123) 456-7890, 123-456-7890, 1234567890)
    phone_pattern = r'\b(?:\+?(\d{1,3}))?[-.\s]?(\(?\d{3}\)?)[-.\s]?(\d{3})[-.\s]?(\d{4})\b'
    text = re.sub(phone_pattern, '[PHONE]', text)
    
    # Replace credit card numbers (e.g., 1234-5678-9012-3456)
    credit_card_pattern = r'\b(?:\d[ -]*?){13,16}\b'
    text = re.sub(credit_card_pattern, '[CREDIT_CARD]', text)
    
    # Replace Social Security Numbers (SSN) - US format (e.g., 123-45-6789)
    ssn_pattern = r'\b\d{3}-\d{2}-\d{4}\b'
    text = re.sub(ssn_pattern, '[SSN]', text)
    
    # Replace IP addresses
    ip_pattern = r'\b(?:\d{1,3}\.){3}\d{1,3}\b'
    text = re.sub(ip_pattern, '[IP_ADDRESS]', text)
    
    # Replace URLs
    url_pattern = r'https?://\S+|www\.\S+'
    text = re.sub(url_pattern, '[URL]', text)
    
    # Replace dates (e.g., 01/01/2020, January 1, 2020)
    date_pattern = r'\b(?:\d{1,2}[/-])?(?:\d{1,2}[/-])?\d{2,4}\b'
    text = re.sub(date_pattern, '[DATE]', text)
    
    # Replace names (This is more complex and may require NLP techniques.
    # Here's a simple example to replace capitalized words assuming they are names.)
    name_pattern = r'\b[A-Z][a-z]+\b'
    text = re.sub(name_pattern, '[NAME]', text)
    
    return text





# anoymise_text("Hi, pleas deliver it to my house: blk 123 abc Road.")

