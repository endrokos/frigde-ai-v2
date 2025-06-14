import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import ChickenIcon from "./icons/ChickenIcon";
import WheatIcon from "./icons/WheatIcon";
import AvocadoIcon from "./icons/AvocadoIcon";

const COLOR_PROTEINA = "#EF4444";
const COLOR_HIDRATOS = "#F59E42";
const COLOR_GRASAS = "#22C55E";
const COLOR_KCAL = "#111111";
const BG_PROTEINA = "#FEE2E2";
const BG_HIDRATOS = "#FEF6E7";
const BG_GRASAS = "#DCFCE7";

const colorPorMomento = {
  "Desayuno": "bg-yellow-200 text-yellow-800",
  "Media mañana": "bg-orange-200 text-orange-800",
  "Comida": "bg-green-200 text-green-800",
  "Merienda": "bg-pink-200 text-pink-800",
  "Cena": "bg-indigo-200 text-indigo-800",
};

const MOMENTOS = ["Desayuno", "Media mañana", "Comida", "Merienda", "Cena"];

async function enviarPeticion(endpoint, datos, key, setRecetasGeneradas) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const result = await response.json();
    if (result?.recipes) {
      setRecetasGeneradas(prev => ({
        ...prev,
        [key]: result.recipes,
      }));
    }
  } catch (error) {
    console.error("Error al enviar petición:", error);
  }
}

