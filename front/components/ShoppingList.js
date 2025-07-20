import { useMemo, useState } from "react";
import { CollapsibleCard } from './CollapsibleCard';
import IngredientList from './IngredientList'; // 👈 Importa el componente


const CATEGORY_INFO = {
  verduras_y_frutas: {
    title: "Verduras y frutas",
    icon: "🥦",
    color: "text-green-700",
    bg: "bg-green-50",
  },
  cereales_y_derivados: {
    title: "Cereales y derivados",
    icon: "🌾",
    color: "text-yellow-700",
    bg: "bg-yellow-100",
  },
  proteinas: {
    title: "Proteínas",
    icon: "🍗",
    color: "text-red-700",
    bg: "bg-red-50",
  },
  lacteos: {
    title: "Lácteos",
    icon: "🧀",
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
  otros: {
    title: "Otros",
    icon: "🛒",
    color: "text-gray-700",
    bg: "bg-gray-100",
  },
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
  const [open, setOpen] = useState({});

  if (!list) return null;

  const handleToggle = (key) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Platos seleccionados */}
      {Array.isArray(list.platos_seleccionados) && (
        <CollapsibleCard
  open={!!open["platos"]}
  onClick={() => handleToggle("platos")}
  title="Platos seleccionados"
  icon="🍽️"
  color="text-emerald-600"
  bg="bg-white"
  scrollList={true}
>
  {list.platos_seleccionados.map((p, i) => (
    <li key={i}>{p}</li>
  ))}
</CollapsibleCard>

      )}

{Object.entries(CATEGORY_INFO).map(([key, info]) => (
  Array.isArray(list.lista_compra?.[key]) &&
  list.lista_compra[key].length > 0 && (
    <CollapsibleCard
      key={key}
      open={!!open[key]}
      onClick={() => handleToggle(key)}
      title={info.title}
      icon={info.icon}
      color={info.color}
      bg={info.bg}
      // 👇 NO pongas scrollList aquí
    >
      <IngredientList items={list.lista_compra[key]} />

    </CollapsibleCard>
  )
))}

    </div>
  );
}
