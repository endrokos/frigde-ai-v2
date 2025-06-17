def agregar_objetivos_nutricionales(menu_json):
    for dia in menu_json["dias"]:
        suma_calorias = 0
        suma_proteinas = 0
        suma_hidratos = 0
        suma_grasas = 0
        for comidas in dia["comidas"].values():
            for plato in comidas:
                suma_calorias += plato.get("calorias", 0)
                suma_proteinas += plato.get("proteinas", 0)
                suma_hidratos += plato.get("hidratos", 0)
                suma_grasas += plato.get("grasas", 0)
        dia["objetivo_calorias"] = suma_calorias
        dia["objetivo_proteinas"] = suma_proteinas
        dia["objetivo_hidratos"] = suma_hidratos
        dia["objetivo_grasas"] = suma_grasas
    return menu_json

