from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.water import WaterLog
from app.schemas.water import WaterCreate

from app.core.auth import get_current_user

router = APIRouter(
    prefix="/water",
    tags=["Water"]
)


@router.get("/today")
def get_today_water(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    water = (
        db.query(WaterLog)
        .filter(
            WaterLog.user_id == current_user["user_id"],
            WaterLog.log_date == date.today()
        )
        .first()
    )

    if not water:
        return {"glasses": 0}

    return {"glasses": water.glasses}


@router.post("/add")
def add_water(
    water_data: WaterCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    water = (
        db.query(WaterLog)
        .filter(
            WaterLog.user_id == current_user["user_id"],
            WaterLog.log_date == date.today()
        )
        .first()
    )

    if water:

        water.glasses += water_data.glasses

    else:

        water = WaterLog(
            user_id=current_user["user_id"],
            glasses=water_data.glasses,
            log_date=date.today()
        )

        db.add(water)

    db.commit()

    return {"message": "saved 💧"}


@router.get("/history")
def get_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return (
        db.query(WaterLog)
        .filter(
            WaterLog.user_id == current_user["user_id"]
        )
        .order_by(WaterLog.log_date.desc())
        .all()
    )