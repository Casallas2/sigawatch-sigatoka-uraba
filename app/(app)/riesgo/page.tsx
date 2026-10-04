"use client";

import { useState } from "react";
import { Droplets, Thermometer, CloudRain, Wind, Clock, Lightbulb } from "lucide-react";
import { ScreenHeader, SectionTitle, Card } from "@/components/ui";
import { clima, estrategias, recomendaciones, tendencia, zonas } from "@/lib/data";

function nivel(indice: number) {
  if (indice >= 70) return { label: "Alto", color: "#d32f2f", text: "text-risk-high", bg: "bg-risk-high-bg" };
  if (indice >= 40) return { label: "Medio", color: "#ef7d00", text: "text-risk-mid", bg: "bg-risk-mid-bg" };
  return { label: "Bajo", color: "#43a047", text: "text-risk-low", bg: "bg-risk-low-bg" };
}

export default function RiesgoPage() {
  const [estrategiaId, setEstrategiaId] = useState(estrategias[0].id);
  const [zonaId, setZonaId] = useState(zonas[0].id);
  const estrategia = estrategias.find((e) => e.id === estrategiaId)!;
  const n = nivel(estrategia.indice);

  // Semicírculo del medidor
  const largo = Math.PI * 80;
  const avance = (estrategia.indice / 100) * largo;

  return (
    <div>
      <ScreenHeader title="Análisis de riesgo" subtitle="Actualizado hace 15 min" back="/inicio" />

      <div className="px-4 pb-8 pt-4">
        {/* Selector de zona */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {zonas.map((z) => (
            <button
              key={z.id}
              onClick={() => setZonaId(z.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                zonaId === z.id ? "border-brand-600 bg-brand-600 text-white" : "border-brand-200 bg-white text-ink"
              }`}
            >
              {z.nombre}
            </button>
          ))}
        </div>

        {/* Medidor */}
        <Card className="mt-3 text-center">
          <svg viewBox="0 0 200 115" className="mx-auto w-56">
            <path d="M20 100 A80 80 0 0 1 180 100" fill="none" stroke="#e7efe5" strokeWidth="16" strokeLinecap="round" />
            <path
              d="M20 100 A80 80 0 0 1 180 100"
              fill="none"
              stroke={n.color}
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${avance} ${largo}`}
              style={{ transition: "stroke-dasharray .5s ease, stroke .5s ease" }}
            />
            <text x="100" y="88" textAnchor="middle" fontSize="38" fontWeight="700" fill="#1b2a1d">
              {estrategia.indice}
            </text>
            <text x="100" y="108" textAnchor="middle" fontSize="11" fill="#5f6f61">
              de 100
            </text>
          </svg>
          <span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase ${n.bg} ${n.text}`}>
            Riesgo {n.label}
          </span>
          <p className="mt-2 text-xs text-muted">{zonas.find((z) => z.id === zonaId)!.finca}</p>
        </Card>

        {/* Estrategia de cálculo (patrón Strategy) */}
        <SectionTitle>Modelo de cálculo</SectionTitle>
        <div className="grid grid-cols-3 gap-1 rounded-2xl bg-brand-100/70 p-1">
          {estrategias.map((e) => (
            <button
              key={e.id}
              onClick={() => setEstrategiaId(e.id)}
              className={`rounded-xl py-2 text-sm font-semibold transition ${
                estrategiaId === e.id ? "bg-white text-brand-700 shadow-sm" : "text-muted"
              }`}
            >
              {e.nombre}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">{estrategia.descripcion}</p>

        {/* Variables climáticas */}
        <SectionTitle>Variables climáticas</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Variable icon={<Droplets className="size-5 text-info" />} label="Humedad relativa" valor={`${clima.humedad}%`} alerta />
          <Variable icon={<Thermometer className="size-5 text-risk-mid" />} label="Temperatura" valor={`${clima.temperatura} °C`} />
          <Variable icon={<CloudRain className="size-5 text-info" />} label="Lluvia 24 h" valor={`${clima.precipitacion} mm`} />
          <Variable icon={<Wind className="size-5 text-muted" />} label="Viento" valor={`${clima.viento} km/h ${clima.direccionViento}`} />
          <Variable icon={<Clock className="size-5 text-brand-600" />} label="Hoja mojada" valor={`${clima.hojaMojada} h/día`} alerta className="col-span-2" />
        </div>

        {/* Tendencia */}
        <SectionTitle>Tendencia 7 días</SectionTitle>
        <Card>
          <div className="flex h-32 items-end justify-between gap-2">
            {tendencia.map((t) => {
              const c = nivel(t.valor);
              return (
                <div key={t.dia} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] font-semibold text-muted">{t.valor}</span>
                  <div className="w-full rounded-t-md" style={{ height: `${t.valor}%`, background: c.color, opacity: t.dia === "Hoy" ? 1 : 0.55 }} />
                  <span className={`text-[11px] ${t.dia === "Hoy" ? "font-bold" : "text-muted"}`}>{t.dia}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <SectionTitle>Recomendaciones</SectionTitle>
        <Card className="space-y-3">
          {recomendaciones.map((r) => (
            <p key={r} className="flex gap-2.5 text-sm">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-risk-mid" /> {r}
            </p>
          ))}
        </Card>
      </div>
    </div>
  );
}

function Variable({
  icon,
  label,
  valor,
  alerta,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  valor: string;
  alerta?: boolean;
  className?: string;
}) {
  return (
    <Card className={`p-3.5 ${className}`}>
      <div className="flex items-center justify-between">
        {icon}
        {alerta && <span className="rounded-full bg-risk-high-bg px-2 py-0.5 text-[10px] font-bold text-risk-high">Crítico</span>}
      </div>
      <p className="mt-2 text-lg font-bold">{valor}</p>
      <p className="text-xs text-muted">{label}</p>
    </Card>
  );
}
