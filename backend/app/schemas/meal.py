from pydantic import BaseModel

class MealCreate(BaseModel):
    meal_type: str
    food_name: str
    emoji: str
    fast_food: bool
    calories: str | None = None