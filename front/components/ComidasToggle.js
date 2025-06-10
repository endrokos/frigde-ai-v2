import { comidas } from "@/data/options";

export default function ComidasToggle({ seleccionadas, onToggle }) {
  return (
    <div>
      <div className="font-semibold text-gray-700 mb-2">
        ¿Cuántas comidas al día quieres planificar?
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
        {comidas.map(item => (
          <button
            type="button"
            key={item}
            onClick={() => onToggle(item)}
            className={`
              px-4 py-2 rounded-xl border transition
              ${
                seleccionadas.includes(item)
                  ? "bg-lime-100 border-lime-400 font-semibold scale-105"
                  : "bg-lime-50/50 border-lime-200"
              }
            `}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
