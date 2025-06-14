import json
import re


def extract_json_menu(texto) -> dict:
    block = re.search(r'(\{.*\})', texto, re.DOTALL)
    if not block:
        raise ValueError("No se encontró un JSON válido.")
    raw = block.group(1)
    try:
        raw = raw.encode('utf-8')
    except Exception:
        pass
    return json.loads(raw)


def extract_json_recipes(texto: str):
    if isinstance(texto, (dict, list)):
        return texto

    try:
        return json.loads(texto)
    except json.JSONDecodeError:
        pass

    json_match = re.search(r'(\{.*\}|\[.*\])', texto, re.DOTALL)
    if json_match:
        try:
            return json.loads(json_match.group(0))
        except json.JSONDecodeError as e:
            raise ValueError(f"JSON extraído pero inválido: {e}")

    raise ValueError("No se encontró un JSON válido.")

def extract_json_macros(texto) -> dict:
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
        json_dia = extract_json_menu(json_text)
        json_concat['dias'].append(json_dia['dias'])

    json_concat['objetivo_calorias'] = json_dia['objetivo_calorias']
    json_concat['objetivo_proteinas'] = json_dia['objetivo_proteinas']
    json_concat['objetivo_hidratos'] = json_dia['objetivo_hidratos']
    json_concat['objetivo_grasas'] = json_dia['objetivo_grasas']
    return json_concat