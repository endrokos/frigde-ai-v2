from pydantic import BaseModel


class RecipesRequest(BaseModel):
    plato: str
    calories: int
    protein: int
    carbohydrate: int
    fat: int
