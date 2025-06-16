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

# TODO: Añadir métricas de la persona
PROMPT_MAKE_MENU = """
Quiero que me generes un json donde añadas en la estructura que te voy a pasar.
Se trata de generar un menú semanal. Es necesario que generes {numero_de_platos} opciones (primer y segundo plato) para la -comida- y la -cena-, 
y sólamente 1 opción para el resto.
El usuario {postre} quiere postre. Si es un -Sí- incluye sólo en la comida y la cena. Si es un -No-, procura que no aparezca.
Quiero que este menú se base en la dieta para bajar peso si mido 170 y peso 80 kg y hago deporte cada 3 días
Para rellenar el json ten en cuenta los siguientes datos:

El objetivo del menu es el siguiente: {objetivo_del_menu}
Comidas al día: {comidas}
Tiene alergia a: {alergias}
Sigue la siguiente dieta: {dieta}. Si no hay dieta, propón algo sano y variado 
El usuario no tolera los siguientes alimentos: {alimentos_no_ricos}

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
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          }
        ],
        "Comida 2": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          }
        ],
        "Comida 3": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          }
        ],
        "Comida 4": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          }
        ],
        "Comida 5": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          }
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
        "Comida 1": [...],
        "Comida 2": [...],
        "Comida 3": [...],
        "Comida 4": [...],
        "Comida 5": [...],
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

Si existiera la opción de incluir 2 platos, y postre un ejemplo sería:
  "nombre": "Lunes",
  "comidas": {
    "Cena": [
      {
        "plato": ,
        "calorias": ,
        "proteinas": ,
        "hidratos": ,
        "grasas": ,
      }
      {
        "plato": ,
        "calorias": ,
        "proteinas": ,
        "hidratos": ,
        "grasas": ,
      }
      {
        "postre": ,
        "calorias": ,
        "proteinas": ,
        "hidratos": ,
        "grasas": ,
      }
    ]
        
Los campos de cada entrada se deben rellenar tal cual vienen ejemplificados el día LUNES
"""

PROMPT_MAKE_MENU_WITH_OPTIONS = """
El menú debe generarse en base al siguiente perfil del usuario:
{user_metrics}

Quiero que me generes un json donde añadas en la estructura que te voy a pasar.
Se trata de generar un menú semanal. 
Es necesario que generes {numero_de_platos_comida} para las -comidas-, en caso de que sean dos, quiero que des un primer plato y luego un segundo plato
Es necesario que generes {numero_de_platos_cena} para las -cenas-, en caso de que sean dos, quiero que des un primer plato y luego un segundo plato
y sólamente 1 opción para el resto.
El usuario {postre_comida} quiere postre. Si es un -Sí- incluye sólo en la comida. Si es un -No-, procura que no aparezca.
El usuario {postre_cena} quiere postre. Si es un -Sí- incluye sólo en la cena. Si es un -No-, procura que no aparezca.
Quiero que este menú se base en la dieta para bajar peso si mido 170 y peso 80 kg y hago deporte cada 3 días
Para rellenar el json ten en cuenta los siguientes datos:

El objetivo del menu es el siguiente: {objetivo_del_menu}
Comidas al día: {comidas}
Tiene alergia a: {alergias}
Sigue la siguiente dieta: {dieta}. Si no hay dieta, propón algo sano y variado 
El usuario no tolera los siguientes alimentos: {alimentos_no_ricos}

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
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          }
        ],
        "Comida 2": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          }
        ],
        "Comida 3": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          }
        ],
        "Comida 4": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          }
        ],
        "Comida 5": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          }
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
        "Comida 1": [...],
        "Comida 2": [...],
        "Comida 3": [...],
        "Comida 4": [...],
        "Comida 5": [...],
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

Si existiera la opción de incluir 2 platos y postre en la cena, un ejemplo sería:
  "nombre": "Lunes",
  "comidas": {
    "Cena": [
      {
        "primer_plato": ,
        "calorias": ,
        "proteinas": ,
        "hidratos": ,
        "grasas": ,
      }
      {
        "segundo_plato": ,
        "calorias": ,
        "proteinas": ,
        "hidratos": ,
        "grasas": ,
      }
      {
        "postre": ,
        "calorias": ,
        "proteinas": ,
        "hidratos": ,
        "grasas": ,
      }
    ]

Los campos de cada entrada se deben rellenar tal cual vienen ejemplificados el día LUNES
"""


