import json
import re


def extract_json(texto) -> dict:
    block = re.search(r'(\{.*\})', texto, re.DOTALL)
    if not block:
        raise ValueError("No se encontró un JSON válido.")
    raw = block.group(1)
    try:
        raw = raw.encode('utf-8')
    except Exception:
        pass
    return json.loads(raw)


def compact_jsons(jsons: list) -> dict:
    json_concat = {
        "dias": [],
        "objetivo_calorias": "",
        "objetivo_proteinas": "",
        "objetivo_hidratos": "",
        "objetivo_grasas": "",
    }
    for json_text in jsons:
        json_dia = extract_json(json_text)
        json_concat['dias'].append(json_dia['dias'])

    json_concat['objetivo_calorias'] = json_dia['objetivo_calorias']
    json_concat['objetivo_proteinas'] = json_dia['objetivo_proteinas']
    json_concat['objetivo_hidratos'] = json_dia['objetivo_hidratos']
    json_concat['objetivo_grasas'] = json_dia['objetivo_grasas']
    return json_concat