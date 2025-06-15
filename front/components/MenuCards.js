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
        className="flex flex-col gap-6 mt-2"
      >
        {MOMENTOS.map((momento) => {
          const key = `${diaActivo}-${momento}`;
          const opciones = dias[diaActivo].comidas[momento];
          if (!opciones || !Array.isArray(opciones)) return null;

          const entradasValidas = opciones.filter((entrada) =>
            typeof entrada === "object" &&
            Object.keys(entrada).some(k => ["plato", "primer_plato", "segundo_plato", "postre"].includes(k))
          );

          const realizada = !!realizadas[key];
          const colorBadge = colorPorMomento[momento] || "bg-gray-200 text-gray-700";
          const mostrarCaja = ["Comida", "Cena"].includes(momento) && entradasValidas.length > 1;

          return (
            <div key={key} className={mostrarCaja ? "rounded-2xl border border-emerald-200 bg-emerald-50 p-4 flex flex-col gap-2" : "flex flex-col gap-4"}>
              {mostrarCaja && (
                <div className="flex items-center gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => toggleRealizada(key, entradasValidas)}
                    className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${realizada ? "bg-emerald-100 border-emerald-400" : "bg-white border-gray-200"} hover:bg-emerald-50 transition`}
                  >
                    {realizada && <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />}
                  </button>
                  <span className={`font-semibold text-sm px-3 py-1 rounded-full w-fit ${colorBadge}`}>{momento}</span>
                </div>
              )}
              {entradasValidas.map((entrada, idx) =>
                Object.entries(entrada)
                  .filter(([k]) => ["plato", "primer_plato", "segundo_plato", "postre"].includes(k))
                  .map(([tipo, nombre]) => {
                    const subKey = `${key}-${idx}-${tipo}`;

                    return (
                      <div key={subKey} className="relative">
                        <div className={`w-full flex flex-col rounded-xl border border-emerald-100 shadow-sm transition-all duration-150 ${realizada ? "bg-white/70 border-emerald-300" : "bg-white"}`}>
                          <div className="flex items-center justify-between gap-3 p-4 rounded-xl">
                            <div className="flex items-center gap-3 min-w-0">
                              {!mostrarCaja && (
                                <button
                                  type="button"
                                  onClick={() => toggleRealizada(key, [entrada])}
                                  className={`mr-2 flex items-center justify-center w-6 h-6 rounded-full border-2 ${realizada ? "bg-emerald-100 border-emerald-400" : "bg-white border-gray-200"} hover:bg-emerald-50 transition`}
                                >
                                  {realizada && <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />}
                                </button>
                              )}
                              {!mostrarCaja && <span className={`font-semibold text-sm px-3 py-1 rounded-full ${colorBadge}`}>{momento}</span>}
                              <span className="font-bold text-base md:text-lg text-gray-900 truncate">
                                {nombre} <span className="text-sm text-gray-500">({tipo})</span>
                              </span>
                            </div>
                            <span className="font-bold text-base mr-1" style={{ color: COLOR_KCAL }}>
                              {entrada.calorias || 0} <span className="text-xs font-medium">kcal</span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-3 px-6 pt-1 pb-2">
                            <div className="flex gap-2">
                              <div className="rounded-xl px-2 py-1 flex items-center gap-1 text-xs" style={{ background: BG_PROTEINA }}>
                                <span className="font-bold" style={{ color: COLOR_PROTEINA }}>{entrada.proteinas || 0}g</span>
                                <ChickenIcon width={16} height={16} color={COLOR_PROTEINA} />
                              </div>
                              <div className="rounded-xl px-2 py-1 flex items-center gap-1 text-xs" style={{ background: BG_HIDRATOS }}>
                                <span className="font-bold" style={{ color: COLOR_HIDRATOS }}>{entrada.hidratos || 0}g</span>
                                <WheatIcon width={16} height={16} color={COLOR_HIDRATOS} />
                              </div>
                              <div className="rounded-xl px-2 py-1 flex items-center gap-1 text-xs" style={{ background: BG_GRASAS }}>
                                <span className="font-bold" style={{ color: COLOR_GRASAS }}>{entrada.grasas || 0}g</span>
                                <AvocadoIcon width={16} height={16} color={COLOR_GRASAS} />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => enviarPeticion(
                                  "http://127.0.0.1:8001/generate_recipe",
                                  { plato: entrada },
                                  subKey,
                                  setRecetasGeneradas
                                )}
                                className="bg-emerald-100 px-3 py-1 rounded-full text-emerald-800 font-semibold text-xs hover:bg-emerald-200"
                              >
                                Generar receta
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  fetch("http://127.0.0.1:8001/obtain_more_recipes", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ plato: entrada }),
                                  })
                                    .then(res => res.json())
                                    .then(data => {
                                      if (data?.recipes) {
                                        setAlternativasPlato(prev => ({
                                          ...prev,
                                          [subKey]: data.recipes,
                                        }));
                                        setOpenAlternativas(prev => ({
                                          ...prev,
                                          [subKey]: true,
                                        }));
                                      }
                                    })
                                    .catch(err => console.error("Error obteniendo alternativas:", err));
                                }}
                                className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 font-semibold text-xs hover:bg-blue-200"
                              >
                                Cambiar plato
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
