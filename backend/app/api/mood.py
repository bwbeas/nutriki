from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.mood import MoodLog

from app.schemas.mood import MoodCreate

from app.core.auth import get_current_user


router = APIRouter(
    prefix="/mood",
    tags=["Mood"]
)
@router.post("/")
def create_mood(
    mood: MoodCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    new_mood = MoodLog(

        user_id=current_user["user_id"],

        mood_emoji=mood.mood_emoji,

        reasons=",".join(mood.reasons),

        appetite=mood.appetite,

        journal=mood.journal

    )

    db.add(new_mood)

    db.commit()

    db.refresh(new_mood)

    return new_mood

@router.get("/history")
def get_mood_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    moods = (

        db.query(MoodLog)

        .filter(
            MoodLog.user_id == current_user["user_id"]
        )

        .order_by(
            MoodLog.created_at.desc()
        )

        .all()

    )

    return moods