from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.models.plant import Plant

from app.schemas.plant import PlantCreate

from app.core.auth import get_current_user


router = APIRouter(
    prefix="/plant",
    tags=["Plant"]
)

@router.post("/")
def create_plant(
    plant: PlantCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    existing = (

        db.query(Plant)

        .filter(
            Plant.user_id ==
            current_user["user_id"]
        )

        .first()

    )

    if existing:

        raise HTTPException(
            status_code=400,
            detail="Plant already exists"
        )

    new_plant = Plant(

        user_id=current_user["user_id"],

        plant_name=plant.plant_name

    )

    db.add(new_plant)

    db.commit()

    db.refresh(new_plant)

    return new_plant

@router.get("/")
def get_plant(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    plant = (

        db.query(Plant)

        .filter(
            Plant.user_id ==
            current_user["user_id"]
        )

        .first()

    )

    return plant