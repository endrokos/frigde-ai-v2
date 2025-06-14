from pydantic import BaseModel
from typing import List

class MenuRequest(BaseModel):
    menu_goal: str
    meals: List[str]
    allergies: List[str]
    diet: str
    not_rich_foods: List[str]

class OptionalsRequest(BaseModel):
    numero_de_platos: int
    postre: str

class MenuWithOptionalsRequest(BaseModel):
    menu: MenuRequest
    optionals: OptionalsRequest

