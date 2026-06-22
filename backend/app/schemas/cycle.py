from pydantic import BaseModel
from datetime import datetime


class CycleCreate(BaseModel):

    hysterectomy: bool

    period_start: datetime | None = None