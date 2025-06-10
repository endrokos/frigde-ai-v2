// /data/generarDietaSemana.js

export async function generarDietasSemana(payload, endpoint = "http://127.0.0.1:8000/generate-menu-many-calls") {
    console.log("Enviando payload:", payload);
    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Error generando la dieta");
    return await response.json();
}
