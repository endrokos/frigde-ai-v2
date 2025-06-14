import json
from typing import Dict

from fastapi import UploadFile

from back.src.recipes.domain.recipes_request import RecipesRequest
from back.src.recipes.repository.prompt_injecting_recipes import prompt_injecting_recipes
from back.src.shared.repository.code_base64 import process_image_content
from back.src.shared.repository.extract_json import extract_json_macros
from back.src.shared.repository.gpt_text_model_client import GptTextModelClient
from back.src.shared.repository.gpt_vision_model_client import GptVisionModelClient
from config import PROMPT_CREATE_RECIPES, PROMPT_OBTAIN_MORE_RECIPES, PROMPT_CALCULATE_MACROS


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


async def calculate_macros_use_case(image_bytes: UploadFile, vision_model_client: GptVisionModelClient) -> Dict:
    base64_image = await process_image_content(image_bytes)
    try:
        response = vision_model_client.generate(
            prompt=PROMPT_CALCULATE_MACROS,
            image_base64=base64_image,
        )
        print(response)
        return {"macros": extract_json_macros(response)}
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {"macros": "Algo salió mal :("}