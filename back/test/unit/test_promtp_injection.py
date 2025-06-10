from src.domain.dish_request import DishRequest
from src.repository.prompt_injecting import prompt_injecting


def test_prompt_injection():
    dishes = ["Pasta a la carbonara", "Filete empanado", "Sopa de pollo"]
    dish_request = DishRequest(dishes=dishes)
    prompt = prompt_injecting(dish_request)
    assert isinstance(prompt, str)
    assert "Pasta a la carbonara, Filete empanado, Sopa de pollo" in prompt
