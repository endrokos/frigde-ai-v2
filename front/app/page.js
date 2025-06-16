"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { generarDietasSemana } from "@/data/generarDietasSemana";

// Componentes
import ObjetivoSelect from "@/components/ObjetivoSelect";
import AlergiasCheckbox from "@/components/AlergiasCheckbox";
import DietasRadio from "@/components/DietasRadio";
import ComidasToggle from "@/components/ComidasToggle";
import UserMetricsWizard from "@/components/UserMetricsWizard";

export default function Home() {
  const router = useRouter();

  // Estados principales
  const [stage, setStage] = useState("intro");
  const [showForm, setShowForm] = useState(false);
  const [objetivo, setObjetivo] = useState("");
  const [objetivoOtro, setObjetivoOtro] = useState("");
  const [alergiasSeleccionadas, setAlergiasSeleccionadas] = useState([]);
  const [mostrarAlergiaOtra, setMostrarAlergiaOtra] = useState(false);
  const [alergiaOtra, setAlergiaOtra] = useState("");
  const [dieta, setDieta] = useState("");
  const [dietaOtra, setDietaOtra] = useState("");
  const [noGusta, setNoGusta] = useState("");
  const [comidasSeleccionadas, setComidasSeleccionadas] = useState([]);

  const [userMetrics, setUserMetrics] = useState({
    sexo: "",
    edad: "",
    altura_cm: "",
    peso_kg: "",
    nivel_actividad: "",
  });

  // ✅ Nuevos estados
  const [postreComida, setPostreComida] = useState(true);
  const [postreCena, setPostreCena] = useState(false);

  const handleAlergiaChange = (item) => {
    setAlergiasSeleccionadas(prev =>
      prev.includes(item)
        ? prev.filter(a => a !== item)
        : [...prev, item]
    );
  };

  const handleComidasChange = (item) => {
    setComidasSeleccionadas(prev =>
      prev.includes(item)
        ? prev.filter(c => c !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let notRichFoods = noGusta
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);

    let alergias = [...alergiasSeleccionadas];
    if (mostrarAlergiaOtra && alergiaOtra.trim()) {
      alergias.push(alergiaOtra.trim());
    }

    let dietaFinal = dieta === "Otra" && dietaOtra.trim()
      ? dietaOtra.trim()
      : dieta;

    let objetivoFinal = objetivo === "Otro" && objetivoOtro.trim()
      ? objetivoOtro.trim()
      : objetivo;

    const tiene = (momento) => comidasSeleccionadas.includes(momento);

  const payload = {
      menu_goal: objetivoFinal,
      user_metrics: userMetrics,
      meals: comidasSeleccionadas,
      allergies: alergias.length > 0 ? alergias : [""],
      diet: dietaFinal || "",
      not_rich_foods: notRichFoods.length > 0 ? notRichFoods : [""],
      numero_de_platos_comida: tiene("Comida") ? 2 : 0,
      postre_comida: postreComida ? "si" : "no",
      numero_de_platos_cena: tiene("Cena") ? 1 : 0,
      postre_cena: postreCena ? "si" : "no",
    };

    try {
      const dietaSemana = await generarDietasSemana(payload);
      localStorage.setItem("dietaSemana", JSON.stringify(dietaSemana.menu));
      router.push("/menu-test");
    } catch (err) {
      console.error(err);
      alert("Hubo un error generando la dieta.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-10 bg-gradient-to-tr from-emerald-100 via-white to-lime-100 relative overflow-hidden">
      <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] bg-emerald-200 rounded-full opacity-30 blur-2xl" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-lime-200 rounded-full opacity-30 blur-2xl" />

      <div
        className={`
          relative z-10 bg-white/90 shadow-2xl rounded-3xl px-10 py-12 flex flex-col items-center gap-7
          backdrop-blur-sm border border-emerald-100 transition-all duration-500
          max-w-2xl w-full
          ${showForm ? "scale-105 shadow-3xl -translate-y-8" : ""}
        `}
        style={{
          filter: showForm ? "drop-shadow(0 15px 40px rgba(52,211,153,0.15))" : undefined,
        }}
      >
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-300 to-lime-300 shadow-lg mb-2">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-700">
            <path d="M12 21c4.97 0 9-3.806 9-8.5S16.97 4 12 4 3 7.806 3 12.5 7.03 21 12 21z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8.5 14l2.5-3 2 2.5 2.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center leading-tight">
          Bienvenido al <span className="text-emerald-600">Generador de Dietas</span>
        </h1>
        <p className="text-lg text-gray-500 text-center max-w-2xl">
          Crea tu plan alimenticio ideal, mejora tu salud y alcanza tus objetivos de manera sencilla y personalizada.
        </p>

        {!showForm && (
          <button
            className="bg-emerald-500 text-white text-xl px-12 py-4 rounded-2xl shadow-lg hover:bg-emerald-600 hover:scale-105 active:scale-95 transition-all cursor-pointer font-semibold tracking-wide"
            onClick={() => {
              setShowForm(true);
              setStage("metrics");
            }}
          >
            Crear una dieta
          </button>
        )}

        {showForm && stage === "metrics" && (
          <UserMetricsWizard onComplete={(data) => {
            setUserMetrics(data);
            setStage("form");
          }} />
        )}

        {showForm && stage === "form" && (
          <form
            className="flex flex-col gap-6 w-full max-w-2xl py-4 mx-auto animate-fade-in"
            onSubmit={handleSubmit}
          >
            <ObjetivoSelect
              value={objetivo}
              onChange={e => setObjetivo(e.target.value)}
              otroValue={objetivoOtro}
              onOtroChange={e => setObjetivoOtro(e.target.value)}
            />
            <AlergiasCheckbox
              seleccionadas={alergiasSeleccionadas}
              onToggle={handleAlergiaChange}
              mostrarOtra={mostrarAlergiaOtra}
              setMostrarOtra={setMostrarAlergiaOtra}
              otraValue={alergiaOtra}
              onOtraChange={e => setAlergiaOtra(e.target.value)}
            />
            <DietasRadio
              value={dieta}
              onChange={setDieta}
              otraValue={dietaOtra}
              onOtraChange={e => setDietaOtra(e.target.value)}
            />
            <label className="font-semibold text-gray-700">
              ¿Hay algún alimento que no te guste o no quieras incluir?
              <textarea
                className="mt-2 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition resize-none"
                placeholder="Por ejemplo: Pimiento, setas, pescado azul..."
                rows={2}
                value={noGusta}
                onChange={e => setNoGusta(e.target.value)}
              />
            </label>
            <ComidasToggle
              seleccionadas={comidasSeleccionadas}
              onToggle={handleComidasChange}
            />

            {/* ✅ NUEVOS CHECKBOXES para postres */}
            {comidasSeleccionadas.includes("Comida") && (
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={postreComida}
                  onChange={e => setPostreComida(e.target.checked)}
                  className="accent-emerald-600"
                />
                ¿Quieres postre en la comida?
              </label>
            )}
            {comidasSeleccionadas.includes("Cena") && (
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={postreCena}
                  onChange={e => setPostreCena(e.target.checked)}
                  className="accent-emerald-600"
                />
                ¿Quieres postre en la cena?
              </label>
            )}

            <button
              type="submit"
              className="mt-2 bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 active:scale-95 transition-all shadow-lg"
            >
              Generar mi dieta
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
