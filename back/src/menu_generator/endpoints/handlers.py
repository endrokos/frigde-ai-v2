from fastapi import FastAPI

from back.src.menu_generator.domain.menu_request import MenuRequest, MenuWithOptionalsRequest
from config.models import MENU_GENERATION_MODEL
from back.src.menu_generator.application.use_cases import (
    generate_shopping_list_use_case,
    generate_menu_use_case,
    generate_menu_use_case_many_calls,
    generate_menu_use_case_iterating, generate_menu_with_optionals_use_case,
)
from back.src.menu_generator.domain.week_menu_request import WeekMenuRequest
from back.src.shared.repository.gpt_text_model_client import GptTextModelClient
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)


origins = ["http://localhost:3000", "https://endrokosai.com"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-shopping-list")
def generate_shopping_list(week_menu: WeekMenuRequest):
    gpt_text_model_client = GptTextModelClient(model_name=MENU_GENERATION_MODEL)
    return generate_shopping_list_use_case(week_menu_request=week_menu, text_model_client=gpt_text_model_client)

@app.post("/generate-menu")
def generate_menu(menu: MenuRequest):
    gpt_text_model_client = GptTextModelClient(model_name=MENU_GENERATION_MODEL)
    return generate_menu_use_case(menu_request=menu, text_model_client=gpt_text_model_client)


@app.post("/generate-menu-with-optionals")
def generate_menu_with_optionals(request: MenuWithOptionalsRequest):
    gpt_text_model_client = GptTextModelClient(model_name=MENU_GENERATION_MODEL)
    return generate_menu_with_optionals_use_case(menu_request=request, text_model_client=gpt_text_model_client)


@app.post("/generate-menu-many-calls")
def generate_menu_many_calls(menu: MenuRequest):
    gpt_text_model_client = GptTextModelClient(model_name=MENU_GENERATION_MODEL)
    return generate_menu_use_case_many_calls(menu_request=menu, text_model_client=gpt_text_model_client)

@app.post("/generate-menu-iterating")
def generate_menu_iterating(menu: MenuRequest):
    gpt_text_model_client = GptTextModelClient(model_name=MENU_GENERATION_MODEL)
    return generate_menu_use_case_iterating(menu_request=menu, text_model_client=gpt_text_model_client)