PORT=8000
APP=endpoints.handlers:app
PYTHONPATH=back/src

run:
	PYTHONPATH=$(PYTHONPATH) uvicorn $(APP) --reload --port $(PORT)

# Ejecutar el servidor sin recarga (producción local)
run-prod:
	PYTHONPATH=$(PYTHONPATH) uvicorn $(APP) --host 0.0.0.0 --port $(PORT)
