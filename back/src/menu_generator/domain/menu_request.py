from pydantic import BaseModel
from typing import List, Dict, Union


class MenuRequest(BaseModel):
    menu_goal: str
    meals: List[str]
    allergies: List[str]
    diet: str
    not_rich_foods: List[str]

class OptionalsRequest(BaseModel):
    numero_de_platos_comida: int
    postre_comida: str
    numero_de_platos_cena: int
    postre_cena: str

class MenuWithOptionalsRequest(BaseModel):
    menu_goal: str
    user_metrics: Dict[str, Union[str, int]]
    meals: List[str]
    allergies: List[str]
    diet: str
    not_rich_foods: List[str]
    numero_de_platos_comida: int
    postre_comida: str
    numero_de_platos_cena: int
    postre_cena: str