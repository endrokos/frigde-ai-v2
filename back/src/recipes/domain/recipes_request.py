from pydantic import BaseModel, Field


class RecipesRequest(BaseModel):
    plato: str
    calories: int
    protein: int
    carbohydrate: int
    fat: int
