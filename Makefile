PORT_MENU=8000
PORT_RECIPES=8001
APP_MENU=menu_generator.endpoints.handlers:app
APP_RECIPES=recipes.endpoints.handlers:app
PYTHONPATH=back/src

run-menu:
	PYTHONPATH=$(PYTHONPATH) uvicorn $(APP_MENU) --reload --port $(PORT_MENU)

run-recipes:
	PYTHONPATH=$(PYTHONPATH) uvicorn $(APP_RECIPES) --reload --port $(PORT_RECIPES)

# Ejecutar el servidor sin recarga (producción local)
run-prod:
	PYTHONPATH=$(PYTHONPATH) uvicorn $(APP) --host 0.0.0.0 --port $(PORT)
