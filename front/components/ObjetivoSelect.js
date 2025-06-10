// /components/ObjetivoSelect.js
import { objetivos } from "@/data/options";

export default function ObjetivoSelect({ value, onChange, otroValue, onOtroChange }) {
  return (
    <label className="font-semibold text-gray-700">
      Objetivo del menú
      <select
        className="mt-2 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>Selecciona tu objetivo</option>
        {objetivos.map(obj => (
          <option value={obj} key={obj}>{obj}</option>
        ))}
      </select>
      {value === "Otro" && (
        <input
          type="text"
          className="mt-2 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          placeholder="Especifica tu objetivo"
          value={otroValue}
          onChange={onOtroChange}
        />
      )}
    </label>
  );
}
