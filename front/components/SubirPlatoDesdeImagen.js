"use client";

import { useState, useRef } from "react";

const MOMENTOS = ["Desayuno", "Media mañana", "Comida", "Merienda", "Cena"];

export default function SubirPlatoDesdeImagen({
  diaActivo,
  setDias,
  setPlatoSeleccionado,
  guardarDiasEnLocalStorage,
}) {
  const [subiendo, setSubiendo] = useState(false);
  const [platoDetectado, setPlatoDetectado] = useState(null);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [mostrarInputManual, setMostrarInputManual] = useState(false);
  const [nombrePlatoManual, setNombrePlatoManual] = useState("");
  const [ingredientesManual, setIngredientesManual] = useState("");
  const [recetaManual, setRecetaManual] = useState("");

  const fileInputRefGaleria = useRef(null);
  const fileInputRefCamara = useRef(null);

  const handleImagen = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setSubiendo(true);

    try {
      const res = await fetch("http://127.0.0.1:8001/calculate_macros_from_image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("Error al contactar con el servidor.");
        return;
      }

      const result = await res.json();
      const macros = result?.macros;

      if (macros?.plato && typeof macros.calorias === "number") {
        setPlatoDetectado(macros);
      } else {
        alert(result?.error || "No se pudo interpretar la imagen.");
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Hubo un error al analizar la imagen.");
    } finally {
      setSubiendo(false);
    }
  };

  const handleTexto = async () => {
    if (!nombrePlatoManual.trim()) return;
    setSubiendo(true);

    try {
      const res = await fetch("http://127.0.0.1:8001/calculate_macros_from_text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dish: nombrePlatoManual.trim(),
          recipe: recetaManual.trim() || "",
          ingredients: ingredientesManual.trim() || "",
        }),
      });

      const result = await res.json();
      const macros = result?.macros;

      if (macros?.plato && typeof macros.calorias === "number") {
        setPlatoDetectado(macros);
        setMostrarInputManual(false);
        setNombrePlatoManual("");
        setIngredientesManual("");
        setRecetaManual("");
      } else {
        alert(result?.error || "No se pudo interpretar el texto.");
      }
    } catch (err) {
      console.error("Error al procesar nombre de plato:", err);
      alert("Error al contactar con el servidor.");
    } finally {
      setSubiendo(false);
    }
  };

  const insertarPlato = (momento) => {
    const nuevoPlato = {
      plato: platoDetectado.plato,
      calorias: platoDetectado.calorias,
      proteinas: platoDetectado.proteinas,
      hidratos: platoDetectado.hidratos,
      grasas: platoDetectado.grasas,
    };

    setDias((prev) => {
      const copia = [...prev];
      const dia = copia[diaActivo];
      if (!dia.comidas[momento]) dia.comidas[momento] = [];
      dia.comidas[momento][0] = nuevoPlato;
      guardarDiasEnLocalStorage(copia);
      return copia;
    });

    setPlatoSeleccionado((prev) => ({
      ...prev,
      [`${diaActivo}-${momento}`]: 0,
    }));

    setPlatoDetectado(null);
  };

  return (
    <>
      <div className="w-full flex justify-center mt-6">
        <button
          onClick={() => setMostrarOpciones(true)}
          className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 font-semibold shadow-md"
        >
          {subiendo ? "Subiendo..." : "+ Añadir plato"}
        </button>
      </div>

      {mostrarOpciones && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Selecciona cómo añadir el plato</h3>

            <div className="grid grid-cols-1 gap-3">
              <label className="cursor-pointer bg-emerald-100 text-emerald-800 font-semibold rounded-lg px-4 py-2 hover:bg-emerald-200">
                Subir desde galería
                <input
                  ref={fileInputRefGaleria}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImagen(file);
                    e.target.value = null;
                    setMostrarOpciones(false);
                  }}
                />
              </label>

              <label className="cursor-pointer bg-emerald-100 text-emerald-800 font-semibold rounded-lg px-4 py-2 hover:bg-emerald-200">
                Tomar foto con cámara
                <input
                  ref={fileInputRefCamara}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImagen(file);
                    e.target.value = null;
                    setMostrarOpciones(false);
                  }}
                />
              </label>

              <button
                onClick={() => {
                  setMostrarInputManual(true);
                  setMostrarOpciones(false);
                }}
                className="bg-emerald-100 text-emerald-800 font-semibold rounded-lg px-4 py-2 hover:bg-emerald-200"
              >
                Escribir nombre del plato
              </button>
            </div>

            <button
              onClick={() => setMostrarOpciones(false)}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {mostrarInputManual && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Escribe el nombre del plato</h3>

            <input
              value={nombrePlatoManual}
              onChange={(e) => setNombrePlatoManual(e.target.value)}
              placeholder="Ej. Espaguetis con tomate"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:border-emerald-400"
            />

            <textarea
              value={ingredientesManual}
              onChange={(e) => setIngredientesManual(e.target.value)}
              placeholder="Ingredientes (opcional)"
              rows={2}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:border-emerald-200"
            />

            <textarea
              value={recetaManual}
              onChange={(e) => setRecetaManual(e.target.value)}
              placeholder="Instrucciones o receta (opcional)"
              rows={2}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:border-emerald-200"
            />

            <div className="flex flex-col gap-2">
              <button
                onClick={handleTexto}
                className="bg-emerald-500 text-white font-semibold rounded-lg px-4 py-2 hover:bg-emerald-600"
              >
                Enviar
              </button>
              <button
                onClick={() => setMostrarInputManual(false)}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {platoDetectado && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center space-y-4">
            <h3 className="text-lg font-bold text-gray-800">
              ¿Dónde quieres añadir este plato?
            </h3>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">{platoDetectado.plato}</span> – {platoDetectado.calorias} kcal
            </p>

            <div className="grid grid-cols-2 gap-2">
              {MOMENTOS.map((momento) => (
                <button
                  key={momento}
                  onClick={() => insertarPlato(momento)}
                  className="bg-emerald-100 text-emerald-800 font-semibold rounded-lg px-4 py-2 hover:bg-emerald-200 transition"
                >
                  {momento}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPlatoDetectado(null)}
              className="text-sm text-gray-400 hover:text-gray-600 mt-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
