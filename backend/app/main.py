from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine

from app.models.user import User
from app.models.meal import Meal
from app.models.water import WaterLog
from app.models.mood import MoodLog
from app.models.cycle import Cycle

from app.api.auth import router as auth_router
from app.api.meals import router as meals_router
from app.api.water import router as water_router
from app.api.mood import router as mood_router
from app.api.cycle import router as cycle_router


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Nutriki API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(meals_router)
app.include_router(water_router)
app.include_router(mood_router)
app.include_router(cycle_router)

@app.get("/")
def home():
    return {"message": "Welcome to Nutriki"}

