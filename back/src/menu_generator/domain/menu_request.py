from dataclasses import dataclass

@dataclass
class MenuRequest:
    menu_goal: str
    meals: list
    allergies: list
    diet: str
    not_rich_foods: list
