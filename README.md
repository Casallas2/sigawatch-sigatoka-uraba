# SigaWatch — Registro y control epidemiológico de Sigatoka Negra (Urabá)

Prototipo navegable (solo frontend) del sistema **SigaWatch**, desarrollado para la asignatura
**Ingeniería de Software II** — Corporación Universitaria Remington, sede Apartadó.

| | |
|---|---|
| **Estudiante / Líder de Configuración** | Sebastián Gil Villalobos |
| **Docente** | Marta Lucía Jiménez Torres |
| **Versión de línea base** | `v1.0.0` (Parcial I — UI/UX y Scrum) |
| **Versión actual** | `v1.1.0` — OCI-001 Notificación fitosanitaria al ICA (Parcial II) |
| **Despliegue** | Vercel (producción = rama `main`, vista previa = cada rama/PR) |

> **Importante:** es una demostración de interfaz. No hay backend, base de datos ni integraciones reales;
> todos los datos están simulados en `lib/data.ts`.

## Problema

La Sigatoka Negra (*Pseudocercospora fijiensis*) es la principal enfermedad foliar del banano en Urabá. Su
detección tardía y la falta de comunicación entre fincas vecinas facilitan la propagación. SigaWatch permite
registrar focos en campo (foto + GPS + severidad), calcular el riesgo con variables climáticas y alertar
automáticamente a las fincas cercanas.

## Pantallas del prototipo

| # | Ruta | Pantalla | Historia de usuario (Product Backlog) |
|---|---|---|---|
| 1 | `/` | Inicio de sesión | HU-06 Iniciar sesión |
| 2 | `/inicio` | Panel principal | HU-02 Ver riesgo · HU-05 Ver mapa |
| 3 | `/reportar` | Registro de foco | HU-01 Registrar foco con imagen, GPS y severidad |
| 4 | `/riesgo` | Análisis de riesgo | HU-02 Ver riesgo · HU-03 Analizar clima |
| 5 | `/mapa` | Mapa de focos | HU-05 Ver focos cercanos en mapa |
| 6 | `/alertas` | Alertas | HU-04 Recibir alertas automáticas |
| 7 | `/ica` | Notificaciones ICA (v1.1.0) | HU-07 Notificar focos al ICA — **OCI-001** |

## Catálogo de Elementos de Configuración de Software (ECS)

Cada ECS tiene un identificador único, un responsable y queda bajo control de versiones en este repositorio.
Un cambio a cualquier ECS exige una **Solicitud de Cambio** (Issue) y un **Pull Request** aprobado.

### 1. Programas (fuentes y ejecutables)

| ID | Elemento | Ubicación | Descripción |
|---|---|---|---|
| ECS-P-01 | Vista Inicio de sesión | `app/page.tsx` | Autenticación simulada (HU-06) |
| ECS-P-02 | Vista Panel principal | `app/(app)/inicio/page.tsx` | Indicadores, alerta activa, zonas |
| ECS-P-03 | Vista Registro de foco | `app/(app)/reportar/page.tsx` | Foto, GPS y severidad (HU-01) |
| ECS-P-04 | Vista Análisis de riesgo | `app/(app)/riesgo/page.tsx` | Modelos de cálculo — patrón *Strategy* |
| ECS-P-05 | Vista Mapa de focos | `app/(app)/mapa/page.tsx` | Focos y radio de alerta de 2 km |
| ECS-P-06 | Vista Alertas | `app/(app)/alertas/page.tsx` | Notificaciones — patrón *Observer* |
| ECS-P-07 | Componentes compartidos | `components/` | Marco, navegación, encabezados, mapa |
| ECS-P-08 | Configuración de build | `package.json`, `next.config.ts`, `tsconfig.json` | Dependencias y compilación |
| ECS-P-10 | Vista Notificaciones ICA | `app/(app)/ica/page.tsx` | Estado y radicados de notificaciones al ICA (OCI-001) |
| ECS-P-09 | Ejecutable desplegado | Vercel (build de `main`) | Artefacto generado por `next build` |

### 2. Datos

| ID | Elemento | Ubicación / origen | Descripción |
|---|---|---|---|
| ECS-D-01 | Datos simulados del dominio | `lib/data.ts` | Zonas, focos, alertas, clima |
| ECS-D-02 | Catálogo de severidad | `lib/data.ts` (`severidades`) | Escala de 4 niveles de daño foliar |
| ECS-D-03 | API de clima (externa, futura) | Servicio meteorológico (p. ej. IDEAM) | Humedad, lluvia, viento |
| ECS-D-04 | GPS del dispositivo | Sensor del teléfono | Coordenadas del foco |
| ECS-D-05 | Base de datos de focos (futura) | PostgreSQL + PostGIS | Persistencia georreferenciada |
| ECS-D-06 | Integración ICA (simulada) | `lib/ica.ts` → servicio externo del ICA | Registro ICA del predio y radicados (OCI-001) |

### 3. Documentación

| ID | Elemento | Ubicación |
|---|---|---|
| ECS-DOC-01 | Catálogo de ECS y guía del repositorio | `README.md` |
| ECS-DOC-02 | Especificación arquitectónica | `docs/arquitectura.md` |
| ECS-DOC-03 | Manual de usuario | `docs/manual-usuario.md` |
| ECS-DOC-04 | Manual técnico | `docs/manual-tecnico.md` |
| ECS-DOC-05 | Plan de Gestión de Configuración | `docs/gcs/plan-gcs.md` |
| ECS-DOC-06 | Registro de cambios | `CHANGELOG.md` |
| ECS-DOC-07 | Plantillas de control de cambios | `.github/ISSUE_TEMPLATE/`, `.github/PULL_REQUEST_TEMPLATE.md` |
| ECS-DOC-08 | Infraestructura como código | `infra/main.tf` |
| ECS-DOC-09 | Requisitos funcionales y no funcionales | `docs/requisitos.md` |
| ECS-DOC-10 | Orden de Cambio de Ingeniería 001 | `docs/gcs/OCI-001.md` |
| ECS-DOC-11 | Auditoría e informe de estado de la OCI-001 | `docs/gcs/auditoria-OCI-001.md` |

## Estrategia de ramas (GitFlow simplificado)

```
main      ●──────────────────────────────●  v1.0.0 → v1.1.0 (producción)
           \                            /
develop     ●──────────────●──────────●     integración
                \          /
feature/OCI-…    ●──●──●──●                 cambio aprobado por el ACC
```

- `main`: solo versiones liberadas y etiquetadas. Protegida: requiere PR, revisión y CI en verde.
- `develop`: integración de cambios aprobados. Protegida: requiere PR y CI en verde.
- `feature/OCI-<n>-<nombre>`: una rama por Orden de Cambio de Ingeniería.
- `hotfix/<n>-<nombre>`: correcciones urgentes desde `main`.

Versionamiento: **SemVer** `MAYOR.MENOR.PARCHE`. Detalle completo en [`docs/gcs/plan-gcs.md`](docs/gcs/plan-gcs.md).

## Ejecutar localmente

```bash
npm install
npm run dev
```

Abrir <http://localhost:3000>. En escritorio el prototipo se muestra dentro de un marco de teléfono; en el
celular ocupa toda la pantalla.

## Tecnologías

Next.js (App Router) · React · TypeScript · Tailwind CSS · lucide-react · Vercel · GitHub Actions · Terraform
