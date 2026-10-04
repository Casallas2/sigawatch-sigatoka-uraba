export type Pantalla = { href: string; nombre: string; etiqueta?: string };

export const pantallas: Pantalla[] = [
  { href: "/", nombre: "1. Inicio de sesión" },
  { href: "/inicio", nombre: "2. Panel principal" },
  { href: "/reportar", nombre: "3. Registro de foco" },
  { href: "/riesgo", nombre: "4. Análisis de riesgo" },
  { href: "/mapa", nombre: "5. Mapa de focos" },
  { href: "/alertas", nombre: "6. Alertas" },
  { href: "/ica", nombre: "7. Notificaciones ICA", etiqueta: "OCI-001" },
];
