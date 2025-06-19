import { useMemo } from "react";

const CATEGORY_INFO = {
  verduras_y_frutas: { title: "Verduras y frutas", icon: "🥦", color: "text-green-700" },
  cereales_y_derivados: { title: "Cereales y derivados", icon: "🌾", color: "text-yellow-700" },
  proteinas: { title: "Proteínas", icon: "🍗", color: "text-red-700" },
  lacteos: { title: "Lácteos", icon: "🧀", color: "text-blue-700" },
  otros: { title: "Otros", icon: "🛒", color: "text-gray-700" },
};

function normalize(data) {
  if (!data) return null;
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return data;
}

export default function ShoppingList({ data }) {
  const list = useMemo(() => normalize(data), [data]);
  if (!list) return null;

  return (
    <div className="flex flex-col gap-6">
      {Array.isArray(list.platos_seleccionados) && (
        <div className="bg-emerald-50 p-4 rounded-xl shadow">
          <h3 className="font-semibold text-emerald-600 mb-2 flex items-center gap-2">
            <span>🍽️</span>
            <span>Platos seleccionados</span>
          </h3>
          <ul className="list-disc ml-4 space-y-1">
            {list.platos_seleccionados.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}
      {Object.entries(CATEGORY_INFO).map(([key, info]) => (
        Array.isArray(list.lista_compra?.[key]) && list.lista_compra[key].length > 0 && (
          <div key={key} className="bg-white p-4 rounded-xl shadow border">
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${info.color}`}>
              <span>{info.icon}</span>
              <span>{info.title}</span>
            </h3>
            <ul className="list-disc ml-4 space-y-1">
              {list.lista_compra[key].map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  );
}
