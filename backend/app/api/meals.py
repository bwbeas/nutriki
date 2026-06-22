from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.meal import Meal
from app.schemas.meal import MealCreate
from app.core.auth import get_current_user

router = APIRouter(prefix="/meals", tags=["Meals"])


@router.post("/")
def create_meal(
    meal: MealCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    new_meal = Meal(
        user_id=current_user["user_id"],
        meal_type=meal.meal_type,
        food_name=meal.food_name,
        emoji=meal.emoji,
        fast_food=meal.fast_food,
        calories=meal.calories,
    )

    db.add(new_meal)
    db.commit()
    db.refresh(new_meal)

    return new_meal
@router.get("/")
def get_meals(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    meals = (
        db.query(Meal)
        .filter(
    Meal.user_id == current_user["user_id"]
)
        .order_by(Meal.created_at.desc())
        .all()
    )

    return meals