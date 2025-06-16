from pydantic import BaseModel, Field


class RecipesRequest(BaseModel):
    plato: str
    calories: int = Field(alias="calorias")
    protein: int = Field(alias="proteinas")
    carbohydrate: int = Field(alias="hidratos")
    fat: int = Field(alias="grasas")

    class Config:
        allow_population_by_field_name = True
