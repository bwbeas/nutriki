from fastapi import APIRouter

from app.schemas.contact import ContactMessage

import smtplib

from email.message import EmailMessage

router = APIRouter(
    prefix="/contact",
    tags=["Contact"]
)

@router.post("/")
def send_message(data: ContactMessage):

    email = EmailMessage()

    email["Subject"] = "New Nutriki Message 🌷"

    email["From"] = "bellbuuuwork6@gmail.com"

    email["To"] = "bellbuuuwork6@gmail.com"

    email.set_content(

        f"""
Nickname:
{data.nickname}

Email:
{data.email}

Message:
{data.message}
        """

    )

    with smtplib.SMTP_SSL(
        "smtp.gmail.com",
        465
    ) as smtp:

        smtp.login(

            "bellbuuuwork6@gmail.com",

            "tmlvcdspqstsicvn"

        )

        smtp.send_message(email)

    return {

        "message":
        "sent successfully"

    }