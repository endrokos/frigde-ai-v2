from dataclasses import dataclass
from typing import Optional


@dataclass
class DishRequest:
    dish: str
    recipe: Optional[str]
    ingredients: Optional[str]