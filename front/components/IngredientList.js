import { useState } from "react";

export default function IngredientList({ items }) {
  // Creamos un estado para saber qué ingredientes están tachados
  const [checked, setChecked] = useState(Array(items.length).fill(false));

  // Cambia el estado al hacer click en el checkbox
  const toggleCheck = idx => {
    setChecked(checked =>
      checked.map((v, i) => (i === idx ? !v : v))
    );
  };

  return (
    <ul className="list-disc ml-4 space-y-1 pr-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2">
          {/* Checkbox estilizado */}
          <button
            onClick={() => toggleCheck(idx)}
            className={`w-5 h-5 border rounded bg-white flex items-center justify-center 
              ${checked[idx] ? "border-green-500 bg-green-100" : "border-gray-400"}`}
            aria-label="Marcar como comprado"
            type="button"
          >
            {checked[idx] && (
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M5 10.5l4 4 6-7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          {/* Ingrediente tachado si está marcado */}
          <span className={`${checked[idx] ? "line-through text-gray-400" : ""}`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
