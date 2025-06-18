"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generarListaCompra } from "@/data/generarListaCompra";

export default function ListaCompraCustomPage() {
  const router = useRouter();
  const [diasMenu, setDiasMenu] = useState([]);
  const [menuCompleto, setMenuCompleto] = useState(null);
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("dietaSemana");
    if (stored) {
      const data = JSON.parse(stored);
      setDiasMenu(data.dias || []);
      setMenuCompleto(data);
    }
  }, []);

  const toggleDia = (nombre) => {
    setSeleccionados(prev => prev.includes(nombre) ? prev.filter(d => d !== nombre) : [...prev, nombre]);
  };

  const handleGenerar = async () => {
    if (!menuCompleto) return;
    try {
      await generarListaCompra(menuCompleto, seleccionados);
      alert("Lista de la compra solicitada");
    } catch (err) {
      console.error(err);
      alert("Error generando la lista de la compra");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-tr from-white via-emerald-50 to-lime-100 py-8">
      <div className="bg-white/80 rounded-3xl shadow-xl p-8 w-full max-w-sm flex flex-col gap-4 border border-emerald-100">
        <h2 className="text-xl font-bold text-center text-emerald-600">Selecciona los días</h2>
        <div className="flex flex-col gap-2">
          {diasMenu.map(d => (
            <label key={d.nombre} className="flex items-center gap-2 text-emerald-800 bg-emerald-100 rounded-lg px-3 py-2">
              <input type="checkbox" checked={seleccionados.includes(d.nombre)} onChange={()=>toggleDia(d.nombre)} />
              {d.nombre}
            </label>
          ))}
        </div>
        <button onClick={handleGenerar} className="mt-4 bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 font-semibold">Generar lista de la compra</button>
        <button onClick={()=>router.back()} className="text-sm text-gray-500 mt-2">Volver</button>
      </div>
    </main>
  );
}
