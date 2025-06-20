import ProgresoCircular from "./ProgresoCircular";

const excesoColor = "#9333ea"; // El mismo color que el stroke de la barra

export default function MacroCard({ cantidad, macro, icon, color, objetivo, realizado }) {
  const progreso = objetivo
    ? realizado <= objetivo
      ? realizado / objetivo
      : 1
    : 0;

  const extra = objetivo && realizado > objetivo
    ? (realizado - objetivo) / objetivo
    : 0;

  const esExceso = objetivo && realizado > objetivo;
  const cantidadMostrar = esExceso
    ? `-${mostrarBonito(realizado - objetivo)}`
    : mostrarBonito(cantidad);

  const subtitle =
    macro === "Calorías"
      ? "Calorías restantes"
      : `${macro} restantes`;

  function mostrarBonito(num) {
    if (typeof num !== "number") return num;
    return Number.isInteger(num) ? num : num.toFixed(1);
  }

  return (
    <div className="bg-white rounded-3xl p-4 flex flex-col items-center shadow-md min-w-[110px]">
      <div
        className="text-2xl font-extrabold mb-1"
        style={esExceso ? { color: excesoColor } : { color: "#111" }}
      >
        {cantidadMostrar}{macro === "Calorías" ? "kcal" : "g"}
      </div>
      <div className="text-xs text-gray-400 font-medium mb-1">
        {subtitle}
      </div>
      <ProgresoCircular
        progreso={progreso}
        exceso={extra}
        size={56}
        icon={icon}
        color={color}
      />
      <div className="text-xs text-gray-300 mt-1">
        Objetivo: {objetivo}{macro === "Calorías" ? "kcal" : "g"}
      </div>
    </div>
  );
}
