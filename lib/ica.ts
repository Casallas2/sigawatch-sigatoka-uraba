// OCI-001 · Datos simulados de la integración con el ICA (ECS-D-06).
// En producción vendrían del microservicio "Integración ICA".

export const predio = {
  registroIca: "ICA-05147-0231",
  nombre: "Finca La Esperanza",
  municipio: "Carepa, Antioquia",
};

export type EstadoIca = "pendiente" | "enviada" | "confirmada";

export type NotificacionIca = {
  id: string;
  foco: string;
  zona: string;
  severidad: "Severa" | "Crítica";
  fecha: string;
  estado: EstadoIca;
  radicado?: string;
};

export const notificacionesIca: NotificacionIca[] = [
  {
    id: "n1",
    foco: "FOC-0139",
    zona: "Zona Norte",
    severidad: "Crítica",
    fecha: "Hoy, 13:05",
    estado: "pendiente",
  },
  {
    id: "n2",
    foco: "FOC-0137",
    zona: "Zona Norte",
    severidad: "Severa",
    fecha: "Hoy, 09:40",
    estado: "enviada",
    radicado: "ICA-NOT-2026-0086",
  },
  {
    id: "n3",
    foco: "FOC-0131",
    zona: "Zona Sur",
    severidad: "Severa",
    fecha: "Ayer, 14:20",
    estado: "confirmada",
    radicado: "ICA-NOT-2026-0081",
  },
  {
    id: "n4",
    foco: "FOC-0112",
    zona: "Zona Norte",
    severidad: "Crítica",
    fecha: "24 sep, 07:55",
    estado: "confirmada",
    radicado: "ICA-NOT-2026-0074",
  },
];

export const estadoIca: Record<EstadoIca, { label: string; clase: string }> = {
  pendiente: { label: "Pendiente", clase: "bg-risk-mid-bg text-risk-mid" },
  enviada: { label: "Enviada", clase: "bg-info-bg text-info" },
  confirmada: { label: "Confirmada", clase: "bg-risk-low-bg text-risk-low" },
};

// Regla de la OCI-001: solo los focos severos o críticos se notifican al ICA
export function requiereIca(severidad: string | null) {
  return severidad === "severa" || severidad === "critica";
}
