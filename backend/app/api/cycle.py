from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.cycle import Cycle
from app.schemas.cycle import CycleCreate

from app.core.auth import get_current_user

router = APIRouter(
    prefix="/cycle",
    tags=["Cycle"]
)


@router.get("/")
def get_cycle(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    cycle = (
        db.query(Cycle)
        .filter(
            Cycle.user_id == current_user["user_id"]
        )
        .first()
    )

    return cycle


@router.post("/")
def save_cycle(
    cycle: CycleCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    existing = (
        db.query(Cycle)
        .filter(
            Cycle.user_id == current_user["user_id"]
        )
        .first()
    )

    if existing:

        existing.hysterectomy = cycle.hysterectomy
        existing.period_start = cycle.period_start

        db.commit()
        db.refresh(existing)

        return existing

    new_cycle = Cycle(
        user_id=current_user["user_id"],
        hysterectomy=cycle.hysterectomy,
        period_start=cycle.period_start
    )

    db.add(new_cycle)
    db.commit()
    db.refresh(new_cycle)

    return new_cycle