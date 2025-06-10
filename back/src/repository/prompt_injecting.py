from back.src.domain.menu_request import MenuRequest


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