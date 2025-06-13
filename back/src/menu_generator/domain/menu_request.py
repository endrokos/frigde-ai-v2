from dataclasses import dataclass
from typing import List

@dataclass
class MenuRequest:
    menu_goal: str
    meals: list
    allergies: list
    diet: str
    not_rich_foods: list
