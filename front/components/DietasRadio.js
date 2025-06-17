import { dietas } from "@/data/options";

export default function DietasRadio({ value, onChange, otraValue, onOtraChange }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-emerald-600 text-center mb-2">
        ¿Sigues alguna dieta especial?
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {dietas.map(item => (
          <label
            key={item}
            className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl border cursor-pointer transition select-none text-center
              ${value === item ? "bg-emerald-500 text-white border-emerald-500" : "bg-emerald-50 border-emerald-200 text-emerald-600"}
            `}
          >
            <input
              type="radio"
              name="dieta"
              checked={value === item}
              onClick={() => onChange(value === item ? "" : item)}
              readOnly
              className="accent-emerald-500 w-4 h-4 hidden"
            />
            <span className="text-lg">{item}</span>
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
