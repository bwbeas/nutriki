from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    nickname = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False, index=True)

    password_hash = Column(String, nullable=False)

    age = Column(Integer, nullable=False)

    height_cm = Column(Float, nullable=False)

    weight_kg = Column(Float, nullable=False)

    activity_level = Column(String, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())