PROMPT_MAKE_MENU_FOR_DAY = """
Quiero que me generes un json donde añadas en la estructura que te voy a pasar.
Se trata de generar un menú semanal. Es necesario que generes {numero_de_platos} opciones (primer y segundo plato) para la -comida- y la -cena-, 
y sólamente 1 opción para el resto.
El usuario {postre} quiere postre. Si es un -Sí- incluye sólo en la comida y la cena. Si es un -No-, procura que no aparezca.
Quiero que este menu se base en la dieta para bajar peso si mido 170 y peso 80 kg y hago deporte cada 3 días
Para rellenar el json ten en cuenta los siguientes datos:

Cambia en el json Dia por {dia}
El objetivo del menu es el siguiente: {objetivo_del_menu}
Comidas al día: {comidas}
Tiene alergia a: {alergias}
Sigue la siguiente dieta: {dieta}, sino hay dieta sigue algo sano y variado 
El usuario no tolera los siguientes alimentos: {alimentos_no_ricos}

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
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 2": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 3": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 4": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 5": [
          {
            "plato": ,
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
Si existiera la opción de incluir 2 platos, y postre un ejemplo sería:
  "nombre": "Lunes",
  "comidas": {
    "Cena": [
      {
        "plato": ,
        "calorias": ,
        "proteinas": ,
        "hidratos": ,
        "grasas": ,
      }
      {
        "plato": ,
        "calorias": ,
        "proteinas": ,
        "hidratos": ,
        "grasas": ,
      }
      {
        "postre": ,
        "calorias": ,
        "proteinas": ,
        "hidratos": ,
        "grasas": ,
      }
    ]

Intenta encontrar opciones variadas y diferentes entre días y comidas.
"""


PROMPT_MAKE_MENU_FOR_DAY_ITERATING = """
Quiero que me generes un json donde añadas en la estructura que te voy a pasar.
Se trata de generar un menú semanal. Es necesario que generes {numero_de_platos} opciones (primer y segundo plato) para la -comida- y la -cena-, 
y sólamente 1 opción para el resto.
El usuario {postre} quiere postre. Si es un -Sí- incluye sólo en la comida y la cena. Si es un -No-, procura que no aparezca.Quiero que este menu se base en la dieta para bajar peso si mido 170 y peso 80 kg y hago deporte cada 3 días
Para rellenar el json ten en cuenta los siguientes datos

Cambia en el json Dia por {dia}
El objetivo del menu es el siguiente: {objetivo_del_menu}
Comidas al día: {comidas}
Tiene alergia a: {alergias}
Sigue la siguiente dieta: {dieta}, sino hay dieta sigue algo sano y variado 
El usuario no tolera los siguientes alimentos: {alimentos_no_ricos}

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
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 2": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 3": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 4": [
          {
            "plato": ,
            "calorias": ,
            "proteinas": ,
            "hidratos": ,
            "grasas": ,
          },
        ],
        "Comida 5": [
          {
            "plato": ,
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
Si existiera la opción de incluir 2 platos, y postre un ejemplo sería:
  "nombre": "Lunes",
  "comidas": {
    "Cena": [
      {
        "plato": ,
        "calorias": ,
        "proteinas": ,
        "hidratos": ,
        "grasas": ,
      }
      {
        "plato": ,
        "calorias": ,
        "proteinas": ,
        "hidratos": ,
        "grasas": ,
      }
      {
        "postre": ,
        "calorias": ,
        "proteinas": ,
        "hidratos": ,
        "grasas": ,
      }
    ]

IMPORTANTE: El menu que se ha realizado para los días anteriores es el siguiente: {menu_para_dias_anteriores}
Intenta encontrar opciones variadas y diferentes entre días y comidas.
"""


PROMPT_CREATE_RECIPES="""
Genera una receta en formato JSON para el plato "{plato}", que contenga:
- Lista de ingredientes con cantidades exactas.
- Pasos claros y numerados para prepararlo.
La receta debe estar alineada con los siguientes valores nutricionales aproximados: calorías {calories}, proteínas {protein}, carbohidratos {carbohydrate} y grasas {fat}.
No incluyas texto adicional fuera del JSON.

Ejemplo:

{"ingredients": "", "recipe": ""}
"""

PROMPT_OBTAIN_MORE_RECIPES="""
A partir del siguiente plato: "{plato}", genera 5 platos distintos pero similares en estilo y perfil nutricional.

Cada plato debe tener valores aproximados a:
- Calorías: {calories}
- Proteínas: {protein}
- Carbohidratos: {carbohydrate}
- Grasas: {fat}

Devuelve únicamente un bloque JSON con una lista de 5 objetos, cada uno con el siguiente formato:

[
  {
    "plato": "nombre del plato",
    "calorias": número,
    "proteinas": número,
    "hidratos": número,
    "grasas": número
  },
  ...
]

No escribas ninguna explicación ni texto adicional. Solo devuelve el JSON.
"""

PROMPT_CALCULATE_MACROS_FROM_IMAGE= """
Actúa como un experto nutricionista, quiero que dada la foto que acabas de recibir, me calcules de manera más exacta que puedas los diferentes parámetros.

Nombre del Plato, Calorías, Proteinas, Hidratos de carbono y grasas

Ejemplo:

{
"plato": "nombre del plato",
"calorias": número,
"proteinas": número,
"hidratos": número,
"grasas": número
}
"""

PROMPT_CALCULATE_MACROS_FROM_TEXT = """
Actúa como un experto nutricionista, quiero que dado el nombre de un plato, en algunos casos los ingredientes y en otros casos la receta, que me calcules de manera más exacta que puedas los diferentes parámetros.

Nombre del Plato, Calorías, Proteinas, Hidratos de carbono y grasas

Información:

El plato es el siguiente: {plato}
Los ingredientes: {ingredientes}
La Receta: {receta}

Ejemplo:

{
"plato": "nombre del plato",
"calorias": número,
"proteinas": número,
"hidratos": número,
"grasas": número
}
"""