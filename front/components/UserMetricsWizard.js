import { useState } from "react";
import { sexos, nivelesActividad } from "@/data/options";
import Picker from "react-mobile-picker";
import { FaBed, FaWalking, FaRunning, FaDumbbell } from "react-icons/fa";

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
        <div className="mt-4 flex justify-center">
          <Picker
            value={{ altura: String(metrics.altura_cm || 170) }}
            onChange={v => setMetrics({ ...metrics, altura_cm: parseInt(v.altura) })}
            wheelMode="natural"
            height={160}
            itemHeight={36}
          >
            <Picker.Column name="altura">
              {Array.from({ length: 81 }, (_, i) => i + 140).map(n => (
                <Picker.Item key={n} value={String(n)}>
                  {({ selected }) => (
                    <div className={`text-center ${selected ? "text-emerald-600 font-semibold" : "text-gray-600"}`}>{n} cm</div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      ),
    },
    {
      key: "peso_kg",
      label: "¿Cuál es tu peso en kg?",
      input: (
        <div className="mt-4 flex justify-center">
          <Picker
            value={{ peso: String(metrics.peso_kg || 70) }}
            onChange={v => setMetrics({ ...metrics, peso_kg: parseInt(v.peso) })}
            wheelMode="natural"
            height={160}
            itemHeight={36}
          >
            <Picker.Column name="peso">
              {Array.from({ length: 121 }, (_, i) => i + 40).map(n => (
                <Picker.Item key={n} value={String(n)}>
                  {({ selected }) => (
                    <div className={`text-center ${selected ? "text-emerald-600 font-semibold" : "text-gray-600"}`}>{n} kg</div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      ),
    },
    {
      key: "nivel_actividad",
      label: "¿Cuál es tu nivel de actividad física?",
      input: (
        <div className="mt-4 grid grid-cols-2 gap-4 w-full">
          {[
            { label: "Sedentario", value: "sedentario", Icon: FaBed },
            { label: "Ligero", value: "ligero", Icon: FaWalking },
            { label: "Moderado", value: "moderado", Icon: FaRunning },
            { label: "Intenso", value: "intenso", Icon: FaDumbbell },
          ].map(({ label, value, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setMetrics({ ...metrics, nivel_actividad: value })}
              className={`flex flex-col items-center px-3 py-2 rounded-xl border transition select-none
                ${metrics.nivel_actividad === value
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-emerald-50 border-emerald-200 text-emerald-600"}`}
            >
              <Icon className="w-6 h-6 mb-1" />
              {label}
            </button>
          ))}
        </div>
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
