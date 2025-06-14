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
  const [mostrarOpcionesImagen, setMostrarOpcionesImagen] = useState(false);
  const fileInputRefGaleria = useRef(null);
  const fileInputRefCamara = useRef(null);

  const handleImagen = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setSubiendo(true);

    try {
      const res = await fetch("http://127.0.0.1:8001/calculate_macros", {
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
      guardarDiasEnLocalStorage(copia); // Guardar cambios
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
          onClick={() => setMostrarOpcionesImagen(true)}
          className="bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 font-semibold shadow-md"
        >
          {subiendo ? "Subiendo..." : "+ Añadir plato desde imagen"}
        </button>
      </div>

      {/* Opciones para elegir origen de la imagen */}
      {mostrarOpcionesImagen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Selecciona el origen de la imagen</h3>

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
                    setMostrarOpcionesImagen(false);
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
                    setMostrarOpcionesImagen(false);
                  }}
                />
              </label>
            </div>

            <button
              onClick={() => setMostrarOpcionesImagen(false)}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal para elegir momento */}
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
