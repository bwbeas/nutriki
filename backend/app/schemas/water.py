from pydantic import BaseModel


class WaterCreate(BaseModel):
    glasses: int