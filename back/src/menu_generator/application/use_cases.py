from typing import Dict

from back.src.menu_generator.domain.dish_request import DishRequest
from back.src.menu_generator.domain.menu_request import MenuRequest, OptionalsRequest, MenuWithOptionalsRequest
from back.src.menu_generator.repository.agregar_objetivos_nutricionales import agregar_objetivos_nutricionales
from back.src.shared.repository.extract_json import extract_json_menu, compact_jsons
from back.src.shared.repository.gpt_text_model_client import GptTextModelClient
from back.src.menu_generator.repository.prompt_injecting import (
    prompt_injecting,
    prompt_injecting_menu,
    prompt_injecting_menu_and_day,
    prompt_injecting_menu_and_day_iterating, prompt_injecting_menu_with_optionals,
)
from config.prompts import PROMPT_SHOPPING_LIST, PROMPT_MAKE_MENU, DAY_LIST, PROMPT_MAKE_MENU_FOR_DAY, \
    PROMPT_MAKE_MENU_FOR_DAY_ITERATING, PROMPT_MAKE_MENU_WITH_OPTIONS


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
        return extract_json_menu(response)
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {"menu": "Algo salió mal :("}

def generate_menu_with_optionals_use_case(menu_request: MenuWithOptionalsRequest, text_model_client: GptTextModelClient) -> Dict:
    prompt = prompt_injecting_menu_with_optionals(menu=menu_request, prompt=PROMPT_MAKE_MENU_WITH_OPTIONS)
    print(prompt)
    try:
        response = text_model_client.generate(prompt)
        print(response)
        response = agregar_objetivos_nutricionales(extract_json_menu(response))
        return {"menu": response}
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

def generate_menu_use_case_iterating(menu_request: MenuRequest, text_model_client: GptTextModelClient) -> Dict:
    responses = []
    # try:
    for day in DAY_LIST:
        prompt = prompt_injecting_menu_and_day_iterating(menu=menu_request, prompt=PROMPT_MAKE_MENU_FOR_DAY_ITERATING, day=day, response_before=str(responses))
        response = text_model_client.generate(prompt)
        print(response)
        responses.append(response)
    return compact_jsons(responses)
    # except Exception as e:
    #     print(f"ERROR: {str(e)}")
    #     return {"menu": "Algo salió mal :("}