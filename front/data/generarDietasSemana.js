// /data/generarDietaSemana.js


export async function generarDietasSemana(payload) {
  const res = await fetch("http://127.0.0.1:8000/generate-menu-with-optionals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  console.log(text)

  try {
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.message || "Error del servidor");
    return json;
  } catch (e) {
    console.error("Respuesta no JSON:", text);
    throw new Error("Error inesperado del servidor");
  }
}
