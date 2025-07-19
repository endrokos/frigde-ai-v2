"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShoppingList from "@/components/ShoppingList";

export default function ListaCompraResultado() {
  const router = useRouter();
  const [lista, setLista] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("shoppingList");
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setLista(data.shopping_list || null);
      } catch {
        setLista(null);
      }
    }
  }, []);

  if (!lista) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-white via-emerald-50 to-lime-100">
        <p className="text-center text-gray-500">Loading shopping list...</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-tr from-white via-emerald-50 to-lime-100 py-8">
      <div className="bg-white/80 rounded-3xl shadow-xl p-8 w-full max-w-lg flex flex-col gap-4 border border-emerald-100">
        <h2 className="text-xl font-bold text-center text-emerald-600">Your shopping list</h2>
        <ShoppingList data={lista} />
        <button
          onClick={() => router.push("/menu-test")}
          className="mt-2 bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-600 font-semibold"
        >
          Back to menu
        </button>
      </div>
    </main>
  );
}
