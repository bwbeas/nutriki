from sqlalchemy import (
    Column,
    Integer,
    Boolean,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from app.db.database import Base


class Cycle(Base):

    __tablename__ = "cycles"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    hysterectomy = Column(
        Boolean,
        default=False
    )

    period_start = Column(
        DateTime,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )