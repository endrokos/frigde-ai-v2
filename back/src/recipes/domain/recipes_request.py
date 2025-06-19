from pydantic import BaseModel, Field


class RecipesRequest(BaseModel):
    plato: str
    calories: float
    protein: float
    carbohydrate: float
    fat: float
