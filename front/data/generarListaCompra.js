export async function generarListaCompra(menu, dias) {
  const res = await fetch("http://127.0.0.1:8000/generate-shopping-list-from-menu", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ menu, dias }),
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.message || "Error del servidor");
    return json;
  } catch (e) {
    console.error("Respuesta no JSON:", text);
    throw new Error("Error inesperado del servidor");
  }
}
