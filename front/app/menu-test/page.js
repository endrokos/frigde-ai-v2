"use client";

import { useState, useEffect } from "react";
import DiaSelector from "@/components/DiaSelector";
import ProgresoResumen from "@/components/ProgresoResumen";
import MacroCard from "@/components/MacroCard";
import MenuCards from "@/components/MenuCards";
import SubirPlatoDesdeImagen from "@/components/SubirPlatoDesdeImagen";

const MOMENTOS = ["Desayuno", "Media mañana", "Comida", "Merienda", "Cena"];

export default function MenuPage() {
  const [diaActivo, setDiaActivo] = useState(0);
  const [openSelector, setOpenSelector] = useState({});
  const [openIngredientes, setOpenIngredientes] = useState({});
  const [platoSeleccionado, setPlatoSeleccionado] = useState({});
  const [realizadas, setRealizadas] = useState({});
  const [resumen, setResumen] = useState({
    calorias: 0,
    proteinas: 0,
    hidratos: 0,
    grasas: 0,
  }); 
  const [dias, setDias] = useState([]);


  useEffect(() => {
    const stored = localStorage.getItem("dietaSemana");
    if (stored) {
      const dietaSemana = JSON.parse(stored);
      console.log("📥 Recuperado de localStorage:", dietaSemana);
      console.log("📥 dietaSemana.dias:", dietaSemana.dias);
      setDias(dietaSemana.dias || []);
    } else {
      console.error("❌ No se encontró 'dietaSemana' en localStorage");    }
  }, []);

  const guardarDiasEnLocalStorage = (nuevosDias) => {
    const stored = localStorage.getItem("dietaSemana");
    if (stored) {
      const data = JSON.parse(stored);
      data.dias = nuevosDias;
      localStorage.setItem("dietaSemana", JSON.stringify(data));
    }
  };

  const handleSelector = (key) => {
    setOpenSelector((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map(k => [k, false])),
      [key]: !prev[key],
    }));
    setOpenIngredientes((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map(k => [k, false])),
    }));
  };

  const seleccionarPlato = (key, idx) => {
    setPlatoSeleccionado((prev) => ({
      ...prev,
      [key]: idx,
    }));
    setOpenSelector((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  const toggleIngredientes = (key) => {
    setOpenIngredientes((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map(k => [k, false])),
      [key]: !prev[key],
    }));
    setOpenSelector((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map(k => [k, false])),
    }));
  };
  

  const toggleRealizada = (key, platos = []) => {
    setRealizadas(prev => {
      const yaEstaba = !!prev[key];
      const nuevoEstado = { ...prev, [key]: !yaEstaba };

      // Sumar o restar los valores de todos los platos
      const suma = platos.reduce(
        (acc, plato) => {
          acc.calorias += plato.calorias || 0;
          acc.proteinas += plato.proteinas || 0;
          acc.hidratos += plato.hidratos || 0;
          acc.grasas += plato.grasas || 0;
          return acc;
        },
        { calorias: 0, proteinas: 0, hidratos: 0, grasas: 0 }
      );

      setResumen(prevResumen => ({
        calorias: prevResumen.calorias + (yaEstaba ? -suma.calorias : suma.calorias),
        proteinas: prevResumen.proteinas + (yaEstaba ? -suma.proteinas : suma.proteinas),
        hidratos: prevResumen.hidratos + (yaEstaba ? -suma.hidratos : suma.hidratos),
        grasas: prevResumen.grasas + (yaEstaba ? -suma.grasas : suma.grasas),
      }));

      return nuevoEstado;
    });
  };

  const resumenDia = (() => {
    const comidas = dias[diaActivo]?.comidas || {};
    let totalCalorias = 0, totalProteinas = 0, totalHidratos = 0, totalGrasas = 0;
    Object.entries(comidas).forEach(([momento, opciones]) => {
      if (opciones && opciones.length > 0) {
        const key = `${diaActivo}-${momento}`;
        const idx = platoSeleccionado[key] ?? 0;
        const plato = opciones[idx] || opciones[0];
        totalCalorias += plato.calorias || 0;
        totalProteinas += plato.proteinas || 0;
        totalHidratos += plato.hidratos || 0;
        totalGrasas += plato.grasas || 0;
      }
    });
    return { calorias: totalCalorias, proteinas: totalProteinas, hidratos: totalHidratos, grasas: totalGrasas };
  })();

  const totalComidasDia = MOMENTOS.filter(m => (dias[diaActivo]?.comidas?.[m] || []).length > 0).length;
  const realizadasDia = MOMENTOS.filter(m => realizadas[`${diaActivo}-${m}`]).length;
  const progresoDia = totalComidasDia ? realizadasDia / totalComidasDia : 0;

  let totalComidasSemana = 0, realizadasSemana = 0;
  dias.forEach((dia, i) => {
    MOMENTOS.forEach(m => {
      if ((dia.comidas?.[m] || []).length > 0) {
        totalComidasSemana += 1;
        if (realizadas[`${i}-${m}`]) realizadasSemana += 1;
      }
    });
  });
  const progresoSemana = totalComidasSemana ? realizadasSemana / totalComidasSemana : 0;

  const macrosRealizadas = (() => {
    const comidas = dias[diaActivo]?.comidas || {};
    let cal = 0,
      prot = 0,
      hidr = 0,
      grasa = 0;

    Object.entries(comidas).forEach(([momento, opciones]) => {
      if (!Array.isArray(opciones)) return;

      const key = `${diaActivo}-${momento}`;
      if (!realizadas[key]) return;

      opciones.forEach(entrada => {
        if (typeof entrada !== "object") return;
        cal += entrada.calorias || 0;
        prot += entrada.proteinas || 0;
        hidr += entrada.hidratos || 0;
        grasa += entrada.grasas || 0;
      });
    });

    return { calorias: cal, proteinas: prot, hidratos: hidr, grasas: grasa };
  })();

  const objetivoCalorias = dias[diaActivo]?.objetivo_calorias || 0;
  const objetivoProteina = dias[diaActivo]?.objetivo_proteinas || 0;
  const objetivoHidratos = dias[diaActivo]?.objetivo_hidratos || 0;
  const objetivoGrasas   = dias[diaActivo]?.objetivo_grasas   || 0;

  const kcalRestantes = Math.max(objetivoCalorias - macrosRealizadas.calorias, 0);
  const protRestantes = Math.max(objetivoProteina - macrosRealizadas.proteinas, 0);
  const hidrRestantes = Math.max(objetivoHidratos - macrosRealizadas.hidratos, 0);
  const grasaRestantes = Math.max(objetivoGrasas - macrosRealizadas.grasas, 0);

  console.log("📦 Estado de dias:", dias);
  console.log("📦 Longitud de dias:", dias?.length);


  if (!dias || !dias.length) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-white via-emerald-50 to-lime-100 relative py-8">
        <div className="bg-white/80 rounded-3xl shadow-xl shadow-emerald-100 p-8 w-full max-w-3xl flex flex-col gap-6 border border-emerald-100 text-center text-lg">
          Cargando tu menú semanal...
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-tr from-white via-emerald-50 to-lime-100 relative py-8">
      <div className="bg-white/80 rounded-3xl shadow-xl shadow-emerald-100 p-8 w-full max-w-3xl flex flex-col gap-6 border border-emerald-100">
        <h2 className="text-3xl font-extrabold text-emerald-600 text-center mb-2">Tu menú semanal</h2>

        <DiaSelector dias={dias} diaActivo={diaActivo} setDiaActivo={setDiaActivo} />

        <ProgresoResumen
          progresoDia={progresoDia}
          realizadasDia={realizadasDia}
          totalComidasDia={totalComidasDia}
          progresoSemana={progresoSemana}
          realizadasSemana={realizadasSemana}
          totalComidasSemana={totalComidasSemana}
        />

        <div className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2">
          <MacroCard cantidad={kcalRestantes} macro="Calorías" icon="fire" color="#111" objetivo={objetivoCalorias} realizado={macrosRealizadas.calorias} />
          <MacroCard cantidad={protRestantes} macro="Proteína" icon="chicken" color="#EF4444" objetivo={objetivoProteina} realizado={macrosRealizadas.proteinas} />
          <MacroCard cantidad={hidrRestantes} macro="Hidratos" icon="wheat" color="#F59E42" objetivo={objetivoHidratos} realizado={macrosRealizadas.hidratos} />
          <MacroCard cantidad={grasaRestantes} macro="Grasas" icon="droplet" color="#22C55E" objetivo={objetivoGrasas} realizado={macrosRealizadas.grasas} />
        </div>

        <MenuCards
          diaActivo={diaActivo}
          dias={dias}
          platoSeleccionado={platoSeleccionado}
          handleSelector={handleSelector}
          seleccionarPlato={seleccionarPlato}
          openSelector={openSelector}
          openIngredientes={openIngredientes}
          toggleIngredientes={toggleIngredientes}
          realizadas={realizadas}
          toggleRealizada={toggleRealizada}
          setDias={setDias}
          guardarDiasEnLocalStorage={guardarDiasEnLocalStorage}
        />

        <SubirPlatoDesdeImagen
          diaActivo={diaActivo}
          setDias={setDias}
          setPlatoSeleccionado={setPlatoSeleccionado}
          guardarDiasEnLocalStorage={guardarDiasEnLocalStorage}
        />
      </div>
    </main>
  );
}
