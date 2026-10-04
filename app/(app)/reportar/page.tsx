"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Camera, MapPin, Loader2, CheckCircle2, RefreshCw, Send, Users } from "lucide-react";
import { ScreenHeader, Card } from "@/components/ui";
import { severidades, zonas } from "@/lib/data";

type Severidad = (typeof severidades)[number]["id"];

export default function ReportarPage() {
  const [foto, setFoto] = useState(false);
  const [gps, setGps] = useState<"buscando" | "listo">("buscando");
  const [severidad, setSeveridad] = useState<Severidad | null>(null);
  const [zona, setZona] = useState(zonas[0].id);
  const [notas, setNotas] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // GPS automático simulado
  useEffect(() => {
    const t = setTimeout(() => setGps("listo"), 1200);
    return () => clearTimeout(t);
  }, []);

  // Prevención de errores: solo se habilita con foto, GPS y severidad
  const completo = foto && gps === "listo" && severidad !== null;

  function enviar() {
    if (!completo) return;
    setEnviando(true);
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
    }, 900);
  }

  function nuevo() {
    setFoto(false);
    setSeveridad(null);
    setNotas("");
    setEnviado(false);
  }

  if (enviado) {
    const z = zonas.find((x) => x.id === zona)!;
    return (
      <div className="flex min-h-full flex-col">
        <ScreenHeader title="Reporte enviado" back="/inicio" />
        <div className="rise flex flex-1 flex-col items-center px-6 pt-10 text-center">
          <span className="grid size-24 place-items-center rounded-full bg-risk-low-bg">
            <CheckCircle2 className="size-14 text-risk-low" />
          </span>
          <h2 className="mt-5 text-2xl font-bold">¡Foco registrado!</h2>
          <p className="mt-2 text-sm text-muted">
            Código <strong className="text-ink">FOC-2026-0142</strong> · {z.nombre}, {z.finca}
          </p>
          <Card className="mt-6 w-full text-left">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Users className="size-4 text-brand-600" /> Alerta enviada a 3 fincas cercanas
            </p>
            <p className="mt-1 text-xs text-muted">
              Radio de 2 km. El sistema recalculará el riesgo de la zona con este reporte.
            </p>
          </Card>
          <div className="mt-6 grid w-full gap-3">
            <Link href="/mapa" className="flex h-12 items-center justify-center rounded-2xl bg-brand-600 font-bold text-white">
              Ver en el mapa
            </Link>
            <button onClick={nuevo} className="h-12 rounded-2xl border border-brand-200 font-semibold text-brand-700">
              Registrar otro foco
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ScreenHeader title="Registrar foco" subtitle="3 pasos · menos de 1 minuto" back="/inicio" />

      <div className="space-y-4 px-4 py-5">
        {/* Paso 1: Foto */}
        <Card>
          <Paso n={1} titulo="Foto de la hoja" listo={foto} />
          {foto ? (
            <div className="relative mt-3 h-40 overflow-hidden rounded-xl bg-gradient-to-br from-[#3f7a2b] via-[#5e8f33] to-[#2f5e22]">
              <HojaIlustrada />
              <button
                onClick={() => setFoto(false)}
                className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white"
              >
                <RefreshCw className="size-3.5" /> Repetir
              </button>
            </div>
          ) : (
            <button
              onClick={() => setFoto(true)}
              className="mt-3 flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-300 bg-brand-50 text-brand-700 transition hover:bg-brand-100"
            >
              <Camera className="size-10" />
              <span className="font-bold">Tomar foto</span>
              <span className="text-xs text-muted">Enfoca el envés de la hoja afectada</span>
            </button>
          )}
        </Card>

        {/* Paso 2: GPS */}
        <Card>
          <Paso n={2} titulo="Ubicación GPS" listo={gps === "listo"} />
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-brand-50 p-3">
            {gps === "buscando" ? (
              <Loader2 className="size-5 animate-spin text-brand-600" />
            ) : (
              <MapPin className="size-5 text-brand-600" />
            )}
            <div className="text-sm">
              {gps === "buscando" ? (
                <span className="text-muted">Obteniendo ubicación automáticamente…</span>
              ) : (
                <>
                  <p className="font-semibold">7.7578° N, 76.6615° O</p>
                  <p className="text-xs text-muted">Precisión ±4 m · capturada automáticamente</p>
                </>
              )}
            </div>
          </div>
          <label className="mt-3 block text-xs font-semibold text-muted" htmlFor="zona">
            Zona / lote
          </label>
          <select
            id="zona"
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            className="mt-1 h-12 w-full rounded-xl border border-brand-200 bg-white px-3 text-sm outline-none focus:ring-4 focus:ring-brand-200"
          >
            {zonas.map((z) => (
              <option key={z.id} value={z.id}>
                {z.nombre} — {z.finca}
              </option>
            ))}
          </select>
        </Card>

        {/* Paso 3: Severidad */}
        <Card>
          <Paso n={3} titulo="Nivel de severidad" listo={severidad !== null} />
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {severidades.map((s) => {
              const activo = severidad === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSeveridad(s.id)}
                  aria-pressed={activo}
                  className={`rounded-xl border p-3 text-left transition ${
                    activo ? `border-transparent bg-white ring-2 ${s.ring}` : "border-brand-100 hover:bg-brand-50"
                  }`}
                >
                  <span className="flex items-center gap-2 font-bold">
                    <span className={`size-3 rounded-full ${s.color}`} /> {s.nombre}
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-muted">{s.detalle}</span>
                </button>
              );
            })}
          </div>
          <label className="mt-4 block text-xs font-semibold text-muted" htmlFor="notas">
            Observaciones (opcional)
          </label>
          <textarea
            id="notas"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            rows={2}
            placeholder="Ej.: hojas 3 y 4 con estrías, planta en floración"
            className="mt-1 w-full rounded-xl border border-brand-200 p-3 text-sm outline-none focus:ring-4 focus:ring-brand-200"
          />
        </Card>

        {!completo && (
          <p className="text-center text-xs text-muted">
            Completa foto, ubicación y severidad para enviar el reporte.
          </p>
        )}
        <button
          onClick={enviar}
          disabled={!completo || enviando}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 text-base font-bold text-white shadow-lg shadow-brand-600/30 transition enabled:active:scale-[0.98] disabled:bg-brand-200 disabled:shadow-none"
        >
          {enviando ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
          {enviando ? "Enviando…" : "Enviar reporte"}
        </button>
      </div>
    </div>
  );
}

function Paso({ n, titulo, listo }: { n: number; titulo: string; listo: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`grid size-7 place-items-center rounded-full text-sm font-bold ${
          listo ? "bg-risk-low text-white" : "bg-brand-100 text-brand-700"
        }`}
      >
        {listo ? "✓" : n}
      </span>
      <h2 className="font-bold">{titulo}</h2>
    </div>
  );
}

function HojaIlustrada() {
  return (
    <svg viewBox="0 0 300 160" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <path d="M-10 120 C 60 20, 200 0, 320 40 L 320 90 C 200 70, 80 110, -10 160 Z" fill="#7fb34a" />
      <path d="M-10 140 C 80 70, 200 40, 320 65" stroke="#cfe5a6" strokeWidth="3" fill="none" />
      {[
        [60, 105], [85, 92], [110, 84], [140, 70], [170, 62], [200, 58], [230, 52], [125, 95], [190, 75],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={10 + (i % 3) * 3} ry="3" fill="#3b2a17" opacity="0.8" transform={`rotate(-18 ${x} ${y})`} />
      ))}
    </svg>
  );
}
