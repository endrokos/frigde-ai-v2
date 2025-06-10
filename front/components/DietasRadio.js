import { dietas } from "@/data/options";

export default function DietasRadio({ value, onChange, otraValue, onOtraChange }) {
  return (
    <div>
      <div className="font-semibold text-gray-700 mb-2">
        ¿Sigues alguna dieta especial?
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
        {dietas.map(item => (
          <label
            key={item}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition select-none
              ${value === item ? "bg-emerald-50 border-emerald-300 font-semibold" : "bg-emerald-50/30 border-emerald-100"}
            `}
          >
            <input
              type="radio"
              name="dieta"
              checked={value === item}
              onClick={() => onChange(value === item ? "" : item)}
              readOnly
              className="accent-emerald-500 w-4 h-4"
            />
            {item}
          </label>
        ))}
      </div>
      {value === "Otra" && (
        <input
          type="text"
          className="mt-2 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          placeholder="¿Cuál?"
          value={otraValue}
          onChange={onOtraChange}
        />
      )}
    </div>
  );
}
