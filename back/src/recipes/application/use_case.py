import json
from typing import Dict

from back.src.recipes.domain.recipes_request import RecipesRequest
from back.src.recipes.repository.prompt_injecting_recipes import prompt_injecting_recipes
from back.src.shared.repository.extract_json import extract_json_menu
from back.src.shared.repository.gpt_text_model_client import GptTextModelClient
from config import PROMPT_CREATE_RECIPES, PROMPT_OBTAIN_MORE_RECIPES


def generate_recipes_use_case(recipes_request: RecipesRequest, text_model_client: GptTextModelClient) -> Dict:
    prompt = prompt_injecting_recipes(recipes=recipes_request, prompt=PROMPT_CREATE_RECIPES)
    try:
        response = text_model_client.generate(prompt)
        recipe_data = json.loads(response) if isinstance(response, str) else response
        return {"recipes": recipe_data}
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {"recipes": "Algo salió mal :("}

def obtain_more_recipes_use_case(recipes_request: RecipesRequest, text_model_client: GptTextModelClient) -> Dict:
    prompt = prompt_injecting_recipes(recipes=recipes_request, prompt=PROMPT_OBTAIN_MORE_RECIPES)
    try:
        response = text_model_client.generate(prompt)
        recipe_data = json.loads(response) if isinstance(response, str) else response
        return {"recipes": recipe_data}
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {"recipes": "Algo salió mal :("}