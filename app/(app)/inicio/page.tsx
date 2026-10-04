import Link from "next/link";
import { MapPin, Siren, ChevronRight, LayoutGrid, AlertTriangle, ClipboardList, CloudRain } from "lucide-react";
import { StatusBar, SectionTitle, Card } from "@/components/ui";
import { MiniMap } from "@/components/mini-map";
import { zonas, riesgoLabel, riesgoStyles, clima } from "@/lib/data";

export default function InicioPage() {
  return (
    <div className="bg-brand-600">
      <header className="text-white">
        <StatusBar />
        <div className="flex items-start justify-between px-5 pb-10 pt-3">
          <div>
            <p className="text-sm text-white/80">Buenas tardes,</p>
            <h1 className="text-2xl font-bold">Carlos Méndez</h1>
            <p className="mt-1 flex items-center gap-1 text-sm text-white/80">
              <MapPin className="size-3.5" /> Carepa · Urabá antioqueño
            </p>
          </div>
          <span className="grid size-11 place-items-center rounded-full border-2 border-white/40 bg-white/15 font-bold">
            CM
          </span>
        </div>
      </header>

      <div className="-mt-6 rounded-t-[1.75rem] bg-surface px-4 pb-8 pt-5">
        {/* Indicadores principales */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="flex flex-col items-center p-3 text-center">
            <LayoutGrid className="size-5 text-info" />
            <span className="mt-1 text-2xl font-bold">3</span>
            <span className="text-[11px] text-muted">Zonas</span>
          </Card>
          <Card className="flex flex-col items-center border-risk-high/30 bg-risk-high-bg p-3 text-center">
            <AlertTriangle className="size-5 text-risk-high" />
            <span className="mt-1 text-2xl font-bold text-risk-high">1</span>
            <span className="text-[11px] text-risk-high">Alto riesgo</span>
          </Card>
          <Card className="flex flex-col items-center p-3 text-center">
            <ClipboardList className="size-5 text-brand-600" />
            <span className="mt-1 text-2xl font-bold">4</span>
            <span className="text-[11px] text-muted">Reportes hoy</span>
          </Card>
        </div>

        {/* Alerta activa: retroalimentación inmediata */}
        <Link
          href="/alertas"
          className="mt-4 flex items-center gap-3 rounded-2xl border border-risk-high/30 bg-risk-high-bg p-4 transition hover:brightness-[0.98]"
        >
          <Siren className="size-7 shrink-0 text-risk-high" />
          <div className="flex-1">
            <p className="text-sm font-bold text-risk-high">ALERTA ACTIVA</p>
            <p className="text-[13px] leading-snug text-risk-high/90">
              Zona Norte con infección severa detectada. Acción inmediata requerida.
            </p>
          </div>
          <span className="rounded-full bg-risk-high px-3 py-1 text-xs font-bold text-white">Ver</span>
        </Link>

        {/* Clima resumido */}
        <Link href="/riesgo" className="mt-3 flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-brand-100">
          <CloudRain className="size-6 text-info" />
          <p className="flex-1 text-[13px]">
            <strong>{clima.humedad}% humedad</strong> · {clima.temperatura} °C · lluvia {clima.precipitacion} mm
          </p>
          <ChevronRight className="size-4 text-muted" />
        </Link>

        <SectionTitle
          action={
            <Link href="/mapa" className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
              Expandir
            </Link>
          }
        >
          Mapa de riesgo
        </SectionTitle>
        <Link href="/mapa" className="block overflow-hidden rounded-2xl ring-1 ring-brand-100">
          <MiniMap className="h-44 object-cover" />
        </Link>

        <SectionTitle>Zonas de cultivo</SectionTitle>
        <div className="space-y-3">
          {zonas.map((z) => {
            const s = riesgoStyles[z.riesgo];
            return (
              <Card key={z.id} className={`${z.riesgo === "alto" ? s.border : ""}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold leading-tight">
                      {z.nombre} — {z.finca}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      {z.hectareas} ha · {z.municipio} · último reporte {z.ultimoReporte}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${s.bg} ${s.text}`}>
                    {riesgoLabel[z.riesgo]}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-brand-50">
                    <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${z.afectacion}%` }} />
                  </div>
                  <span className={`text-xs font-bold ${s.text}`}>{z.afectacion}%</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
