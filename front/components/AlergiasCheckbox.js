import { alergias } from "@/data/options";

export default function AlergiasCheckbox({
  seleccionadas,
  onToggle,
  mostrarOtra,
  setMostrarOtra,
  otraValue,
  onOtraChange,
}) {
  return (
    <div>
      <div className="font-semibold text-gray-700 mb-2">
        ¿Tienes alguna alergia o intolerancia alimentaria?
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
        {alergias.map(item => (
          <label
            key={item}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition select-none
              ${seleccionadas.includes(item) ? "bg-emerald-50 border-emerald-300 font-semibold" : "bg-emerald-50/30 border-emerald-100"}
            `}
          >
            <input
              type="checkbox"
              checked={seleccionadas.includes(item)}
              onChange={() => onToggle(item)}
              className="accent-emerald-500 w-4 h-4"
            />
            {item}
          </label>
        ))}
        <label
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition select-none
            ${mostrarOtra ? "bg-emerald-50 border-emerald-300 font-semibold" : "bg-emerald-50/30 border-emerald-100"}
          `}
        >
          <input
            type="checkbox"
            checked={mostrarOtra}
            onChange={() => {
              setMostrarOtra(!mostrarOtra);
              if (!mostrarOtra) onOtraChange({ target: { value: "" } });
            }}
            className="accent-emerald-500 w-4 h-4"
          />
          Otra
        </label>
      </div>
      {mostrarOtra && (
        <input
          type="text"
          className="mt-2 w-full px-4 py-3 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none transition"
          placeholder="Especifica tu alergia o intolerancia"
          value={otraValue}
          onChange={onOtraChange}
        />
      )}
    </div>
  );
}
