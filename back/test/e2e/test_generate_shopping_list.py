from src.menu_generator.domain.dish_request import DishRequest
from src.menu_generator.endpoints.handlers import generate_shopping_list


def test_generate_shopping_list():
    dishes = DishRequest(dishes=['Pechuga de pollo', 'Arroz tres delicias'])
    response = generate_shopping_list(dishes=dishes)
    assert isinstance(response, dict)
    assert isinstance(response['shopping_list'], str)