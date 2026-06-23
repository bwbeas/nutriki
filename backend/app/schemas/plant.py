from pydantic import BaseModel


class PlantCreate(BaseModel):

    plant_name: str