from typing import Optional

from pydantic import BaseModel, Field


class DishRequest(BaseModel):
    dish: str
    recipe: Optional[str]
    ingredients: Optional[str]

    class Config:
        allow_population_by_field_name = True
