PORT=8000
APP_MENU=menu_generator.endpoints.handlers:app
APP_RECIPES=recipes.endpoints.handlers:app
PYTHONPATH=back/src

run-menu:
	PYTHONPATH=$(PYTHONPATH) uvicorn $(APP_MENU) --reload --port $(PORT)

run-recipes:
	PYTHONPATH=$(PYTHONPATH) uvicorn $(APP_RECIPES) --reload --port $(PORT)

# Ejecutar el servidor sin recarga (producción local)
run-prod:
	PYTHONPATH=$(PYTHONPATH) uvicorn $(APP) --host 0.0.0.0 --port $(PORT)
