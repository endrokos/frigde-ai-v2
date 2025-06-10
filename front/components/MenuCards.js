import { AnimatePresence, motion } from "framer-motion";
import { List, ChevronDown, Check } from "lucide-react";
import ChickenIcon from "./icons/ChickenIcon";
import WheatIcon from "./icons/WheatIcon";
import AvocadoIcon from "./icons/AvocadoIcon";


// Colores para el texto
const COLOR_PROTEINA = "#EF4444";   // Rojo fuerte
const COLOR_HIDRATOS = "#F59E42";   // Naranja fuerte
const COLOR_GRASAS = "#22C55E";     // Verde fuerte
const COLOR_KCAL = "#111111";       // Negro

// Colores pastel para los fondos de recuadro
const BG_PROTEINA = "#FEE2E2";   // Rojo claro
const BG_HIDRATOS = "#FEF6E7";   // Naranja claro
const BG_GRASAS = "#DCFCE7";     // Verde claro

const colorPorMomento = {
  "Desayuno": "bg-yellow-200 text-yellow-800",
  "Media mañana": "bg-orange-200 text-orange-800",
  "Comida": "bg-green-200 text-green-800",
  "Merienda": "bg-pink-200 text-pink-800",
  "Cena": "bg-indigo-200 text-indigo-800",
};

const MOMENTOS = ["Desayuno", "Media mañana", "Comida", "Merienda", "Cena"];

export default function MenuCards({
  diaActivo,
  dias,
  platoSeleccionado,
  handleSelector,
  seleccionarPlato,
  openSelector,
  openIngredientes,
  toggleIngredientes,
  realizadas,
  toggleRealizada,
}) {
  if (!dias || !dias.length || !dias[diaActivo]) {
    return (
      <div className="text-center text-lg py-10">Cargando tu menú...</div>
    );
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
          const openIng = !!openIngredientes[key];
          const colorBadge = colorPorMomento[momento] || "bg-gray-200 text-gray-700";
          const realizada = !!realizadas[key];

          if (!dias.length || !dias[diaActivo]) {
          return (
            <main>
              <div className="text-center text-lg py-10">Cargando tu menú...</div>
            </main>
          );
        }


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
                {/* TOP: info y botón selector */}
                <div
                  className="w-full flex items-center justify-between gap-3 p-4 rounded-2xl cursor-pointer select-none"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelector(key)}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") handleSelector(key); }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Círculo check */}
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); toggleRealizada(key); }}
                      className={`
                        mr-2 flex items-center justify-center w-6 h-6 rounded-full border-2
                        ${realizada ? "bg-emerald-100 border-emerald-400" : "bg-white border-gray-200"}
                        hover:bg-emerald-50 transition
                      `}
                      tabIndex={-1}
                      aria-label={realizada ? "Comida realizada" : "Marcar como realizada"}
                    >
                      {realizada && (
                        <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} />
                      )}
                    </button>
                    {/* Badge de momento */}
                    <span className={`font-semibold text-sm px-3 py-1 rounded-full ${colorBadge} whitespace-nowrap`}>
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
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openSel ? "rotate-180" : ""} text-gray-400`} />
                  </div>
                </div>

                {/* MACROS + BOTÓN INGREDIENTES */}
                <div className="flex items-center justify-between gap-3 px-6 pt-1 pb-2">
                  {/* Macros */}
                  <div className="flex gap-2">
                    <div
                      className="rounded-xl px-2 py-1 flex items-center gap-1 text-xs"
                      style={{ background: BG_PROTEINA }}
                    >
                      <span className="font-bold" style={{ color: COLOR_PROTEINA }}>{plato.proteinas}g</span>
                      <ChickenIcon width={16} height={16} color={COLOR_PROTEINA} />
                    </div>
                    <div
                      className="rounded-xl px-2 py-1 flex items-center gap-1 text-xs"
                      style={{ background: BG_HIDRATOS }}
                    >
                      <span className="font-bold" style={{ color: COLOR_HIDRATOS }}>{plato.hidratos}g</span>
                      <WheatIcon width={16} height={16} color={COLOR_HIDRATOS} />
                    </div>
                    <div
                      className="rounded-xl px-2 py-1 flex items-center gap-1 text-xs"
                      style={{ background: BG_GRASAS }}
                    >
                      <span className="font-bold" style={{ color: COLOR_GRASAS }}>{plato.grasas}g</span>
                      <AvocadoIcon width={16} height={16} color={COLOR_GRASAS} />
                    </div>
                  </div>
                  {/* Botón ingredientes */}
                  <button
                    type="button"
                    onClick={() => toggleIngredientes(key)}
                    className={`
                      bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1
                      text-gray-400 font-semibold text-xs shadow hover:text-emerald-600 hover:bg-emerald-50
                      transition-all duration-150 z-30
                    `}
                    tabIndex={-1}
                  >
                    <List className="w-4 h-4" />
                    <span className="font-medium">{openIng ? "Ocultar" : "Ver"} ingredientes</span>
                  </button>
                </div>

                {/* Ingredientes desplegable */}
                <AnimatePresence>
                  {openIng && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.17 }}
                      className="px-8 pb-4 list-disc text-gray-700 text-base font-light overflow-hidden bg-white rounded-xl"
                    >
                      {plato.ingredientes.map((ing, idx) => (
                        <li key={ing + idx}>{ing}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Dropdown en posición absoluta sobre el resto */}
              <AnimatePresence>
                {openSel && (
                  <motion.ul
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.16 }}
                    className="absolute left-0 right-0 z-50 mt-2 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden"
                    style={{
                      top: "100%",
                      minWidth: "100%",
                    }}
                  >
                    {opciones.map((op, idx) =>
                      idx === seleccionado ? null : (
                        <li
                          key={op.plato + idx}
                          className="w-full hover:bg-emerald-50 px-6 py-3 cursor-pointer flex items-center justify-between gap-2"
                          onClick={() => seleccionarPlato(key, idx)}
                        >
                          <span className="font-semibold text-emerald-700">{op.plato}</span>
                          <div className="flex gap-2">
                            <div
                              className="rounded-xl px-2 py-1 flex items-center gap-1 text-xs"
                              style={{ background: BG_PROTEINA }}
                            >
                              <ChickenIcon width={16} height={16} color={COLOR_PROTEINA} />
                              <span className="font-bold" style={{ color: COLOR_PROTEINA }}>{plato.proteinas}g</span>
                            </div>
                            <div
                              className="rounded-xl px-2 py-1 flex items-center gap-1 text-xs"
                              style={{ background: BG_HIDRATOS }}
                            >
                              <WheatIcon width={16} height={16} color={COLOR_HIDRATOS} />
                              <span className="font-bold" style={{ color: COLOR_HIDRATOS }}>{plato.hidratos}g</span>
                            </div>
                            <div
                              className="rounded-xl px-2 py-1 flex items-center gap-1 text-xs"
                              style={{ background: BG_GRASAS }}
                            >
                              <AvocadoIcon width={16} height={16} color={COLOR_GRASAS} />
                              <span className="font-bold" style={{ color: COLOR_GRASAS }}>{plato.grasas}g</span>
                          </div>
                            {/* Calorías */}
                            <span className="font-bold text-sm ml-1" style={{ color: COLOR_KCAL }}>
                              {op.calorias} kcal
                            </span>
                          </div>
                        </li>
                      )
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
