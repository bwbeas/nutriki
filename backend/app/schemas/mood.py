from pydantic import BaseModel


class MoodCreate(BaseModel):

    mood_emoji: str

    reasons: list[str]

    appetite: str

    journal: str | None = None