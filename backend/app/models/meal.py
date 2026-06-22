from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey,
)
from sqlalchemy.sql import func

from app.db.database import Base


class Meal(Base):
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    meal_type = Column(String, nullable=False)

    food_name = Column(String, nullable=False)

    emoji = Column(String, nullable=False)

    fast_food = Column(Boolean, default=False)

    calories = Column(String)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )