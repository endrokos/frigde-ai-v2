export default function DiaSelector({ dias, diaActivo, setDiaActivo }) {
  return (
    <div className="w-full flex justify-center overflow-x-auto py-2">
      <div className="flex gap-2 min-w-max px-2">
        {dias.map((dia, i) => (
          <button
            key={dia.nombre}
            onClick={() => setDiaActivo(i)}
            className={`
              px-4 py-2 rounded-full font-semibold border transition-all duration-200
              text-xl
              ${diaActivo === i
                ? "bg-emerald-500 text-white border-emerald-500 scale-110 shadow-sm"
                : "bg-white border-emerald-100 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"}
            `}
            style={{ minWidth: 70 }}
          >
            {dia.nombre[0].toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
