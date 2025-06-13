from src.menu_generator.domain.menu_request import MenuRequest
from src.menu_generator.endpoints.handlers import generate_menu_many_calls


def test_generate_menu_many_calls():
    menu = MenuRequest(
        menu_goal="Perder peso",
        meals=["Desayuno", "Comida", "Cena"],
        allergies=[""],
        diet="",
        not_rich_foods=[""],

    )
    response = generate_menu_many_calls(menu=menu)
    assert isinstance(response, dict)
    assert isinstance(response['menu']['dias'], list)