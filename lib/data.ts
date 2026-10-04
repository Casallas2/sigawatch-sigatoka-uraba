// Datos simulados del prototipo. No hay backend: todo vive en memoria.

export type Riesgo = "alto" | "medio" | "bajo";

export type Zona = {
  id: string;
  nombre: string;
  finca: string;
  municipio: string;
  hectareas: number;
  riesgo: Riesgo;
  afectacion: number;
  ultimoReporte: string;
};

export const zonas: Zona[] = [
  {
    id: "norte",
    nombre: "Zona Norte",
    finca: "Finca La Esperanza",
    municipio: "Carepa",
    hectareas: 12.4,
    riesgo: "alto",
    afectacion: 85,
    ultimoReporte: "hace 2 h",
  },
  {
    id: "sur",
    nombre: "Zona Sur",
    finca: "Finca El Porvenir",
    municipio: "Apartadó",
    hectareas: 9.8,
    riesgo: "medio",
    afectacion: 52,
    ultimoReporte: "ayer, 14:20",
  },
  {
    id: "este",
    nombre: "Zona Este",
    finca: "Finca Los Almendros",
    municipio: "Turbo",
    hectareas: 15.1,
    riesgo: "bajo",
    afectacion: 18,
    ultimoReporte: "hace 3 días",
  },
];

export const riesgoLabel: Record<Riesgo, string> = {
  alto: "Alto",
  medio: "Medio",
  bajo: "Bajo",
};

export const riesgoStyles: Record<Riesgo, { text: string; bg: string; bar: string; border: string }> = {
  alto: {
    text: "text-risk-high",
    bg: "bg-risk-high-bg",
    bar: "bg-risk-high",
    border: "border-risk-high/30",
  },
  medio: {
    text: "text-risk-mid",
    bg: "bg-risk-mid-bg",
    bar: "bg-risk-mid",
    border: "border-risk-mid/30",
  },
  bajo: {
    text: "text-risk-low",
    bg: "bg-risk-low-bg",
    bar: "bg-risk-low",
    border: "border-risk-low/30",
  },
};

export type NivelAlerta = "critico" | "advertencia" | "info";

export type Alerta = {
  id: string;
  titulo: string;
  detalle: string;
  nivel: NivelAlerta;
  zona: string;
  hace: string;
  leida: boolean;
  icono: "brote" | "clima" | "progreso" | "ok";
};

export const alertasIniciales: Alerta[] = [
  {
    id: "a1",
    titulo: "Brote crítico detectado",
    detalle:
      "Zona Norte — Finca La Esperanza. Presencia masiva de esporas activas. Intervención urgente requerida.",
    nivel: "critico",
    zona: "Zona Norte",
    hace: "hace 2 horas",
    leida: false,
    icono: "brote",
  },
  {
    id: "a2",
    titulo: "Condiciones climáticas de riesgo",
    detalle:
      "Humedad relativa superior al 90% durante 48 h consecutivas. Condiciones ideales para propagación.",
    nivel: "advertencia",
    zona: "Todas las zonas",
    hace: "hace 5 horas",
    leida: false,
    icono: "clima",
  },
  {
    id: "a3",
    titulo: "Progresión en Zona Sur",
    detalle:
      "El análisis de imágenes detecta un incremento del 18% en área afectada respecto al reporte anterior.",
    nivel: "advertencia",
    zona: "Zona Sur",
    hace: "ayer, 14:20",
    leida: true,
    icono: "progreso",
  },
  {
    id: "a4",
    titulo: "Reporte enviado exitosamente",
    detalle:
      "Tu reporte de la Zona Este fue recibido y está en proceso de análisis por el sistema.",
    nivel: "info",
    zona: "Zona Este",
    hace: "hace 3 días",
    leida: true,
    icono: "ok",
  },
];

export const clima = {
  humedad: 92,
  temperatura: 28,
  precipitacion: 14,
  viento: 12,
  direccionViento: "NE",
  hojaMojada: 11,
};

// Índice de riesgo de los últimos 7 días (0-100)
export const tendencia = [
  { dia: "Lun", valor: 48 },
  { dia: "Mar", valor: 55 },
  { dia: "Mié", valor: 61 },
  { dia: "Jue", valor: 58 },
  { dia: "Vie", valor: 70 },
  { dia: "Sáb", valor: 74 },
  { dia: "Hoy", valor: 78 },
];

// Estrategias de cálculo de riesgo (patrón Strategy del Parcial I)
export type Estrategia = {
  id: string;
  nombre: string;
  descripcion: string;
  indice: number;
};

export const estrategias: Estrategia[] = [
  {
    id: "climatica",
    nombre: "Climática",
    descripcion: "Humedad, lluvia, viento y horas de hoja mojada.",
    indice: 78,
  },
  {
    id: "historica",
    nombre: "Histórica",
    descripcion: "Focos reportados en los últimos 30 días en un radio de 5 km.",
    indice: 64,
  },
  {
    id: "combinada",
    nombre: "Combinada",
    descripcion: "Promedio ponderado: 60% clima y 40% historial.",
    indice: 73,
  },
];

export const recomendaciones = [
  "Programar deshoje sanitario en la Zona Norte en las próximas 48 h.",
  "Coordinar aspersión con la finca vecina para evitar reinfección.",
  "Revisar drenajes: el encharcamiento prolonga la hoja mojada.",
];

export type Foco = {
  id: string;
  zona: string;
  x: number;
  y: number;
  riesgo: Riesgo;
  fecha: string;
};

export const focos: Foco[] = [
  { id: "FOC-0139", zona: "Zona Norte", x: 132, y: 92, riesgo: "alto", fecha: "Hoy, 13:05" },
  { id: "FOC-0137", zona: "Zona Norte", x: 168, y: 118, riesgo: "alto", fecha: "Hoy, 09:40" },
  { id: "FOC-0131", zona: "Zona Sur", x: 92, y: 232, riesgo: "medio", fecha: "Ayer, 14:20" },
  { id: "FOC-0128", zona: "Zona Sur", x: 140, y: 262, riesgo: "medio", fecha: "Ayer, 08:15" },
  { id: "FOC-0120", zona: "Zona Este", x: 248, y: 178, riesgo: "bajo", fecha: "Hace 3 días" },
];

export const severidades = [
  { id: "leve", nombre: "Leve", detalle: "Pizcas o estrías pequeñas", color: "bg-risk-low", ring: "ring-risk-low" },
  { id: "moderada", nombre: "Moderada", detalle: "Estrías cafés alargadas", color: "bg-yellow-500", ring: "ring-yellow-500" },
  { id: "severa", nombre: "Severa", detalle: "Manchas con centro seco", color: "bg-risk-mid", ring: "ring-risk-mid" },
  { id: "critica", nombre: "Crítica", detalle: "Necrosis en gran parte de la hoja", color: "bg-risk-high", ring: "ring-risk-high" },
] as const;
