import FlameIcon from './icons/FlameIcon';
import ChickenIcon from './icons/ChickenIcon';
import WheatIcon from './icons/WheatIcon';
import AvocadoIcon from './icons/AvocadoIcon';

export default function ProgresoCircular({
  progreso,
  size = 56,
  icon = "flame",
  color,
  overshootColor = "#DC2626",
}) {
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;

  const progress = Math.min(progreso, 1);
  const overflow = progreso > 1 ? progreso % 1 : 0;
  const offset = circ * (1 - progress);
  const overflowOffset = circ * (1 - overflow);

  // Asignar color según icono si no se especifica explícitamente
  const colorByIcon = {
    flame: "#111",        // Calorías (negro)
    chicken: "#EF4444",   // Proteínas (rojo)
    droplet: "#22C55E",   // Grasas (verde clarito)
  };
  const iconColor = color || colorByIcon[icon] || "#3B82F6"; // fallback azul

  const icons = {
    flame: <FlameIcon width={24} height={24} color={iconColor} />,
    chicken: <ChickenIcon width={24} height={24} color={iconColor} />,
    wheat: <WheatIcon width={24} height={24} color={iconColor} />,
    droplet: <AvocadoIcon width={32} height={32} color={iconColor} />,
    calendar: (
      <svg className="w-6 h-6" fill="none" stroke={iconColor} strokeWidth={2} viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4" />
      </svg>
    ),
  };
  const Icon = icons[icon] || icons.flame;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E5E5"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={iconColor}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(.42,0,.58,1)" }}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={overshootColor}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={overflow > 0 ? overflowOffset : circ}
          strokeLinecap="round"
          opacity={overflow > 0 ? 1 : 0}
          style={{
            transition:
              "stroke-dashoffset 0.7s cubic-bezier(.42,0,.58,1), opacity 0.7s",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {Icon}
      </div>
    </div>
  );
}
