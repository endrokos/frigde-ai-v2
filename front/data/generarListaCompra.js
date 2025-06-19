export async function generarListaCompra(menu, dias) {
  const filtroDias = menu?.dias?.filter((d) => dias.includes(d.nombre)) || [];
  const payload = { week_menu: { ...menu, dias: filtroDias } };

  const res = await fetch("http://127.0.0.1:8000/generate-shopping-list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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
