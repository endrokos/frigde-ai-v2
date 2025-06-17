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
        <div className="mt-4 flex justify-center gap-4 w-full">
          {sexos.slice(0, 2).map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setMetrics({ ...metrics, sexo: s.toLowerCase() })}
              className={`px-4 py-2 rounded-xl border transition select-none w-full
                ${metrics.sexo === s.toLowerCase()
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-emerald-50 border-emerald-200"}`}
            >
              {s}
            </button>
          ))}
        </div>
      ),
    },
    {
      key: "edad",
      label: "¿Cuál es tu edad?",
      input: (
        <div className="mt-4 w-full flex flex-col items-center">
          <input
            type="range"
            min="18"
            max="100"
            value={metrics.edad || 18}
            onChange={handleChange("edad")}
            className="w-full"
          />
          <span className="mt-2 text-lg font-semibold text-emerald-600">
            {metrics.edad || 18} años
          </span>
        </div>
      ),
    },
    {
      key: "altura_cm",
      label: "¿Cuál es tu altura en cm?",
      input: (
        <div className="mt-4 w-full flex justify-center">
          <select
            size={5}
            className="w-full text-center py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none overflow-y-scroll"
            value={metrics.altura_cm || 170}
            onChange={handleChange("altura_cm")}
          >
            {Array.from({ length: 81 }, (_, i) => i + 140).map(n => (
              <option key={n} value={n}>{n} cm</option>
            ))}
          </select>
        </div>
      ),
    },
    {
      key: "peso_kg",
      label: "¿Cuál es tu peso en kg?",
      input: (
        <div className="mt-4 w-full flex justify-center">
          <select
            size={5}
            className="w-full text-center py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none overflow-y-scroll"
            value={metrics.peso_kg || 70}
            onChange={handleChange("peso_kg")}
          >
            {Array.from({ length: 121 }, (_, i) => i + 40).map(n => (
              <option key={n} value={n}>{n} kg</option>
            ))}
          </select>
        </div>
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
