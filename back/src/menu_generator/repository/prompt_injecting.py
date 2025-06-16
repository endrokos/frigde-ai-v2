import json
from xml.etree.ElementTree import indent

from back.src.menu_generator.domain.menu_request import MenuRequest, MenuWithOptionalsRequest


def prompt_injecting(content: str, prompt: str):
    return prompt.replace("content", content)

def prompt_injecting_menu(menu: MenuRequest, prompt: str):
    return (prompt
            .replace("{objetivo_del_menu}", menu.menu_goal)
            .replace("{comidas}", str(menu.meals))
            .replace("{alergias}", str(menu.allergies))
            .replace("{dieta}", menu.diet)
            .replace("{alimentos_no_ricos}", str(menu.not_rich_foods))
            )

def prompt_injecting_menu_and_day(menu: MenuRequest, prompt: str, day: str):
    return (prompt
            .replace("{dia}", day)
            .replace("{objetivo_del_menu}", menu.menu_goal)
            .replace("{comidas}", str(menu.meals))
            .replace("{alergias}", str(menu.allergies))
            .replace("{dieta}", menu.diet)
            .replace("{alimentos_no_ricos}", str(menu.not_rich_foods))
            )


def prompt_injecting_menu_and_day_iterating(menu: MenuRequest, prompt: str, day: str, response_before: str):
    return (prompt
            .replace("{dia}", day)
            .replace("{objetivo_del_menu}", menu.menu_goal)
            .replace("{comidas}", str(menu.meals))
            .replace("{alergias}", str(menu.allergies))
            .replace("{dieta}", menu.diet)
            .replace("{alimentos_no_ricos}", str(menu.not_rich_foods))
            .replace("{menu_para_dias_anteriores}", str(response_before))


            )

def prompt_injecting_menu_with_optionals(menu: MenuWithOptionalsRequest, prompt: str):
    return (prompt
            .replace("{objetivo_del_menu}", menu.menu_goal)
            .replace("{comidas}", str(menu.meals))
            .replace("{alergias}", str(menu.allergies))
            .replace("{dieta}", menu.diet)
            .replace("{alimentos_no_ricos}", str(menu.not_rich_foods))
            .replace("{postre_comida}", menu.postre_comida)
            .replace("{postre_cena}", menu.postre_cena)
            .replace("{numero_de_platos_comida}", str(menu.numero_de_platos_comida))
            .replace("{numero_de_platos_cena}", str(menu.numero_de_platos_cena))
            .replace("{user_metrics}", json.dumps(menu.user_metrics, indent=2))
            )