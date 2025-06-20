import FlameIcon from './icons/FlameIcon';
import ChickenIcon from './icons/ChickenIcon';
import WheatIcon from './icons/WheatIcon';
import AvocadoIcon from './icons/AvocadoIcon';

export default function ProgresoCircular({
  progreso,
  exceso = 0,
  size = 56,
  icon = "flame",
  color,
  excesoColor = "#9333ea" // Puedes probar aquí otros morados
}) {
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;

  const colorByIcon = {
    flame: "#111",
    chicken: "#EF4444",
    wheat: "#F59E42",
    droplet: "#22C55E",
  };
  const iconColor = color || colorByIcon[icon] || "#3B82F6";

  const icons = {
    flame: <FlameIcon width={24} height={24} color={iconColor} />,
    chicken: <ChickenIcon width={24} height={24} color={iconColor} />,
    wheat: <WheatIcon width={24} height={24} color={iconColor} />,
    droplet: <AvocadoIcon width={32} height={32} color={iconColor} />,
  };
  const Icon = icons[icon] || icons.flame;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Fondo */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E5E5"
          strokeWidth={stroke}
        />
        {/* Barra principal */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={iconColor}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - Math.min(progreso, 1))}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(.42,0,.58,1)" }}
        />
        {/* Barra de exceso */}
        {exceso > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={excesoColor}
            strokeWidth={stroke}
            strokeDasharray={circ * Math.min(exceso, 1) + "," + circ}
            strokeDashoffset={circ * (1 - Math.min(progreso + exceso, 1))}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(.42,0,.58,1)" }}
          />
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {Icon}
      </div>
    </div>
  );
}
