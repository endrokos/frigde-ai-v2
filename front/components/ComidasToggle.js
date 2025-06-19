import { useState, useEffect } from "react";
import { comidas } from "@/data/options";

export default function ComidasToggle({ seleccionadas, onToggle, onConfigChange, values = {} }) {
  const [configOpen, setConfigOpen] = useState(null); // "Comida" o "Cena" o null
  const [platosPorComida, setPlatosPorComida] = useState({});
  const [postrePorComida, setPostrePorComida] = useState({});

  const handleClick = (item) => {
    const yaSeleccionado = seleccionadas.includes(item);
    onToggle(item);

    if ((item === "Comida" || item === "Cena") && !yaSeleccionado) {
      setConfigOpen(item);
    } else {
      setConfigOpen(null);
    }
  };

  const handlePlatos = (item, cantidad) => {
    setPlatosPorComida(prev => ({ ...prev, [item]: cantidad }));
  };

  const handlePostre = (item, quierePostre) => {
    setPostrePorComida(prev => ({ ...prev, [item]: quierePostre }));
  };

  const guardarConfig = () => {
    if (onConfigChange && configOpen) {
      onConfigChange({
        item: configOpen,
        platos: platosPorComida[configOpen] || 1,
        postre: !!postrePorComida[configOpen],
      });
    }
    setConfigOpen(null);
  };

  useEffect(() => {
    if (configOpen && values[configOpen]) {
      setPlatosPorComida(prev => ({
        ...prev,
        [configOpen]: values[configOpen].platos,
      }));
      setPostrePorComida(prev => ({
        ...prev,
        [configOpen]: values[configOpen].postre,
      }));
    }
  }, [configOpen]);

  const closeModal = () => setConfigOpen(null);

  return (
    <div>
      <h3 className="text-xl font-bold text-emerald-500 text-center mb-2">
        ¿Cuántas comidas al día quieres planificar?
      </h3>
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
          {comidas.map(item => (
            <button
              key={item}
              type="button"
              onClick={() => handleClick(item)}
              className={`flex flex-col items-center px-3 py-2 rounded-xl border transition select-none text-center
                ${
                  seleccionadas.includes(item)
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-emerald-50 border-emerald-200 text-emerald-60"
                }`}
            >
              <span className="text-3xl mb-1">
                {{
                  Desayuno: "🍳",
                  "Media mañana": "🥐",
                  Comida: "🍽️",
                  Merienda: "☕",
                  Cena: "🌙",
                }[item]}
              </span>
              {item}
            </button>
          ))}
          {/* Espaciador SOLO en desktop para centrar la última fila */}
          <div className="hidden md:block"></div>
        </div>
      </div>
      {/* MODAL CENTRAL */}
      {configOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-80 relative animate-fade-in pointer-events-auto">
      <button
        onClick={() => setConfigOpen(null)}
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-lg"
      >
        &times;
      </button>

      <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
        ¿Cuántos platos quieres en tu {configOpen.toLowerCase()}?
      </h3>

      <div className="flex justify-center gap-4 mb-5">
        {[1, 2].map(num => (
          <button
            key={num}
            type="button"
            onClick={() => handlePlatos(configOpen, num)}
            className={`
              px-4 py-2 rounded-lg border text-sm
              ${
                platosPorComida[configOpen] === num
                  ? "bg-emerald-200 border-emerald-500 font-bold"
                  : "bg-white border-gray-300"
              }
            `}
          >
            {num}
          </button>
        ))}
      </div>

      <h4 className="text-sm font-medium text-gray-700 mb-2 text-center">
        ¿Quieres postre?
      </h4>
      <div className="flex justify-center gap-4 mb-5">
        {["Sí", "No"].map(op => (
          <button
            key={op}
            type="button"
            onClick={() => handlePostre(configOpen, op === "Sí")}
            className={`
              px-4 py-2 rounded-lg border text-sm
              ${
                postrePorComida[configOpen] === (op === "Sí")
                  ? "bg-emerald-200 border-emerald-500 font-bold"
                  : "bg-white border-gray-300"
              }
            `}
          >
            {op}
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={guardarConfig}
          className="mt-1 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
