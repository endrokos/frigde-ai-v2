from typing import Optional

from pydantic import BaseModel, Field


class DishRequest(BaseModel):
    dish: str = Field(alias="plato")
    recipe: Optional[str] = Field(default=None, alias="receta")
    ingredients: Optional[str] = Field(default=None, alias="ingredientes")

    class Config:
        allow_population_by_field_name = True
