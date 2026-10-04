# Manual técnico — SigaWatch (prototipo)

## Requisitos

- Node.js 20 o superior y npm.

## Comandos

| Comando | Uso |
|---|---|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desarrollo en `http://localhost:3000` |
| `npm run lint` | Revisión de estilo (ESLint) |
| `npm run build` | Compilación de producción (la ejecuta el CI y Vercel) |

## Estructura

```
app/
  page.tsx              Inicio de sesión
  (app)/layout.tsx      Barra de navegación inferior
  (app)/inicio|reportar|riesgo|mapa|alertas/page.tsx
components/             shell, bottom-nav, ui, mini-map
lib/                    data.ts (datos simulados), version.ts, pantallas.ts
docs/                   arquitectura, manuales, requisitos, GCS
infra/main.tf           Infraestructura como código (Vercel + GitHub)
.github/                Plantillas de cambio, CODEOWNERS y CI
```

## Despliegue

Vercel importa el repositorio de GitHub sin configuración adicional (framework Next.js detectado):

- Push o merge a `main` → **producción**.
- Push a cualquier otra rama o PR → **despliegue de vista previa** con URL propia.

## Versión

La versión visible está en `lib/version.ts` y debe coincidir con `package.json` y con la etiqueta Git.
