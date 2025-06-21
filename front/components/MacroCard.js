import ProgresoCircular from "./ProgresoCircular";

const excesoColorDefault = "#9C9C9C";

// Colores para el círculo principal (por macro)
const colorByIcon = {
  flame: "#111827",      // Negro (calorías)
  chicken: "#EF4444",    // Rojo (proteína)
  wheat: "#F59E42",      // Naranja (hidratos)
  droplet: "#22C55E",    // Verde (grasas)
};

// Colores para el círculo de exceso (por macro)
const excesoColorByIcon = {
  flame: "#CDCDCD",      // Gris claro
  chicken: "#7F1D1D",    // Granate oscuro
  wheat: "#FDE047",      // Amarillo
  droplet: "#065F46",    // Verde oscuro
};

// Colores de texto normal (por macro)
const textoColorByIcon = {
  flame: "#111827",      // Negro (calorías)
  chicken: "#EF4444",    // Rojo (proteína)
  wheat: "#F59E42",      // Naranja (hidratos)
  droplet: "#22C55E",    // Verde (grasas)
};

// Colores de texto en exceso (por macro)
const textoColorExcesoByIcon = {
  flame: "#CDCDCD",      // Gris claro
  chicken: "#7F1D1D",    // Granate oscuro
  wheat: "#FDE047",      // Amarillo
  droplet: "#065F46",    // Verde oscuro
};

// Opcional: para robustez si usas nombres diferentes
function normalizarIcon(icon) {
  if (icon === "fire") return "flame";
  if (icon === "avocado") return "droplet";
  return icon;
}

export default function MacroCard({
  cantidad,
  macro,
  icon,
  color,
  objetivo,
  realizado,
  excesoColor, // <-- puedes omitirlo, ya no es necesario
}) {
  const iconNorm = normalizarIcon(icon);

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

  // Colores para el círculo e icono
  const colorUsar = color || colorByIcon[iconNorm] || "#3B82F6";
  const excesoColorUsar = excesoColorByIcon[iconNorm] || excesoColorDefault;
  // Color del texto principal
  const textoColor = esExceso
    ? textoColorExcesoByIcon[iconNorm] || "#6366F1"
    : textoColorByIcon[iconNorm] || "#111";

  return (
    <div className="bg-white rounded-3xl p-4 flex flex-col items-center shadow-md min-w-[110px]">
      <div
        className="text-2xl font-extrabold mb-1"
        style={{ color: textoColor }}
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
        icon={iconNorm}
        color={colorUsar}
        excesoColor={excesoColorUsar}
      />
      <div className="text-xs text-gray-300 mt-1">
        Objetivo: {objetivo}{macro === "Calorías" ? "kcal" : "g"}
      </div>
    </div>
  );
}
