from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from app.db.database import Base


class Plant(Base):

    __tablename__ = "plants"

    id = Column(Integer, primary_key=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True
    )

    plant_name = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )