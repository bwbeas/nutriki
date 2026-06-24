from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.db.dependencies import get_db

from app.schemas.contact import ContactMessage as ContactSchema

from app.models.contact import ContactMessage


router = APIRouter(
    prefix="/contact",
    tags=["Contact"]
)


@router.post("/")
def send_message(
    data: ContactSchema,
    db: Session = Depends(get_db)
):

    new_message = ContactMessage(

        nickname=data.nickname,

        email=data.email,

        message=data.message

    )

    db.add(new_message)

    db.commit()

    return {
        "message":
        "saved successfully"
    }
@router.get("/")
def get_messages(
    db: Session = Depends(get_db)
):

    return (

        db.query(ContactMessage)

        .order_by(
            ContactMessage.created_at.desc()
        )

        .all()

    )