export default function MenuCards({
  diaActivo,
  dias,
  platoSeleccionado,
  handleSelector: externalHandleSelector,
  seleccionarPlato,
  realizadas,
  toggleRealizada,
}) {
  const [recetasGeneradas, setRecetasGeneradas] = useState({});
  const [alternativasPlato, setAlternativasPlato] = useState({});
  const [openSelector, setOpenSelector] = useState({});
  const [openAlternativas, setOpenAlternativas] = useState({});


  const handleSelector = (key) => {
    setOpenSelector(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!dias || !dias.length || !dias[diaActivo]) {
    return <div className="text-center text-lg py-10">Cargando tu menú...</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={diaActivo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-3 mt-2"
      >
        {MOMENTOS.map((momento) => {
          const key = `${diaActivo}-${momento}`;
          const opciones = dias[diaActivo].comidas[momento];
          if (!opciones) return null;
          const seleccionado = platoSeleccionado[key] ?? 0;
          const plato = opciones[seleccionado];
          const openSel = !!openSelector[key];
          const colorBadge = colorPorMomento[momento] || "bg-gray-200 text-gray-700";
          const realizada = !!realizadas[key];

          return (
            <div key={momento} className="relative">
              <div
                className={`
                  w-full flex flex-col rounded-2xl border border-emerald-100 shadow-md transition-all duration-150
                  hover:shadow-lg hover:border-emerald-300 group
                  ${openSel ? "ring-2 ring-emerald-400 border-emerald-400" : ""}
                  ${realizada ? "bg-emerald-50 border-emerald-300" : "bg-white"}
                `}
                style={{ minHeight: 64, zIndex: openSel ? 30 : 10 }}
              >
                {/* Header */}
                <div
                  className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl cursor-pointer select-none"
                  role="button"
                  tabIndex={0}
                  onClick={() => externalHandleSelector?.(key)}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") externalHandleSelector?.(key); }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); toggleRealizada(key); }}
                      className={`
                        mr-2 flex items-center justify-center w-6 h-6 rounded-full border-2
                        ${realizada ? "bg-emerald-100 border-emerald-400" : "bg-white border-gray-200"}
                        hover:bg-emerald-50 transition
                      `}
                      tabIndex={-1}
                    >
                      {realizada && (
                        <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
                      )}
                    </button>
                    <span className={`font-semibold text-sm px-3 py-1 rounded-full ${colorBadge}`}>
                      {momento}
                    </span>
                    <span className="font-bold text-base md:text-lg text-gray-900 truncate">
                      {plato.plato}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base mr-1" style={{ color: COLOR_KCAL }}>
                      {plato.calorias} <span className="text-xs font-medium">kcal</span>
                    </span>
                    {alternativasPlato[key] && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenAlternativas(prev => ({
                            ...prev,
                            [key]: !prev[key],
                          }));
                        }}
                        className="p-1 rounded-full hover:bg-gray-100 transition"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${openAlternativas[key] ? "rotate-180" : ""} text-gray-400`}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Macros + Botones */}
                <div className="flex items-center justify-between gap-3 px-6 pt-1 pb-2">
                  <div className="flex gap-2">
                    <div className="rounded-xl px-2 py-1 flex items-center gap-1 text-xs" style={{ background: BG_PROTEINA }}>
                      <span className="font-bold" style={{ color: COLOR_PROTEINA }}>{plato.proteinas}g</span>
                      <ChickenIcon width={16} height={16} color={COLOR_PROTEINA} />
                    </div>
                    <div className="rounded-xl px-2 py-1 flex items-center gap-1 text-xs" style={{ background: BG_HIDRATOS }}>
                      <span className="font-bold" style={{ color: COLOR_HIDRATOS }}>{plato.hidratos}g</span>
                      <WheatIcon width={16} height={16} color={COLOR_HIDRATOS} />
                    </div>
                    <div className="rounded-xl px-2 py-1 flex items-center gap-1 text-xs" style={{ background: BG_GRASAS }}>
                      <span className="font-bold" style={{ color: COLOR_GRASAS }}>{plato.grasas}g</span>
                      <AvocadoIcon width={16} height={16} color={COLOR_GRASAS} />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        enviarPeticion(
                          "http://127.0.0.1:8001/generate_recipe",
                          {
                            plato: plato.plato,
                            calories: plato.calorias,
                            protein: plato.proteinas,
                            carbohydrate: plato.hidratos,
                            fat: plato.grasas,
                          },
                          key,
                          setRecetasGeneradas
                        )
                      }
                      className="bg-emerald-100 px-3 py-1 rounded-full text-emerald-800 font-semibold text-xs hover:bg-emerald-200"
                    >
                      Generar receta
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        fetch("http://127.0.0.1:8001/obtain_more_recipes", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            plato: plato.plato,
                            calories: plato.calorias,
                            protein: plato.proteinas,
                            carbohydrate: plato.hidratos,
                            fat: plato.grasas,
                          }),
                        })
                          .then(res => res.json())
                          .then(data => {
                            if (data?.recipes) {
                              setAlternativasPlato(prev => ({
                                ...prev,
                                [key]: data.recipes,
                              }));
                              setOpenAlternativas(prev => ({
                                ...prev,
                                [key]: true,
                              }));
                            }
                          })
                          .catch(err => console.error("Error:", err))
                      }
                      className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 font-semibold text-xs hover:bg-blue-200"
                    >
                      Cambiar plato
                    </button>
                  </div>
                </div>

                {/* Desplegable de alternativas */}
                {openAlternativas[key] && alternativasPlato[key] && (
                  <div className="px-6 pb-4">
                    <div className="border border-blue-100 rounded-xl shadow-sm mt-2 overflow-hidden">
                      {alternativasPlato[key].map((op, idx) => (
                        <div
                          key={op.plato + idx}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center"
                          onClick={() => {
                            dias[diaActivo].comidas[momento][seleccionado] = op;
                            seleccionarPlato(key, seleccionado);
                            setAlternativasPlato(prev => ({
                              ...prev,
                              [key]: undefined
                            }));
                          }}
                        >
                          <span className="font-semibold text-blue-800">{op.plato}</span>
                          <span className="text-xs text-gray-600">{op.calorias} kcal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Receta e ingredientes */}
                {recetasGeneradas[key] && (
                  <div className="px-6 pb-4 pt-2 text-sm text-gray-700 space-y-2">
                    {Array.isArray(recetasGeneradas[key].recipe) && (
                      <div>
                        <span className="font-semibold text-emerald-700">Receta:</span>
                        <ol className="list-decimal list-inside space-y-2 mt-1">
                          {recetasGeneradas[key].recipe.map((paso, i) => (
                            <li key={i} className="text-gray-800">{paso}</li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {Array.isArray(recetasGeneradas[key].ingredients) && (
                      <div>
                        <span className="font-semibold text-emerald-700">Ingredientes:</span>
                        <ul className="list-disc list-inside mt-1">
                          {recetasGeneradas[key].ingredients.map((ing, idx) => (
                            <li key={idx}>
                              {typeof ing === "string"
                                ? ing
                                : `${ing.name ?? "Ingrediente"}${ing.quantity ? ` – ${ing.quantity}` : ""}`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
