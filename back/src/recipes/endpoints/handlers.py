from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from back.src.recipes.application.use_case import generate_recipes_use_case
from back.src.recipes.domain.recipes_request import RecipesRequest
from back.src.shared.repository.gpt_text_model_client import GptTextModelClient
from config import MODEL_NAME_NANO

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)


origins = ["http://localhost:3000", "https://endrokosai.com"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate_recipe")
def generate_recipe(recipes_request: RecipesRequest):
    gpt_text_model_client = GptTextModelClient(model_name=MODEL_NAME_NANO)
    return generate_recipes_use_case(recipes_request=recipes_request, text_model_client=gpt_text_model_client)

