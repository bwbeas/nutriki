from pydantic import BaseModel, EmailStr, Field
from typing import Literal


class UserRegister(BaseModel):
    nickname: str = Field(min_length=3, max_length=10)
    email: EmailStr
    password: str = Field(min_length=8)

    age: int = Field(ge=18, le=40)

    height_cm: float = Field(gt=0)

    weight_kg: float = Field(gt=0)

    activity_level: Literal[
    "Sedentary",
    "Lightly Active",
    "Moderately Active",
    "Very Active"
]

class UserLogin(BaseModel):
    email: EmailStr
    password: str