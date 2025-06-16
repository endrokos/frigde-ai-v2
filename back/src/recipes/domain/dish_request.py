from typing import Optional

from pydantic import BaseModel


class DishRequest(BaseModel):
    dish: str
    recipe: Optional[str]
    ingredients: Optional[str]