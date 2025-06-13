MODEL_NAME = "gpt-4.1-mini"
DAY_LIST = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
PROMPT_SHOPPING_LIST = """
Dado el siguiente listado de platos: content,

genera una lista de la compra para una semana, con cantidades aproximadas,
formateada para que sea fácil de leer y entender para cualquier persona.

1. Agrupa los ingredientes por categorías (como Verduras, Lácteos, Proteínas...).
2. Usa emojis para cada categoría (por ejemplo 🥦 Verduras, 🧀 Lácteos, 🥩 Proteínas).
3. Dentro de cada categoría, usa una lista con guiones (-) para los ingredientes.
4. Evita repetir ingredientes si se repiten en varias recetas (suma cantidades si es razonable).
5. **Ignora ingredientes comunes básicos** como sal, azúcar, agua, aceite de oliva, pimienta, etc.
6. No incluyas instrucciones de preparación ni formato de receta, solo la lista de la compra.
7. Al principio, añade un bloque opcional con los nombres de los platos seleccionados, con un emoji al lado (ej: 🍕 Pizza Margarita).

Formato final:
- Lista de platos seleccionados (con emojis)
- Lista de la compra agrupada por categorías

El resultado debe ser un texto plano legible.

Quiero que cada ingrediente, venga con el formato: Nombre ingrediente (cantidad requerida)

Ejemplo de salida:

🍽️ **Platos seleccionados:**
🍕 Pizza Margarita
🌮 Tacos
🍋 Ceviche Peruano

🧀 **Lácteos**
- Queso mozzarella (250 g)
- Qeso rallado (200 g)

🥦 **Verduras y frutas**
- 2 tomates
- 1 cebolla roja

🌶️ **Especias y condimentos** 
- Cúrcuma (2 cucharaditas)
- Comino (1 cucharadita)
...

Empieza tu respuesta directamente con los platos y la lista.
"""


PROMPT_PLATOS = """
Quiero que generes platos básicos de comida conocidos y que me des un lista de 20 platos distintos entre si y distintos a los platos que ya tengo aqui:

content

y el formato de salida debe ser una lista de python con los 20 platos nuevos bien escritos, con la primera letra de cada plato en mayuscula usa las comillas dobles, es decir estas: ""

Importante: Ten en cuenta que estos platos van para una App que la va a utilizar gente española, asi que haz más referencia a platos tipico europeos, variantes y demas, como espagueti bolloñesa, espagueti carbonara, etc
"""

PROMPT_MAKE_MENU = """
Quiero que me generes un json donde añadas en la estructura que te voy a pasar, 3 platos por comida por semana

quiero que este menu se base en la dieta para bajar peso si mido 170 y peso 80 kg y hago deporte cada 3 días

Para rellenar el json ten en cuenta los siguientes datos

El objetivo del menu es el siguiente: {objetivo_del_menu}
Comidas al día: {comidas}
Tiene alegia a: {alergias}
Sigue la siguiente dieta: {dieta}, sino hay dieta sigue algo sano y variado 
No le gusta estos alimentos: {alimentos_no_ricos}

Ejemplo: 

{
  "objetivo_calorias": ,
  "objetivo_proteinas": ,
  "objetivo_hidratos": ,
  "objetivo_grasas": ,
  "dias": [
    {
      "nombre": "Lunes",
      "comidas": {
        "Comida 1": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 2": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 3": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 4": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 5": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ]
      }
    },
    {
      "nombre": "Martes",
      "comidas": {
        "Comida 1": [...],
        "Comida 2": [...],
        "Comida 3": [...],
        "Comida 4": [...],
        "Comida 5": [...],
      }
    },
    {
      "nombre": "Miércoles",
      "comidas": {
        "Comida 1": [...],
        "Comida 2": [...],
        "Comida 3": [...],
        "Comida 4": [...],
        "Comida 5": [...],
      }
    },
    {
      "nombre": "Jueves",
      "comidas": {
        "Desayuno": [...],
        "Media mañana": [...],
        "Comida": [...],
        "Merienda": [...],
        "Cena": [...],
      }
    },
    {
      "nombre": "Viernes",
      "comidas": {
        "Comida 1": [...],
        "Comida 2": [...],
        "Comida 3": [...],
        "Comida 4": [...],
        "Comida 5": [...],
      }
    },
    {
      "nombre": "Sábado",
      "comidas": {
        "Comida 1": [...],
        "Comida 2": [...],
        "Comida 3": [...],
        "Comida 4": [...],
        "Comida 5": [...],
      }
    },
    {
      "nombre": "Domingo",
      ""comidas": {
        "Comida 1": [...],
        "Comida 2": [...],
        "Comida 3": [...],
        "Comida 4": [...],
        "Comida 5": [...],
      }
    }
  ]
};

[...] los debes rellenar con el formato que te he puesto de ejemplo con el lunes
"""


PROMPT_MAKE_MENU_FOR_DAY = """
Quiero que me generes un json donde añadas en la estructura que te voy a pasar, 3 platos por comida por semana

quiero que este menu se base en la dieta para bajar peso si mido 170 y peso 80 kg y hago deporte cada 3 días

Para rellenar el json ten en cuenta los siguientes datos

Cambia en el json Dia por {dia}
El objetivo del menu es el siguiente: {objetivo_del_menu}
Comidas al día: {comidas}
Tiene alegia a: {alergias}
Sigue la siguiente dieta: {dieta}, sino hay dieta sigue algo sano y variado 
No le gusta estos alimentos: {alimentos_no_ricos}

Ejemplo: 

{
  "objetivo_calorias": ,
  "objetivo_proteinas": ,
  "objetivo_hidratos": ,
  "objetivo_grasas": ,
  "dias": [
    {
      "nombre": "Dia",
      "comidas": {
        "Comida 1": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 2": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 3": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 4": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 5": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ]
      }
    },
  ]
}

trata de crear menus variados
"""


PROMPT_MAKE_MENU_FOR_DAY_ITERATING = """
Quiero que me generes un json donde añadas en la estructura que te voy a pasar, 3 platos por comida por semana

quiero que este menu se base en la dieta para bajar peso si mido 170 y peso 80 kg y hago deporte cada 3 días

Para rellenar el json ten en cuenta los siguientes datos

Cambia en el json Dia por {dia}
El objetivo del menu es el siguiente: {objetivo_del_menu}
Comidas al día: {comidas}
Tiene alegia a: {alergias}
Sigue la siguiente dieta: {dieta}, sino hay dieta sigue algo sano y variado 
No le gusta estos alimentos: {alimentos_no_ricos}

Ejemplo: 

{
  "objetivo_calorias": ,
  "objetivo_proteinas": ,
  "objetivo_hidratos": ,
  "objetivo_grasas": ,
  "dias": [
    {
      "nombre": "Dia",
      "comidas": {
        "Comida 1": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 2": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 3": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 4": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 5": [
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
          {
            "plato": ,
            "ingredientes": [ingrediente 1, ingrediente 2, ingrediente 3],
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ]
      }
    },
  ]
}

trata de crear menus variados

IMPORTANTE: El menu que se ha realizado para los días anteriores es el siguiente: {menu_para_dias_anteriores}
"""