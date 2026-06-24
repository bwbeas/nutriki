from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.db.dependencies import get_db
from app.core.auth import get_current_user

from app.models.meal import Meal
from app.models.water import WaterLog
from app.models.mood import MoodLog
from sqlalchemy import func

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

@router.get("/")
def get_analytics(
    week_offset: int = Query(0),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    today = datetime.now().date()

    current_week_start = (
      today -
      timedelta(days=today.weekday())
    )

    week_start = (
      current_week_start +
      timedelta(days=week_offset * 7)
    )

    week_end = (
      week_start +
      timedelta(days=6)
    )


    meal_count = (
        db.query(Meal)
        .filter(
          Meal.user_id ==
          current_user["user_id"]
        )
        .filter(
          Meal.created_at >= week_start
        )
        .filter(
          Meal.created_at <
          week_end + timedelta(days=1)
        )
        .count()
    )

    mood_count = (

       db.query(MoodLog)
       .filter(
          MoodLog.user_id ==
          current_user["user_id"]
        )
        .filter(
          MoodLog.created_at >= week_start
        )
        .filter(
          MoodLog.created_at <
          week_end + timedelta(days=1)
        )
        .count()
    )

    water_count = (

      db.query(

        func.sum(
            WaterLog.glasses
        )

      )

      .filter(

        WaterLog.user_id ==
        current_user["user_id"],

        WaterLog.log_date >= week_start,

        WaterLog.log_date <= week_end

      )

      .scalar()

      or 0

    )

    food_graph = (

       db.query(
         func.date(
            Meal.created_at
         ).label("day"),

         func.count(
            Meal.id
         ).label("count")
        )

        .filter(
          Meal.user_id ==
          current_user["user_id"]
        )

        .group_by(
          func.date(
            Meal.created_at
          )
        )
        .all()
        
    )
    food_chart_data = [
      {
        "day": row.day.strftime("%d"),
        "count": row.count
      }
      for row in food_graph
    ]

    water_graph = (

        db.query(

           WaterLog.log_date.label("day"),

           func.sum(
            WaterLog.glasses
           ).label("glasses")

        )

        .filter(
          WaterLog.user_id ==
          current_user["user_id"]
        )

        .group_by(
          WaterLog.log_date
        )

        .all()

    )
    water_chart_data = [

      {
        "day":
            row.day.strftime("%d"),

        "glasses":
            row.glasses
      }

      for row in water_graph

    ]
    mood_graph = (

      db.query(

        MoodLog.mood_emoji,

        func.count(
            MoodLog.id
        ).label("count")

      )

      .filter(
        MoodLog.user_id ==
        current_user["user_id"]
      )

      .group_by(
        MoodLog.mood_emoji
      )

      .all()

    )
    mood_chart_data = [

      {
        "mood":
            row.mood_emoji,

        "count":
            row.count
      }

      for row in mood_graph

    ]

    best_hydration = (

      db.query(

        WaterLog.log_date,

        func.sum(
            WaterLog.glasses
        ).label("total")

      )

      .filter(
        WaterLog.user_id ==
        current_user["user_id"]
      )

      .group_by(
        WaterLog.log_date
      )

      .order_by(
        func.sum(
            WaterLog.glasses
        ).desc()
      )

      .first()

    )

    best_food = (

      db.query(

        func.date(
            Meal.created_at
        ).label("day"),

        func.count(
            Meal.id
        ).label("total")

      )

      .filter(
        Meal.user_id ==
        current_user["user_id"]
      )

      .group_by(
        func.date(
            Meal.created_at
        )
      )

      .order_by(
        func.count(
            Meal.id
        ).desc()
      )

      .first()
    )
    most_common_mood = (

      db.query(

        MoodLog.mood_emoji,

        func.count(
            MoodLog.id
        ).label("total")

      )

      .filter(
        MoodLog.user_id ==
        current_user["user_id"]
      )

      .group_by(
        MoodLog.mood_emoji
      )

      .order_by(
        func.count(
            MoodLog.id
        ).desc()
      )

      .first()

    )



    return {
 
      "week_start":
        str(week_start),

      "week_end":
        str(week_end),

      "meal_count":
        meal_count,

      "water_count":
        water_count,

      "mood_count":
        mood_count,
      "food_chart_data":
        food_chart_data,

      "water_chart_data":
        water_chart_data,

      "mood_chart_data":
        mood_chart_data,

      "best_hydration_day":
         str(best_hydration.log_date)
         if best_hydration
         else None,

      "best_food_day":
          str(best_food.day)
          if best_food
          else None,

      "most_common_mood":
          most_common_mood.mood_emoji
          if most_common_mood
          else None,
    }
