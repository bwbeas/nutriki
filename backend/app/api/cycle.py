from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.cycle import Cycle

from app.schemas.cycle import CycleCreate

router = APIRouter(
    prefix="/cycle",
    tags=["Cycle"]
)
@router.get("/")
def get_cycle(
    db: Session = Depends(get_db)
):

    cycle = (
        db.query(Cycle)
        .filter(Cycle.user_id == 1)
        .first()
    )

    return cycle
@router.post("/")
def save_cycle(
    cycle: CycleCreate,
    db: Session = Depends(get_db)
):

    existing = (
        db.query(Cycle)
        .filter(Cycle.user_id == 1)
        .first()
    )

    if existing:

        existing.hysterectomy = cycle.hysterectomy
        existing.period_start = cycle.period_start

        db.commit()
        db.refresh(existing)

        return existing

    new_cycle = Cycle(
        user_id=1,
        hysterectomy=cycle.hysterectomy,
        period_start=cycle.period_start
    )

    db.add(new_cycle)
    db.commit()
    db.refresh(new_cycle)

    return new_cycle

@router.get("/")
def get_cycle(
    db: Session = Depends(get_db)
):

    cycle = (
        db.query(Cycle)
        .filter(Cycle.user_id == 1)
        .first()
    )

    return cycle