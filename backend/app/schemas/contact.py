from pydantic import BaseModel
from typing import Optional

class ContactMessage(BaseModel):

    nickname: str

    email: Optional[str] = None

    message: str
    