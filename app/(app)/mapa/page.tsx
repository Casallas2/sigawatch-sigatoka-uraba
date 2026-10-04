"use client";

import { useState } from "react";
import { Layers, Crosshair, X } from "lucide-react";
import { ScreenHeader, Card } from "@/components/ui";
import { MiniMap } from "@/components/mini-map";
import { focos, riesgoLabel, riesgoStyles, type Riesgo } from "@/lib/data";

const filtros: { id: Riesgo | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "alto", label: "Alto" },
  { id: "medio", label: "Medio" },
  { id: "bajo", label: "Bajo" },
];

export default function MapaPage() {
  const [filtro, setFiltro] = useState<Riesgo | "todos">("todos");
  const [radio, setRadio] = useState(true);
  const [sel, setSel] = useState<string | undefined>("FOC-0139");
  const foco = focos.find((f) => f.id === sel);

  return (
    <div>
      <ScreenHeader title="Mapa de focos" subtitle={`${focos.length} focos activos en tus zonas`} back="/inicio" />

      <div className="px-4 pb-8 pt-4">
        <div className="flex gap-2">
          {filtros.map((f) => (
            <button
              key={f.id}
              onClick={() => setFiltro(f.id)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                filtro === f.id ? "border-brand-600 bg-brand-600 text-white" : "border-brand-200 bg-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative mt-3 overflow-hidden rounded-2xl ring-1 ring-brand-100">
          <MiniMap filtro={filtro} radio={radio} seleccionado={sel} onSelect={setSel} className="aspect-square" />
          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <button
              onClick={() => setRadio((r) => !r)}
              aria-pressed={radio}
              aria-label="Mostrar radio de alerta"
              className={`grid size-10 place-items-center rounded-xl shadow-md ${radio ? "bg-brand-600 text-white" : "bg-white text-ink"}`}
            >
              <Layers className="size-5" />
            </button>
            <button aria-label="Centrar en mi ubicación" className="grid size-10 place-items-center rounded-xl bg-white shadow-md">
              <Crosshair className="size-5" />
            </button>
          </div>
          <div className="absolute bottom-3 left-3 flex gap-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold shadow">
            <span className="flex items-center gap-1"><i className="size-2.5 rounded-full bg-risk-high" />Alto</span>
            <span className="flex items-center gap-1"><i className="size-2.5 rounded-full bg-risk-mid" />Medio</span>
            <span className="flex items-center gap-1"><i className="size-2.5 rounded-full bg-risk-low" />Bajo</span>
          </div>
        </div>

        {radio && (
          <p className="mt-2 text-xs text-muted">
            Círculo punteado: radio de 2 km donde se notifica automáticamente a las fincas vecinas.
          </p>
        )}

        {foco ? (
          <Card className="rise mt-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted">{foco.id}</p>
                <p className="font-bold">{foco.zona}</p>
                <p className="text-xs text-muted">{foco.fecha}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${riesgoStyles[foco.riesgo].bg} ${riesgoStyles[foco.riesgo].text}`}>
                  {riesgoLabel[foco.riesgo]}
                </span>
                <button onClick={() => setSel(undefined)} aria-label="Cerrar" className="grid size-8 place-items-center rounded-full hover:bg-brand-50">
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </Card>
        ) : (
          <p className="mt-4 text-center text-sm text-muted">Toca un punto del mapa para ver el detalle del foco.</p>
        )}
      </div>
    </div>
  );
}
