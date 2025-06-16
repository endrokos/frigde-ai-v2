import { useState } from "react";
import { sexos, nivelesActividad } from "@/data/options";

export default function UserMetricsWizard({ onComplete }) {
  const [step, setStep] = useState(0);
  const [metrics, setMetrics] = useState({
    sexo: "",
    edad: "",
    altura_cm: "",
    peso_kg: "",
    nivel_actividad: "",
  });

  const handleChange = (key) => (e) => {
    setMetrics({ ...metrics, [key]: e.target.value });
  };

  const next = () => {
    if (step >= preguntas.length - 1) {
      onComplete(metrics);
    } else {
      setStep(step + 1);
    }
  };

  const preguntas = [
    {
      key: "sexo",
      label: "¿Cuál es tu sexo?",
      input: (
        <select
          className="mt-4 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          value={metrics.sexo}
          onChange={handleChange("sexo")}
        >
          <option value="" disabled>Selecciona</option>
          {sexos.map(s => (
            <option key={s} value={s.toLowerCase()}>{s}</option>
          ))}
        </select>
      ),
    },
    {
      key: "edad",
      label: "¿Cuál es tu edad?",
      input: (
        <input
          type="number"
          className="mt-4 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          value={metrics.edad}
          onChange={handleChange("edad")}
        />
      ),
    },
    {
      key: "altura_cm",
      label: "¿Cuál es tu altura en cm?",
      input: (
        <input
          type="number"
          className="mt-4 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          value={metrics.altura_cm}
          onChange={handleChange("altura_cm")}
        />
      ),
    },
    {
      key: "peso_kg",
      label: "¿Cuál es tu peso en kg?",
      input: (
        <input
          type="number"
          className="mt-4 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          value={metrics.peso_kg}
          onChange={handleChange("peso_kg")}
        />
      ),
    },
    {
      key: "nivel_actividad",
      label: "¿Cuál es tu nivel de actividad física?",
      input: (
        <select
          className="mt-4 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          value={metrics.nivel_actividad}
          onChange={handleChange("nivel_actividad")}
        >
          <option value="" disabled>Selecciona</option>
          {nivelesActividad.map(n => (
            <option key={n} value={n.toLowerCase()}>{n}</option>
          ))}
        </select>
      ),
    },
  ];

  const pregunta = preguntas[step];

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-emerald-600 text-center">
        {pregunta.label}
      </h2>
      {pregunta.input}
      <div className="flex justify-between items-center w-full mt-4">
        <span className="text-sm text-gray-500">Paso {step + 1} de {preguntas.length}</span>
        <button
          type="button"
          onClick={next}
          className="bg-emerald-600 text-white font-semibold px-6 py-2 rounded-xl shadow hover:bg-emerald-700 active:scale-95 transition"
        >
          {step >= preguntas.length - 1 ? "Continuar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
