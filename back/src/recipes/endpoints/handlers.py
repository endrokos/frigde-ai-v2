from fastapi import FastAPI, UploadFile, File, APIRouter
from starlette.middleware.cors import CORSMiddleware

from back.src.recipes.application.use_case import generate_recipes_use_case, obtain_more_recipes_use_case, \
    calculate_macros_from_image_use_case, calculate_macros_from_text_use_case
from back.src.recipes.domain.disk_request import DiskRequest
from back.src.recipes.domain.recipes_request import RecipesRequest
from back.src.shared.repository.gpt_text_model_client import GptTextModelClient
from back.src.shared.repository.gpt_vision_model_client import GptVisionModelClient
from config.models import VISION_MODEL, RECIPE_GENERATION_MODEL

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
router = APIRouter()

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
    gpt_text_model_client = GptTextModelClient(model_name=RECIPE_GENERATION_MODEL)
    return generate_recipes_use_case(recipes_request=recipes_request, text_model_client=gpt_text_model_client)

@app.post("/obtain_more_recipes")
def obtain_more_recipes(recipes_request: RecipesRequest):
    gpt_text_model_client = GptTextModelClient(model_name=RECIPE_GENERATION_MODEL)
    return obtain_more_recipes_use_case(recipes_request=recipes_request, text_model_client=gpt_text_model_client)

@router.post("/calculate_macros_from_image")
async def calculate_macros_from_image(image: UploadFile = File(...)):
    gpt_vision_model_client = GptVisionModelClient(model_name=VISION_MODEL)
    return await calculate_macros_from_image_use_case(image_bytes=image, vision_model_client=gpt_vision_model_client)

app.include_router(router)

@app.post("/calculate_macros_from_text")
def obtain_more_recipes(disk_request: DiskRequest):
    gpt_text_model_client = GptTextModelClient(model_name=RECIPE_GENERATION_MODEL)
    return calculate_macros_from_text_use_case(disk_request=disk_request, text_model_client=gpt_text_model_client)

