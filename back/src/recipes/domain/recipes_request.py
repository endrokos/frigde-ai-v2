from dataclasses import dataclass

@dataclass
class RecipesRequest:
    plato: str
    calories: int
    protein: int
    carbohydrate: int
    fat: int
