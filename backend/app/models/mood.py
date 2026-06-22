from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from app.db.database import Base


class MoodLog(Base):

    __tablename__ = "mood_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    mood_emoji = Column(
        String,
        nullable=False
    )

    reasons = Column(
        String
    )

    appetite = Column(
        String
    )

    journal = Column(
        String
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )