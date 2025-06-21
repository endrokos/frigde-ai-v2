import ProgresoCircular from "./ProgresoCircular";

export default function ProgresoResumen({ progresoDia, realizadasDia, totalComidasDia, progresoSemana, realizadasSemana, totalComidasSemana }) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
      {/* Día */}
      <div className="bg-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between shadow-md">
        <div>
          <div className="text-4xl font-extrabold text-emerald-700 mb-1">{Math.round(progresoDia * 100)}%</div>
          <div className="text-lg font-semibold text-gray-600">Día completado</div>
          <div className="text-sm text-gray-400">{realizadasDia} de {totalComidasDia} comidas</div>
        </div>
        <ProgresoCircular progreso={progresoDia} size={80} icon="flame" color="#10B981" />
      </div>
      {/* Semana */}
      <div className="bg-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between shadow-md">
        <div>
          <div className="text-4xl font-extrabold text-indigo-600 mb-1">{Math.round(progresoSemana * 100)}%</div>
          <div className="text-lg font-semibold text-gray-600">Semana completada</div>
          <div className="text-sm text-gray-400">{realizadasSemana} de {totalComidasSemana} comidas</div>
        </div>
        <ProgresoCircular progreso={progresoSemana} size={80} icon="calendar" color="#6366F1" />
      </div>
    </div>
  );
}