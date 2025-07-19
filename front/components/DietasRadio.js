import { dietas } from "@/data/options";

export default function DietasRadio({ seleccionadas, onToggle, mostrarOtra, setMostrarOtra, otraValue, onOtraChange }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 w-full">
        {dietas.map(item => (
          <label
            key={item}
            className={`flex flex-col items-center justify-center px-6 py-4 rounded-xl border cursor-pointer transition select-none text-center
              ${seleccionadas.includes(item) ? "bg-emerald-500 text-white border-emerald-500" : "bg-emerald-50 border-emerald-200 text-emerald-600"}
            `}
          >
            <input
              type="checkbox"
              checked={seleccionadas.includes(item)}
              onChange={() => onToggle(item)}
              className="accent-emerald-500 w-4 h-4 hidden"
            />
            <span className="text-lg">{item}</span>
          </label>
        ))}
        <label
          className={`col-span-3 flex flex-col items-center justify-center px-3 py-2 rounded-xl border cursor-pointer transition select-none text-center
            ${mostrarOtra ? "bg-emerald-500 text-white border-emerald-500" : "bg-emerald-50 border-emerald-200 text-emerald-600"}
          `}
        >
          <input
            type="checkbox"
            checked={mostrarOtra}
            onChange={() => {
              setMostrarOtra(!mostrarOtra);
              if (!mostrarOtra) onOtraChange({ target: { value: "" } });
            }}
            className="accent-emerald-500 w-4 h-4 hidden"
          />
          <span>Other</span>
        </label>
      </div>
      {mostrarOtra && (
        <input
          type="text"
          className="mt-2 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          placeholder="Specify the diet you follow"
          value={otraValue}
          onChange={onOtraChange}
        />
      )}
    </div>
  );
}
