from back.src.recipes.domain.disk_request import DiskRequest
from back.src.recipes.domain.recipes_request import RecipesRequest


def prompt_injecting_recipes(recipes: RecipesRequest, prompt: str):
    return (prompt
            .replace("{plato}", recipes.plato)
            .replace("{calories}", str(recipes.calories))
            .replace("{protein}", str(recipes.protein))
            .replace("{carbohydrate}", str(recipes.carbohydrate))
            .replace("{fat}", str(recipes.fat))
            )

def prompt_injecting_disk_request(disk: DiskRequest, prompt: str):
    return (prompt
            .replace("{plato}", disk.disk)
            .replace("{receta}", str(disk.recipe))
            .replace("{ingredientes}", str(disk.ingredients))
            )