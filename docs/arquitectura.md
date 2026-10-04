# Especificación arquitectónica — SigaWatch

Resumen de la arquitectura definida en el Parcial I. El prototipo implementa solo la capa de presentación;
los servicios se describen como arquitectura objetivo.

## Estilo: microservicios

```
 App móvil / web (este repositorio)
            │  HTTPS / JSON
      ┌─────▼─────┐
      │ API Gateway│
      └─────┬─────┘
  ┌─────────┼──────────────┬────────────────┬─────────────────┐
  ▼         ▼              ▼                ▼                 ▼
Auth   Registro de    Análisis de      Alertas          Clima (adaptador
       focos          riesgo           (Observer)        API externa)
       (foto, GPS)    (Strategy)
  │         │              │                │
  └─────────┴──── PostgreSQL + PostGIS ─────┘
```

| Servicio | Responsabilidad | Pantalla que lo consume |
|---|---|---|
| Autenticación | Credenciales y sesión | Inicio de sesión |
| Registro de focos | Guardar foto, coordenadas y severidad | Registro de foco, Mapa |
| Análisis de riesgo | Calcular el índice 0–100 | Panel, Análisis de riesgo |
| Alertas | Notificar a fincas en un radio de 2 km | Alertas, Panel |
| Clima | Consultar humedad, lluvia y viento | Análisis de riesgo |

## Patrones de diseño

- **Strategy** — cálculo del riesgo intercambiable: `EstrategiaClimatica`, `EstrategiaHistorica`,
  `EstrategiaCombinada`. En la interfaz se ve como el selector "Modelo de cálculo".
- **Observer** — cuando se registra un foco (sujeto), los observadores suscritos (fincas vecinas,
  panel, servicio de notificaciones) reciben la alerta. En la interfaz se ve en la pantalla Alertas.

## Capa de presentación (este repositorio)

- `app/` — una carpeta por vista (ECS-P-01 a ECS-P-06).
- `components/` — componentes reutilizables (ECS-P-07).
- `lib/data.ts` — datos simulados que reemplazan las respuestas de los servicios (ECS-D-01).

## Cambio v1.1.0 — OCI-001: Integración ICA

```
RegistroFoco (sujeto) ──notifica──► FincasVecinas      (observador existente)
                      ├──────────► PanelRiesgo         (observador existente)
                      └──────────► NotificadorICA      (NUEVO observador, solo severidad ≥ Severa)
                                        │
                                        ▼
                               Servicio Integración ICA (NUEVO microservicio / adaptador)
                                        │  cola de reintentos
                                        ▼
                               Servicio externo del ICA
```

- El sujeto `RegistroFoco` **no se modifica**: solo se suscribe un nuevo observador (principio abierto/cerrado).
- El adaptador aísla el formato del ICA; si cambia su servicio, solo cambia el adaptador.
- Servicios sin impacto: Autenticación, Análisis de riesgo (Strategy) y Clima.
