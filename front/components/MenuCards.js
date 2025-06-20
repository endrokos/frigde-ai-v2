import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import ChickenIcon from "./icons/ChickenIcon";
import WheatIcon from "./icons/WheatIcon";
import AvocadoIcon from "./icons/AvocadoIcon";

const COLOR_PROTEINA = "#EF4444";
const COLOR_HIDRATOS = "#F59E42";
const COLOR_GRASAS = "#22C55E";
const COLOR_KCAL     = "#111111";
const BG_PROTEINA    = "#FEE2E2";
const BG_HIDRATOS    = "#FEF6E7";
const BG_GRASAS      = "#DCFCE7";

const colorPorMomento = {
  Desayuno:       "bg-yellow-200 text-yellow-800",
  "Media mañana": "bg-orange-200 text-orange-800",
  Comida:         "bg-green-200  text-green-800",
  Merienda:       "bg-pink-200   text-pink-800",
  Cena:           "bg-indigo-200 text-indigo-800",
};

const cajaPorMomento = {
  Desayuno:       "bg-yellow-50 border-yellow-200",
  "Media mañana": "bg-orange-50 border-orange-200",
  Comida:         "bg-green-50  border-green-200",
  Merienda:       "bg-pink-50   border-pink-200",
  Cena:           "bg-indigo-50 border-indigo-200",
};

const MOMENTOS = ["Desayuno", "Media mañana", "Comida", "Merienda", "Cena"];

async function enviarPeticion(endpoint, datos, key, setRecetasGeneradas) {
  try {
    const res    = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const result = await res.json();
    if (result?.recipes) {
      setRecetasGeneradas(prev => ({
        ...prev,
        [key]: {
          ingredientes: result.recipes.ingredients,
          pasos:        result.recipes.recipe,
        }
      }));
    }
  } catch (err) {
    console.error("Error al generar receta:", err);
  }
}

