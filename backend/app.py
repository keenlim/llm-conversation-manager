from fastapi import FastAPI
import motor.motor_asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from models.conversation import ConversationFull, Conversation
from contextlib import asynccontextmanager
from routers import conversations, queries


# Call this within your event loop to get beanie setup
async def init():
    # Create Motor Client
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    # Init beanie with the Conversation document class
    await init_beanie(database=client.conversation_db, document_models=[ConversationFull, Conversation])

@asynccontextmanager
async def lifespan(app:FastAPI):
    await init()
    print("Startup complete")
    yield
    print("Shutdown complete")

app = FastAPI(lifespan=lifespan)
app.include_router(conversations.router, prefix="/conversations")
app.include_router(queries.router, prefix="/queries")

@app.get("/")
def index() -> dict:
    return {"message": "Welcome to the app!"}

@app.get("/test-db")
async def test_db():
    try:
        client = motor.motor_asyncio.AsyncIOMotorClient("mongodb://localhost:27017")
        db_names = await client.list_database_names()
        return {"databases": db_names}
    except Exception as e:
        return {"error": str(e)}



