from fastapi import APIRouter

from app.schemas.contact import ContactMessage

import smtplib
import os

from email.message import EmailMessage

from dotenv import load_dotenv

load_dotenv()

EMAIL_ADDRESS = os.getenv(
  "EMAIL_ADDRESS"
)

EMAIL_PASSWORD = os.getenv(
  "EMAIL_PASSWORD"
)

router = APIRouter(
  prefix="/contact",
  tags=["Contact"]
)

@router.post("/")
def send_message(data: ContactMessage):


  email = EmailMessage()

  email["Subject"] = "New Nutriki Message 🌷"

  email["From"] = EMAIL_ADDRESS

  email["To"] = EMAIL_ADDRESS
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
        EMAIL_ADDRESS,
        EMAIL_PASSWORD
    )

    smtp.send_message(email)

  return {
    "message":
    "sent successfully"
  }

