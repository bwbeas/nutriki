from sqlalchemy import (
    Column,
    Integer,
    Date,
    ForeignKey
)

from app.db.database import Base


class WaterLog(Base):

    __tablename__ = "water_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    glasses = Column(
        Integer,
        default=0
    )

    log_date = Column(Date)