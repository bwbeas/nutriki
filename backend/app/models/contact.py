from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime
)

from datetime import datetime

from app.db.database import Base


class ContactMessage(Base):

    __tablename__ = "contact_messages"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nickname = Column(
        String
    )

    email = Column(
        String,
        nullable=True
    )

    message = Column(
        Text
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )