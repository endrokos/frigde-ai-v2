import ProgresoCircular from "./ProgresoCircular";



export default function MacroCard({ cantidad, macro, icon, color, overshootColor, objetivo, realizado }) {
  const progresoBruto = objetivo ? realizado / objetivo : 0;
  // Texto de subtítulo adaptado
  const subtitle =
    macro === "Calories"
      ? "Calories remaining"
      : `${macro} remaining`;

  function mostrarBonito(num) {
    if (typeof num !== "number") return num;
    // Si es entero, lo mostramos como está. Si no, con un decimal.
    return Number.isInteger(num) ? num : num.toFixed(1);
  }


  return (
    <div className="bg-white rounded-3xl p-4 flex flex-col items-center shadow-md min-w-[110px]">
      <div className="text-2xl font-extrabold text-gray-900 mb-1">
        {mostrarBonito(cantidad)}{macro === "Calories" ? "kcal" : "g"}
      </div>
      {/* Subtítulo minimalista */}
      <div className="text-xs text-gray-400 font-medium mb-1">
        {subtitle}
      </div>
        <ProgresoCircular
          progreso={progresoBruto}
          size={56}
          icon={icon}
          color={color}
          overshootColor={overshootColor}
        />
      <div className="text-xs text-gray-300 mt-1">
        Goal: {objetivo}{macro === "Calories" ? "kcal" : "g"}
      </div>
    </div>
  );
}