from back.src.recipes.domain.recipes_request import RecipesRequest


def prompt_injecting_recipes(recipes: RecipesRequest, prompt: str):
    return (prompt
            .replace("{plato}", recipes.plato)
            .replace("{calories}", str(recipes.calories))
            .replace("{protein}", str(recipes.protein))
            .replace("{carbohydrate}", str(recipes.carbohydrate))
            .replace("{fat}", str(recipes.fat))
            )