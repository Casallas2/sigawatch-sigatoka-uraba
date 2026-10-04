"use client";

import { useState } from "react";
import { Landmark, Send, Loader2, FileCheck2, Clock, CheckCircle2 } from "lucide-react";
import { ScreenHeader, SectionTitle, Card } from "@/components/ui";
import { estadoIca, notificacionesIca, predio } from "@/lib/ica";

// OCI-001 · Notificaciones fitosanitarias al ICA (ECS-P-10)
export default function IcaPage() {
  const [items, setItems] = useState(notificacionesIca);
  const [enviando, setEnviando] = useState(false);

  const pendientes = items.filter((n) => n.estado === "pendiente").length;
  const enviadas = items.filter((n) => n.estado === "enviada").length;
  const confirmadas = items.filter((n) => n.estado === "confirmada").length;

  function enviarPendientes() {
    setEnviando(true);
    setTimeout(() => {
      setItems((xs) =>
        xs.map((n, i) => (n.estado === "pendiente" ? { ...n, estado: "enviada", radicado: `ICA-NOT-2026-00${87 + i}` } : n)),
      );
      setEnviando(false);
    }, 1000);
  }

  return (
    <div>
      <ScreenHeader title="Notificaciones ICA" subtitle="Reporte fitosanitario oficial" back="/inicio" />

      <div className="px-4 pb-8 pt-4">
        <Card className="flex items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-info-bg">
            <Landmark className="size-6 text-info" />
          </span>
          <div className="min-w-0">
            <p className="font-bold leading-tight">{predio.nombre}</p>
            <p className="text-xs text-muted">
              Registro ICA <strong className="text-ink">{predio.registroIca}</strong> · {predio.municipio}
            </p>
          </div>
        </Card>

        <div className="mt-3 grid grid-cols-3 gap-3">
          <Resumen icon={<Clock className="size-5 text-risk-mid" />} valor={pendientes} label="Pendientes" />
          <Resumen icon={<Send className="size-5 text-info" />} valor={enviadas} label="Enviadas" />
          <Resumen icon={<CheckCircle2 className="size-5 text-risk-low" />} valor={confirmadas} label="Confirmadas" />
        </div>

        {pendientes > 0 && (
          <button
            onClick={enviarPendientes}
            disabled={enviando}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-info font-bold text-white shadow-md transition active:scale-[0.98] disabled:opacity-80"
          >
            {enviando ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
            {enviando ? "Enviando al ICA…" : `Enviar ${pendientes} pendiente${pendientes > 1 ? "s" : ""}`}
          </button>
        )}

        <SectionTitle>Historial</SectionTitle>
        <div className="space-y-3">
          {items.map((n) => (
            <Card key={n.id} className="rise">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold">
                    {n.foco} · {n.zona}
                  </p>
                  <p className="text-xs text-muted">
                    Severidad {n.severidad} · {n.fecha}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${estadoIca[n.estado].clase}`}>
                  {estadoIca[n.estado].label}
                </span>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-xs">
                <FileCheck2 className="size-3.5 text-muted" />
                {n.radicado ? (
                  <span>
                    Radicado <strong>{n.radicado}</strong>
                  </span>
                ) : (
                  <span className="text-risk-mid">En cola: se enviará al recuperar conexión</span>
                )}
              </p>
            </Card>
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] text-muted">
          Solo los focos con severidad Severa o Crítica se notifican al ICA.
        </p>
      </div>
    </div>
  );
}

function Resumen({ icon, valor, label }: { icon: React.ReactNode; valor: number; label: string }) {
  return (
    <Card className="flex flex-col items-center p-3 text-center">
      {icon}
      <span className="mt-1 text-2xl font-bold">{valor}</span>
      <span className="text-[11px] text-muted">{label}</span>
    </Card>
  );
}
