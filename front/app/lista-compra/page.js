"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generarListaCompra } from "@/data/generarListaCompra";

export default function ListaCompraPage() {
  const router = useRouter();
  const [diasMenu, setDiasMenu] = useState([]);
  const [menuCompleto, setMenuCompleto] = useState(null);
  const [opcion, setOpcion] = useState("");
  const [generando, setGenerando] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("dietaSemana");
    if (stored) {
      const data = JSON.parse(stored);
      setDiasMenu(data.dias || []);
      setMenuCompleto(data);
    }
  }, []);

  const handleGenerar = async () => {
    if (!menuCompleto) return;
    let dias;
    if (opcion === "todos") {
      dias = diasMenu.map(d => d.nombre);
    } else if (opcion === "entre") {
      dias = diasMenu.slice(0, 5).map(d => d.nombre);
    } else if (opcion === "fin") {
      dias = diasMenu.slice(5).map(d => d.nombre);
    } else {
      return;
    }
    try {
      setGenerando(true);
      const lista = await generarListaCompra(menuCompleto, dias);
      localStorage.setItem("shoppingList", JSON.stringify(lista));
      router.push("/lista-compra/resultado");
    } catch (err) {
      console.error(err);
      alert("Error generando la lista de la compra");
    } finally {
      setGenerando(false);
    }
  };

  const botonClase = (val) =>
    `px-4 py-2 rounded-full font-semibold shadow-md ${opcion===val?"bg-emerald-600 text-white":"bg-emerald-100 text-emerald-800 hover:bg-emerald-200"}`;

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-tr from-white via-emerald-50 to-lime-100 py-8">
      <div className="bg-white/80 rounded-3xl shadow-xl p-8 w-full max-w-sm flex flex-col gap-4 border border-emerald-100">
        <h2 className="text-xl font-bold text-center text-emerald-600">Generar lista de la compra</h2>
        <p className="text-center text-sm text-gray-600">¿Para qué días deseas la lista?</p>
        <div className="flex flex-col gap-2">
          <button className={botonClase("todos")} onClick={()=>setOpcion("todos")}>Todos</button>
          <button className={botonClase("entre")} onClick={()=>setOpcion("entre")}>Entre semana</button>
          <button className={botonClase("fin")} onClick={()=>setOpcion("fin")}>Fin de semana</button>
          <button className={botonClase("custom")} onClick={()=>router.push("/lista-compra/custom")}>Personalizar</button>
        </div>
        {opcion && opcion!=="custom" && (
          <button onClick={handleGenerar} className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 font-semibold" disabled={generando}>
            {generando ? "Generando..." : "Generar lista de la compra"}
          </button>
        )}
      </div>
    </main>
  );
}
