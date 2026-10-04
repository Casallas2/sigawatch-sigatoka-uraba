"use client";

import { useState } from "react";
import { MapPin, Siren, CloudRain, TrendingUp, CheckSquare, Landmark } from "lucide-react";
import { ScreenHeader } from "@/components/ui";
import { alertasIniciales, type Alerta, type NivelAlerta } from "@/lib/data";

const estilos: Record<NivelAlerta, { card: string; borde: string; chip: string; etiqueta: string; dot: string }> = {
  critico: { card: "bg-risk-high-bg border-risk-high/30", borde: "bg-risk-high", chip: "text-risk-high", etiqueta: "CRÍTICO", dot: "bg-risk-high" },
  advertencia: { card: "bg-risk-mid-bg border-risk-mid/30", borde: "bg-risk-mid", chip: "bg-risk-mid-bg text-risk-mid", etiqueta: "ADVERTENCIA", dot: "bg-risk-mid" },
  info: { card: "bg-white border-brand-100", borde: "bg-transparent", chip: "bg-risk-low-bg text-risk-low", etiqueta: "INFO", dot: "bg-risk-low" },
};

const iconos: Record<Alerta["icono"], React.ReactNode> = {
  brote: <Siren className="size-5 text-risk-high" />,
  clima: <CloudRain className="size-5 text-info" />,
  progreso: <TrendingUp className="size-5 text-risk-mid" />,
  ok: <CheckSquare className="size-5 text-risk-low" />,
  ica: <Landmark className="size-5 text-info" />,
};

type Filtro = "todos" | "activos" | "leidos";

export default function AlertasPage() {
  const [alertas, setAlertas] = useState(alertasIniciales);
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const sinLeer = alertas.filter((a) => !a.leida).length;
  const visibles = alertas.filter((a) => (filtro === "todos" ? true : filtro === "activos" ? !a.leida : a.leida));

  return (
    <div>
      <ScreenHeader
        title="Alertas"
        subtitle={sinLeer ? `${sinLeer} alertas sin leer` : "Todo al día"}
        action={
          <button
            onClick={() => setAlertas((as) => as.map((a) => ({ ...a, leida: true })))}
            disabled={!sinLeer}
            className="rounded-full bg-white/20 px-3.5 py-2 text-xs font-semibold transition hover:bg-white/30 disabled:opacity-50"
          >
            Marcar leídas
          </button>
        }
      />

      <div className="px-4 pb-8 pt-4">
        <div className="flex gap-2">
          {(["todos", "activos", "leidos"] as Filtro[]).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold capitalize transition ${
                filtro === f ? "border-brand-600 bg-brand-600 text-white" : "border-brand-200 bg-white"
              }`}
            >
              {f === "leidos" ? "Leídos" : f}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {visibles.map((a) => {
            const e = estilos[a.nivel];
            return (
              <button
                key={a.id}
                onClick={() => setAlertas((as) => as.map((x) => (x.id === a.id ? { ...x, leida: true } : x)))}
                className={`rise relative flex w-full gap-3 overflow-hidden rounded-2xl border p-4 text-left ${e.card}`}
              >
                <span className={`absolute inset-y-0 left-0 w-1 ${e.borde}`} />
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/80">{iconos[a.icono]}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-bold">{a.titulo}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${e.chip}`}>{e.etiqueta}</span>
                    {!a.leida && <span className={`size-2 rounded-full ${e.dot}`} />}
                  </span>
                  <span className="mt-1 block text-[13px] leading-snug text-ink/80">{a.detalle}</span>
                  <span className="mt-2 flex items-center gap-2 text-[11px] text-muted">
                    <span className="flex items-center gap-1 rounded-full bg-white/70 px-2 py-0.5 font-semibold text-brand-700">
                      <MapPin className="size-3" /> {a.zona}
                    </span>
                    {a.hace}
                  </span>
                </span>
              </button>
            );
          })}
          {visibles.length === 0 && <p className="py-10 text-center text-sm text-muted">No hay alertas en esta vista.</p>}
        </div>
      </div>
    </div>
  );
}
