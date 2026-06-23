from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from app.db.dependencies import get_db
from app.core.auth import get_current_user
from app.models.meal import Meal
from app.models.mood import MoodLog
from app.models.water import WaterLog
from app.models.cycle import Cycle

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    latest_mood = (

        db.query(MoodLog)

        .filter(
            MoodLog.user_id ==
            current_user["user_id"]
        )

        .order_by(
            MoodLog.created_at.desc()
        )

        .first()

    )

    mood_message = ""

    if latest_mood:

        if latest_mood.mood_emoji == "😖":

            mood_message = (
                "🫂 things seem a little heavy right now. "
                "if you haven't eaten or had water recently, "
                "consider taking a small break and caring for yourself. "
                "your favourite comfort food, a warm drink, "
                "or some rest might help today. 🌷"
            )

        elif latest_mood.mood_emoji == "🙁":

            mood_message = (
                "🌸 it's okay to have difficult days. "
                "try not to put too much pressure on yourself today. "
                "a nourishing meal, hydration and some extra rest "
                "can go a long way."
            )

        elif latest_mood.mood_emoji == "😐":

            mood_message = (
                "🌱 today may feel quieter than usual. "
                "small steps are still progress. "
                "perhaps this is a good moment to focus on "
                "one simple goal."
            )

        elif latest_mood.mood_emoji == "☺️":

            mood_message = (
                "✨ it's lovely to see you feeling a little brighter. "
                "have you been feeling more energetic lately? "
                "this could be a wonderful day to work on "
                "a goal you've been putting off. 🌷"
            )

        elif latest_mood.mood_emoji == "😁":

            mood_message = (
                "🌞 you seem to be doing well today! "
                "i hope you achieve all the goals you've set for yourself. "
                "don't forget to take care of yourself "
                "even on the good days. 💝"
            )

    latest_meal = (

        db.query(Meal)

        .filter(
            Meal.user_id ==
            current_user["user_id"]
        )

        .order_by(
            Meal.created_at.desc()
        )

        .first()

    )

    food_reminder = False

    if latest_meal:

        hours_since_food = (

            datetime.now(
                latest_meal.created_at.tzinfo
            )

            -

            latest_meal.created_at

        ).total_seconds() / 3600

        if hours_since_food >= 8:

            food_reminder = True
        
    
    today = datetime.now().date()

    today_water = (

        db.query(WaterLog)

    .filter(
        WaterLog.user_id ==
        current_user["user_id"],

        WaterLog.log_date == today
    )

    .first()

    )

    water_glasses = 0

    if today_water:

        water_glasses = today_water.glasses 
    
    cycle = (
        db.query(Cycle)
        .filter(
          Cycle.user_id ==
          current_user["user_id"]
        )
        .first()
    )
    cycle_data = None
    if cycle and not cycle.hysterectomy:
        cycle_day = (

                 datetime.now(
                   cycle.period_start.tzinfo
                 ) 
                 - cycle.period_start

        ).days + 1

        if cycle_day <= 5:
            phase = "🩸menstrual phase🩸"
            phase_message = (
            "your body is working hard right now. "
            "it's okay if you feel more tired than usual. "
            "allow yourself extra rest and kindness today."
            )
            phase_food = (
            "🍫 Dark chocolate • 🥬 Spinach • "
            "🫘 Lentils • 🥚 Eggs \n\n"
            "📌these foods contain iron and nutrients "
            "that may help support your body."
            )
        

        elif cycle_day <= 13:
            phase = "🌱follicular phase🌱"
            phase_message = (
            "you may notice your energy gradually returning. "
            "this can be a lovely time to start new habits "
            "or work on goals you've been planning."
            )
            phase_food = (
            "🍓 Berries • 🥦 Broccoli • "
            "🥑 Avocado • 🐟 Fish \n\n"
            "📌these focus on colourful and nourishing foods."
            )
            
        elif cycle_day == 14:
            phase = "🌼ovulation🌼"
            phase_message = (
            "you may feel more energetic or motivated today. "
            "if there's something you've been putting off, "
            "this might be a wonderful day to start."
            )
            phase_food = (
            "🥗 Fresh vegetables • 🍊 Citrus fruits • "
            "🥜 Nuts • 🐟 Salmon \n\n"
            "📌remember to stay hydrated too."
            )

        else:
            phase = "🌙luteal phase🌙"
            phase_message = (
            "your body may be preparing for rest. "
            "if you've been feeling emotional or tired lately, "
            "please be gentle with yourself."
            )
            phase_food = (
            "🍌 Bananas • 🌰 Nuts • "
            "🍠 Sweet potatoes • 🍚 Whole grains \n\n"
            "📌foods rich in magnesium may feel comforting."
            )

        cycle_data = {
            "cycle_day": cycle_day,
            "phase": phase,
            "phase_message": phase_message,
            "phase_food": phase_food
        }


    return {

        "last_mood":
            latest_mood.mood_emoji
            if latest_mood
            else None,

        "last_mood_time":
            latest_mood.created_at
            if latest_mood
            else None,

        "mood_message":
            mood_message,

        "food_reminder":
            food_reminder,

        "last_food":
            latest_meal.food_name
            if latest_meal
            else None,

        "water_glasses":
        water_glasses,

        "cycle":
        cycle_data,
    }