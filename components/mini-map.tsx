import { focos, type Riesgo } from "@/lib/data";

const color: Record<Riesgo, string> = {
  alto: "#d32f2f",
  medio: "#ef7d00",
  bajo: "#43a047",
};

// Mapa ilustrativo (SVG) de lotes, río y focos. No usa servicios de mapas reales.
export function MiniMap({
  filtro = "todos",
  radio = false,
  seleccionado,
  onSelect,
  className = "",
}: {
  filtro?: Riesgo | "todos";
  radio?: boolean;
  seleccionado?: string;
  onSelect?: (id: string) => void;
  className?: string;
}) {
  const visibles = focos.filter((f) => filtro === "todos" || f.riesgo === filtro);

  return (
    <svg viewBox="0 0 320 320" preserveAspectRatio="xMidYMid slice"className={`block w-full ${className}`} role="img" aria-label="Mapa de focos de Sigatoka Negra">
      <rect width="320" height="320" fill="#e6f0dc" />
      {/* Lotes */}
      <path d="M20 30h120v100H20z" fill="#cfe3bf" />
      <path d="M150 30h150v120H150z" fill="#d8e9c8" />
      <path d="M20 180h150v120H20z" fill="#d3e6c3" />
      <path d="M190 165h110v135H190z" fill="#dcebcd" />
      <path d="M20 30h120v100H20zM150 30h150v120H150zM20 180h150v120H20zM190 165h110v135H190z" fill="none" stroke="#b9d1a6" strokeDasharray="4 4" />
      {/* Río León (ilustrativo) */}
      <path d="M0 155 C 60 140, 110 175, 170 158 S 260 140, 320 160" stroke="#9cc8e8" strokeWidth="10" fill="none" strokeLinecap="round" />
      {/* Vías */}
      <path d="M180 0 V320" stroke="#f5f1e6" strokeWidth="6" />
      <path d="M180 0 V320" stroke="#e0d8c2" strokeWidth="1" strokeDasharray="6 6" />

      <text x="28" y="48" fontSize="10" fill="#4c6b47" fontWeight="600">Zona Norte</text>
      <text x="200" y="48" fontSize="10" fill="#4c6b47" fontWeight="600">Finca vecina</text>
      <text x="28" y="198" fontSize="10" fill="#4c6b47" fontWeight="600">Zona Sur</text>
      <text x="200" y="183" fontSize="10" fill="#4c6b47" fontWeight="600">Zona Este</text>

      {radio && (
        <circle cx="132" cy="92" r="78" fill="#d32f2f" fillOpacity="0.07" stroke="#d32f2f" strokeOpacity="0.5" strokeDasharray="5 4" />
      )}

      {visibles.map((f) => (
        <g
          key={f.id}
          onClick={onSelect ? () => onSelect(f.id) : undefined}
          className={onSelect ? "cursor-pointer" : undefined}
        >
          {f.riesgo === "alto" && <circle cx={f.x} cy={f.y} r="10" fill={color[f.riesgo]} className="pulse-ring" />}
          <circle cx={f.x} cy={f.y} r={seleccionado === f.id ? 13 : 10} fill={color[f.riesgo]} stroke="white" strokeWidth="3" />
        </g>
      ))}
    </svg>
  );
}
