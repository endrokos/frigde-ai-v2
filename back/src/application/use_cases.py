from typing import Dict

from back.src.domain.dish_request import DishRequest
from back.src.domain.menu_request import MenuRequest
from back.src.repository.extract_json import extract_json, compact_jsons
from back.src.repository.gpt_text_model_client import GptTextModelClient
from back.src.repository.prompt_injecting import prompt_injecting, prompt_injecting_menu, prompt_injecting_menu_and_day
from config import PROMPT_SHOPPING_LIST, PROMPT_MAKE_MENU, DAY_LIST, PROMPT_MAKE_MENU_FOR_DAY


def generate_shopping_list_use_case(dish_request: DishRequest, text_model_client: GptTextModelClient) -> Dict:
    prompt = prompt_injecting(content=', '.join(dish_request.dishes), prompt=PROMPT_SHOPPING_LIST)
    try:
        response = text_model_client.generate(prompt)
        return {"shopping_list": response}
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {"shopping_list": "Algo salió mal :("}


def generate_menu_use_case(menu_request: MenuRequest, text_model_client: GptTextModelClient) -> Dict:
    prompt = prompt_injecting_menu(menu=menu_request, prompt=PROMPT_MAKE_MENU)
    try:
        response = text_model_client.generate(prompt)
        return {"menu": extract_json(response)}
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {"menu": "Algo salió mal :("}

def generate_menu_use_case_many_calls(menu_request: MenuRequest, text_model_client: GptTextModelClient) -> Dict:
    prompts = []
    for day in DAY_LIST:
        prompt = prompt_injecting_menu_and_day(menu=menu_request, prompt=PROMPT_MAKE_MENU_FOR_DAY, day=day)
        print(prompt)
        prompts.append(prompt)
    try:
        response = text_model_client.generate_many(prompts)
        print(compact_jsons(response))
        return compact_jsons(response)
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {"menu": "Algo salió mal :("}