export default function MenuCards({
  diaActivo,
  dias,
  seleccionarPlato,
  realizadas,
  toggleRealizada,
  setDias,
  guardarDiasEnLocalStorage,
}) {
  const [recetasGeneradas,  setRecetasGeneradas]   = useState({});
  const [openRecetas,       setOpenRecetas]        = useState({});
  const [alternativasPlato, setAlternativasPlato]  = useState({});
  const [openAlternativas,  setOpenAlternativas]   = useState({});
  const [loadingReceta,     setLoadingReceta]      = useState({});
  const [loadingCambio,     setLoadingCambio]      = useState({});

  if (!dias?.length || !dias[diaActivo]) {
    return <div className="text-center text-lg py-10">Cargando tu menú…</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={diaActivo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit   ={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="flex flex-col gap-6 mt-2"
      >
        {MOMENTOS.map(momento => {
          const key      = `${diaActivo}-${momento}`;
          const opciones = dias[diaActivo].comidas[momento];
          if (!Array.isArray(opciones)) return null;

          const entradasValidas = opciones.filter(e =>
            typeof e === "object" &&
            Object.keys(e).some(k =>
              ["plato","primer_plato","segundo_plato","postre"].includes(k)
            )
          );

          const realizada = !!realizadas[key];
          const badgeCls  = colorPorMomento[momento] || "bg-gray-200 text-gray-700";
          const cajaCls   = cajaPorMomento[momento] || "bg-emerald-50 border-emerald-200";

          return (
            <div
              key={key}
              className={`rounded-2xl border p-4 flex flex-col gap-2 ${cajaCls}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => toggleRealizada(key, entradasValidas)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    realizada ? "bg-emerald-100 border-emerald-400" : "bg-white border-gray-200"
                  }`}
                >
                  {realizada && <Check className="w-4 h-4 text-emerald-500" />}
                </button>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeCls}`}
                >
                  {momento}
                </span>
              </div>

              {entradasValidas.map((entrada, idx) =>
                Object.entries(entrada)
                  .filter(([k]) =>
                    ["plato","primer_plato","segundo_plato","postre"].includes(k)
                  )
                  .map(([tipo, nombre]) => {
                    const subKey    = `${key}-${idx}-${tipo}`;
                    const data      = recetasGeneradas[subKey];
                    const recOpen   = openRecetas[subKey];
                    const alt       = alternativasPlato[subKey] || [];
                    const altOpen   = openAlternativas[subKey];

                    const reemplazarEntrada = opcion => ({
                      ...entrada,
                      [tipo]:    opcion.plato,
                      calorias:  opcion.calorias   ?? entrada.calorias,
                      proteinas: opcion.proteinas  ?? entrada.proteinas,
                      hidratos:  opcion.hidratos   ?? entrada.hidratos,
                      grasas:    opcion.grasas     ?? entrada.grasas,
                    });

                    return (
                      <div key={subKey} className="relative">
                        <div className={`border border-emerald-100 shadow-sm rounded-xl transition-all ${
                          realizada ? "bg-white/70 border-emerald-300" : "bg-white"
                        }`}>
                          {/* cabecera */}
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="flex flex-col min-w-0">
                                <span className="font-bold text-lg text-gray-900 break-words">
                                  {nombre}
                                </span>
                              </div>
                            </div>
                            <span className="font-bold text-lg whitespace-nowrap" style={{ color: COLOR_KCAL }}>
                              {entrada.calorias||0}
                              <span className="text-xs font-medium"> kcal</span>
                            </span>
                          </div>

                          {/* macros y botones */}
                          <div className="flex items-center justify-between px-6 pb-2">
                            <div className="flex gap-2">
                              <div
                                className="px-2 py-1 rounded-xl flex items-center gap-1 text-xs"
                                style={{ background: BG_PROTEINA }}
                              >
                                <span
                                  className="font-bold"
                                  style={{ color: COLOR_PROTEINA }}
                                >
                                  {entrada.proteinas||0}g
                                </span>
                                <ChickenIcon width={16} height={16} color={COLOR_PROTEINA}/>
                              </div>
                              <div
                                className="px-2 py-1 rounded-xl flex items-center gap-1 text-xs"
                                style={{ background: BG_HIDRATOS }}
                              >
                                <span
                                  className="font-bold"
                                  style={{ color: COLOR_HIDRATOS }}
                                >
                                  {entrada.hidratos||0}g
                                </span>
                                <WheatIcon width={16} height={16} color={COLOR_HIDRATOS}/>
                              </div>
                              <div
                                className="px-2 py-1 rounded-xl flex items-center gap-1 text-xs"
                                style={{ background: BG_GRASAS }}
                              >
                                <span
                                  className="font-bold"
                                  style={{ color: COLOR_GRASAS }}
                                >
                                  {entrada.grasas||0}g
                                </span>
                                <AvocadoIcon width={16} height={16} color={COLOR_GRASAS}/>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={async()=> {
                                  setLoadingReceta(prev => ({...prev, [subKey]: true}));
                                  await enviarPeticion(
                                    "http://127.0.0.1:8001/generate_recipe",
                                    {
                                      plato:        nombre,
                                      calories:     entrada.calorias,
                                      protein:      entrada.proteinas,
                                      carbohydrate: entrada.hidratos,
                                      fat:          entrada.grasas,
                                    },
                                    subKey,
                                    setRecetasGeneradas
                                  );
                                  setOpenRecetas(prev=>({...prev,[subKey]:true}));
                                  setLoadingReceta(prev => ({...prev, [subKey]: false}));
                                }}
                                className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
                              >
                                {loadingReceta[subKey] ? "Generando..." : "Generar receta"}
                              </button>
                              <button
                                onClick={async()=> {
                                  setLoadingCambio(prev => ({...prev, [subKey]: true}));
                                  try {
                                    const res = await fetch("http://127.0.0.1:8001/obtain_more_recipes",{
                                      method:"POST",
                                      headers:{"Content-Type":"application/json"},
                                      body:JSON.stringify({
                                        plato:        nombre,
                                        calories:     entrada.calorias,
                                        protein:      entrada.proteinas,
                                        carbohydrate: entrada.hidratos,
                                        fat:          entrada.grasas,
                                      })
                                    });
                                    const data = await res.json();
                                    if(data.recipes){
                                      setAlternativasPlato(prev=>({...prev,[subKey]:data.recipes}));
                                      setOpenAlternativas(prev=>({...prev,[subKey]:true}));
                                    }
                                  } catch (err) {
                                    console.error(err);
                                  } finally {
                                    setLoadingCambio(prev => ({...prev, [subKey]: false}));
                                  }
                                }}
                                className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800"
                              >
                                {loadingCambio[subKey] ? "Cargando..." : "Cambiar plato"}
                              </button>
                            </div>
                          </div>

                          {/* dropdown alternativas */}
                          <AnimatePresence>
                            {altOpen && (
                              <motion.ul
                                initial={{ opacity:0, y:-8 }}
                                animate={{ opacity:1, y:0 }}
                                exit   ={{ opacity:0, y:-8 }}
                                transition={{ duration:0.15 }}
                                className="
                                  absolute left-0 top-full mt-2
                                  w-full
                                  bg-white border border-emerald-100 rounded-xl
                                  shadow-lg z-20
                                "
                              >
                                <li
                                  key="keep"
                                  onClick={() =>
                                    setOpenAlternativas(prev => ({ ...prev, [subKey]: false }))
                                  }
                                  className="text-sm font-medium text-center text-emerald-700 px-4 py-3 hover:bg-emerald-50 cursor-pointer"
                                >
                                  No cambiar plato actual
                                </li>
                                {alt.map((op,i)=>(
                                  <li
                                    key={i}
                                    onClick={() => {
                                      setDias(prev => {
                                        const copia = [...prev];
                                        copia[diaActivo].comidas[momento][idx] = reemplazarEntrada(op);
                                        guardarDiasEnLocalStorage(copia);
                                        return copia;
                                      });
                                      setOpenAlternativas(prev => ({...prev, [subKey]: false}));
                                    }}
                                    className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto_auto] items-center gap-2 px-4 py-3 hover:bg-emerald-50 cursor-pointer"
                                  >
                                    <span className="text-sm font-medium text-gray-900 truncate">
                                      {op.plato}
                                    </span>
                                    <span className="text-sm font-semibold" style={{ color: COLOR_KCAL }}>
                                      {op.calorias} kcal
                                    </span>
                                    <div
                                      className="rounded-full px-2 py-0.5 flex items-center gap-1 text-xs"
                                      style={{ background: BG_PROTEINA }}
                                    >
                                      <span className="font-bold" style={{ color: COLOR_PROTEINA }}>
                                        {op.proteinas}g
                                      </span>
                                      <ChickenIcon width={12} height={12} color={COLOR_PROTEINA}/>
                                    </div>
                                    <div
                                      className="rounded-full px-2 py-0.5 flex items-center gap-1 text-xs"
                                      style={{ background: BG_HIDRATOS }}
                                    >
                                      <span className="font-bold" style={{ color: COLOR_HIDRATOS }}>
                                        {op.hidratos}g
                                      </span>
                                      <WheatIcon width={12} height={12} color={COLOR_HIDRATOS}/>
                                    </div>
                                    <div
                                      className="rounded-full px-2 py-0.5 flex items-center gap-1 text-xs"
                                      style={{ background: BG_GRASAS }}
                                    >
                                      <span className="font-bold" style={{ color: COLOR_GRASAS }}>
                                        {op.grasas}g
                                      </span>
                                      <AvocadoIcon width={12} height={12} color={COLOR_GRASAS}/>
                                    </div>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>

                          {/* panel receta generada */}
                          {data && (
                            <>
                              <button
                                onClick={()=>setOpenRecetas(prev=>({...prev,[subKey]:!prev[subKey]}))}
                                className="absolute top-4 right-4"
                              >
                                <ChevronDown className={`w-5 h-5 transition-transform ${recOpen?"rotate-180":""}`}/>
                              </button>
                              <AnimatePresence initial={false}>
                                {recOpen && (
                                  <motion.div
                                    initial={{ height:0, opacity:0 }}
                                    animate={{ height:"auto", opacity:1 }}
                                    exit   ={{ height:0, opacity:0 }}
                                    transition={{ duration:0.2 }}
                                    className="border-t border-emerald-100 bg-white px-6 py-3 mt-2"
                                  >
                                    <p className="font-semibold text-sm mb-2">Ingredientes:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                                      {Array.isArray(data?.ingredientes) && data.ingredientes.map((ing, i)=>(
                                        <li key={i}>{ing.name} – {ing.quantity} {ing.item}</li>
                                      ))}
                                    </ul>
                                    <p className="font-semibold text-sm mb-2 mt-3">Pasos:</p>
                                    <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
                                      {data.pasos.map((paso,i)=>(
                                        <li key={i}>{paso}</li>
                                      ))}
                                    </ol>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          )}
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
