import { useState } from "react";
import { sexos, nivelesActividad, objetivos } from "@/data/options";
import ObjetivoSelect from "@/components/ObjetivoSelect";
import AlergiasCheckbox from "@/components/AlergiasCheckbox";
import DietasRadio from "@/components/DietasRadio";
import FlameIcon from "@/components/icons/FlameIcon";
import ChickenIcon from "@/components/icons/ChickenIcon";
import AvocadoIcon from "@/components/icons/AvocadoIcon";
import WheatIcon from "@/components/icons/WheatIcon";
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

  const [objetivo, setObjetivo] = useState("");
  const [objetivoOtro, setObjetivoOtro] = useState("");
  const [alergiasSeleccionadas, setAlergiasSeleccionadas] = useState([]);
  const [mostrarAlergiaOtra, setMostrarAlergiaOtra] = useState(false);
  const [alergiaOtra, setAlergiaOtra] = useState("");
  const [dieta, setDieta] = useState("");
  const [dietaOtra, setDietaOtra] = useState("");
  const [mostrarDietaOtra, setMostrarDietaOtra] = useState(false);
  const [dietasSeleccionadas, setDietasSeleccionadas] = useState([]);
  const [noGusta, setNoGusta] = useState("");

  const handleChange = (key) => (e) => {
    setMetrics({ ...metrics, [key]: e.target.value });
  };

  const handleAlergiaChange = (item) => {
    setAlergiasSeleccionadas(prev =>
      prev.includes(item)
        ? prev.filter(a => a !== item)
        : [...prev, item]
    );
  };

  const handleDietaChange = (item) => {
    setDietasSeleccionadas(prev =>
      prev.includes(item)
        ? prev.filter(a => a !== item)
        : [...prev, item]
    );
  };

  const next = () => {
    if (step >= preguntas.length - 1) {
      onComplete({
        user_metrics: metrics,
        objetivo,
        objetivoOtro,
        alergiasSeleccionadas,
        mostrarAlergiaOtra,
        alergiaOtra,
        dietasSeleccionadas,
        dietaOtra,
        noGusta,
      });
    } else {
      setStep(step + 1);
    }
  };

  const preguntas = [
    {
      key: "sexo",
      label: "What is your sex?",
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
      label: "What is your age?",
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
            {metrics.edad || 18} years
          </span>
        </div>
      ),
    },
    {
      key: "altura_cm",
      label: "What is your height in cm?",
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
      label: "What is your weight in kg?",
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
      label: "What is your physical activity level?",
      input: (
        <div className="mt-4 grid grid-cols-2 gap-4 w-full">
          {[
            { label: "Sedentary", value: "sedentario", Icon: FaBed },
            { label: "Light", value: "ligero", Icon: FaWalking },
            { label: "Moderate", value: "moderado", Icon: FaRunning },
            { label: "Intense", value: "intenso", Icon: FaDumbbell },
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
    {
      key: "objetivo",
      label: "Menu goal",
      input: (
        <div className="mt-4 grid grid-cols-2 gap-4 w-full">
          {[
            { label: "Lose weight", value: "Lose weight", Icon: FlameIcon },
            { label: "Gain muscle", value: "Gain muscle", Icon: ChickenIcon },
            { label: "Improve health", value: "Improve health", Icon: AvocadoIcon },
            { label: "Maintain weight", value: "Maintain weight", Icon: WheatIcon },
          ].map(({ label, value, Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setObjetivo(value);
                setMetrics({ ...metrics, objetivo: value });
              }}
              className={`flex flex-col items-center px-3 py-2 rounded-xl border transition select-none
                ${objetivo === value ? "bg-emerald-500 text-white border-emerald-500" : "bg-emerald-50 border-emerald-200 text-emerald-600"}`}
            >
              <Icon className="w-6 h-6 mb-1" />
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setObjetivo("Other");
              setMetrics({ ...metrics, objetivo: "Other" });
            }}
            className={`flex flex-col items-center px-3 py-2 rounded-xl border transition select-none col-span-2
              ${objetivo === "Other" ? "bg-emerald-500 text-white border-emerald-500" : "bg-emerald-50 border-emerald-200 text-emerald-600"}`}
          >
            Other
          </button>
        </div>
      ),
      extra:
        objetivo === "Other" ? (
          <input
            type="text"
            className="mt-3 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
            placeholder="Enter your goal"
            value={metrics.otroObjetivo || ""}
            onChange={e => setMetrics({ ...metrics, otroObjetivo: e.target.value })}
          />
        ) : null,
    },
    {
      key: "alergias",
      label: "Do you have any food allergies or intolerances?",
      input: (
        <AlergiasCheckbox
          seleccionadas={alergiasSeleccionadas}
          onToggle={handleAlergiaChange}
          mostrarOtra={mostrarAlergiaOtra}
          setMostrarOtra={setMostrarAlergiaOtra}
          otraValue={alergiaOtra}
          onOtraChange={e => setAlergiaOtra(e.target.value)}
        />
      ),
    },
    {
      key: "dieta",
      label: "Do you follow any special diet?",
      input: (
        <DietasRadio
          seleccionadas={dietasSeleccionadas}
          onToggle={handleDietaChange}
          mostrarOtra={mostrarDietaOtra}
          setMostrarOtra={setMostrarDietaOtra}
          otraValue={dietaOtra}
          onOtraChange={e => setDietaOtra(e.target.value)}
        />
      ),
    },
    {
      key: "nogusta",
      label: "Is there any food you dislike or want to exclude?",
      input: (
        <textarea
          className="mt-4 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition resize-none"
          placeholder="For example: Peppers, mushrooms, oily fish..."
          rows={2}
          value={noGusta}
          onChange={e => setNoGusta(e.target.value)}
        />
      ),
    },
  ];

  const pregunta = preguntas[step];


  const noValidar = ["peso_kg", "edad", "altura_cm", "alergias", "dieta", "nogusta"];
  const isStepValid = noValidar.includes(pregunta.key) || Boolean(metrics[pregunta.key]);

  const prev = () => {
    if (step > 0) setStep(step - 1);
};


  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-emerald-600 text-center">
        {pregunta.label}
      </h2>
      {pregunta.input}
      {pregunta.extra}
      <div className="flex justify-between items-center w-full mt-4">
        <span className="text-sm text-gray-500">Step {step + 1} of {preguntas.length}</span>
        <div className="flex gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={prev}
              className="bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-xl shadow hover:bg-gray-300 active:scale-95 transition"
            >
              Back
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={!isStepValid}
            className={`bg-emerald-600 text-white font-semibold px-6 py-2 rounded-xl shadow hover:bg-emerald-700 active:scale-95 transition
              ${!isStepValid ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {step >= preguntas.length - 1 ? "Continue" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
