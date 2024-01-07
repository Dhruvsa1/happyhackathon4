# openai_integration.py
import openai
from dotenv import load_dotenv
import os

load_dotenv()

# Configure your OpenAI key here
openai.api_key = os.getenv("OPENAI_API_KEY")


def botResponse(messages):
    try:
        response = openai.Completion.create(
            engine="davinci",
            prompt=messages_to_prompt(messages),
            max_tokens=150  # You can adjust this value
        )
        return {
            'role': 'assistant',
            'content': response.choices[0].text.strip()
        }
    except Exception as error:
        print("Error sending message to OpenAI:", error)
        raise


def messages_to_prompt(messages):
    return "\n".join([f"{m['role']}: {m['content']}" for m in messages])
