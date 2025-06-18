import ProgresoCircular from "./ProgresoCircular";



export default function MacroCard({ cantidad, macro, icon, color, objetivo, realizado }) {
  const progreso = objetivo ? Math.min(realizado / objetivo, 1) : 0;
  // Texto de subtítulo adaptado
  const subtitle =
    macro === "Calorías"
      ? "Calorías restantes"
      : `${macro} restantes`;

  function mostrarBonito(num) {
    if (typeof num !== "number") return num;
    // Si es entero, lo mostramos como está. Si no, con un decimal.
    return Number.isInteger(num) ? num : num.toFixed(1);
  }


  return (
    <div className="bg-white rounded-3xl p-4 flex flex-col items-center shadow-md min-w-[110px]">
      <div className="text-2xl font-extrabold text-gray-900 mb-1">
        {mostrarBonito(cantidad)}{macro === "Calorías" ? "kcal" : "g"}
      </div>
      {/* Subtítulo minimalista */}
      <div className="text-xs text-gray-400 font-medium mb-1">
        {subtitle}
      </div>
      <ProgresoCircular progreso={progreso} size={56} icon={icon} color={color} />
      <div className="text-xs text-gray-300 mt-1">
        Objetivo: {objetivo}{macro === "Calorías" ? "kcal" : "g"}
      </div>
    </div>
  );
}
