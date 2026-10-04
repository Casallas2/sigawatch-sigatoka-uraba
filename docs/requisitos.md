# Requisitos del prototipo SigaWatch (línea base v1.0.0)

Requisitos tomados en cuenta para construir el frontend. Se derivan del documento del Parcial I
(Product Backlog, pantallas y justificación de diseño) y del enunciado de la actividad
(principios de UI/UX y prototipado). En el prototipo, cada requisito funcional se **simula** en la
interfaz: no hay backend ni datos reales.

## Requisitos funcionales (RF)

| ID | Requisito | HU | Pantalla | Cómo se refleja en el prototipo |
|---|---|---|---|---|
| RF-01 | El sistema debe permitir al usuario iniciar sesión con correo y contraseña. | HU-06 | `/` | Formulario con validación básica (correo con @, clave ≥ 4) y mensaje de error. |
| RF-02 | El sistema debe ofrecer accesos alternos de inicio de sesión (Google, SMS). | HU-06 | `/` | Botones que llevan al panel (simulado). |
| RF-03 | El sistema debe mostrar un panel con el resumen de zonas, zonas en alto riesgo y reportes del día. | HU-02 | `/inicio` | Tres indicadores en tarjetas. |
| RF-04 | El sistema debe destacar la alerta activa más crítica en el panel principal. | HU-04 | `/inicio` | Tarjeta roja "ALERTA ACTIVA" que lleva a Alertas. |
| RF-05 | El sistema debe listar las zonas de cultivo con su nivel de riesgo y porcentaje de afectación. | HU-02 | `/inicio` | Tarjetas por zona con etiqueta de color y barra de avance. |
| RF-06 | El sistema debe permitir registrar un foco con fotografía de la hoja afectada. | HU-01 | `/reportar` | Paso 1: "Tomar foto" (imagen ilustrativa) con opción de repetir. |
| RF-07 | El sistema debe capturar automáticamente la ubicación GPS del foco. | HU-01 | `/reportar` | Paso 2: coordenadas y precisión obtenidas automáticamente (simulado). |
| RF-08 | El sistema debe exigir el nivel de severidad del foco (Leve, Moderada, Severa, Crítica). | HU-01 | `/reportar` | Paso 3: cuatro botones grandes con color y descripción. |
| RF-09 | El sistema debe permitir asociar el foco a una zona/lote y agregar observaciones opcionales. | HU-01 | `/reportar` | Selector de zona y campo de texto. |
| RF-10 | El sistema debe impedir el envío del reporte si faltan foto, GPS o severidad. | HU-01 | `/reportar` | Botón "Enviar" deshabilitado con mensaje explicativo. |
| RF-11 | El sistema debe confirmar el registro con un código de foco y notificar a fincas en un radio de 2 km. | HU-01, HU-04 | `/reportar` | Pantalla de éxito con código FOC y aviso de fincas notificadas. |
| RF-12 | El sistema debe calcular y mostrar el índice de riesgo (0–100) clasificado en alto, medio o bajo. | HU-02 | `/riesgo` | Medidor semicircular con color por nivel. |
| RF-13 | El sistema debe permitir elegir el modelo de cálculo del riesgo (climático, histórico, combinado). | HU-03 | `/riesgo` | Selector segmentado (patrón *Strategy* de la arquitectura). |
| RF-14 | El sistema debe analizar variables climáticas: humedad, temperatura, lluvia, viento y horas de hoja mojada. | HU-03 | `/riesgo` | Tarjetas de variables con marca "Crítico". |
| RF-15 | El sistema debe mostrar la tendencia del riesgo de los últimos 7 días y recomendaciones de manejo. | HU-02 | `/riesgo` | Gráfico de barras y lista de recomendaciones. |
| RF-16 | El sistema debe mostrar los focos georreferenciados en un mapa, con filtro por nivel de riesgo. | HU-05 | `/mapa` | Mapa ilustrativo (SVG) con filtros Todos/Alto/Medio/Bajo. |
| RF-17 | El sistema debe mostrar el radio de alerta alrededor de un foco crítico y el detalle de cada foco. | HU-05 | `/mapa` | Capa de radio activable y tarjeta de detalle al tocar un punto. |
| RF-18 | El sistema debe notificar alertas automáticas clasificadas en crítico, advertencia e información. | HU-04 | `/alertas` | Lista con color, ícono, zona y hora (patrón *Observer*). |
| RF-19 | El sistema debe permitir filtrar alertas (todas, activas, leídas) y marcarlas como leídas. | HU-04 | `/alertas` | Pestañas de filtro, "Marcar leídas" y lectura al tocar. |
| RF-20 | El sistema debe ofrecer navegación permanente entre las secciones principales. | Todas | Todas | Barra inferior: Inicio, Mapa, Reportar (botón central), Riesgo, Alertas. |

## Requisitos no funcionales (RNF)

| ID | Categoría | Requisito | Cómo se aplicó |
|---|---|---|---|
| RNF-01 | Usabilidad (campo) | Controles táctiles grandes para uso con guantes o manos húmedas: mínimo 44–48 px. | Botones de 48–64 px, botón "Reportar" central de 64 px. |
| RNF-02 | Usabilidad | Registrar un foco en menos de 1 minuto y en máximo 3 pasos. | Formulario en 3 pasos numerados con estado de avance. |
| RNF-03 | Claridad | Codificación por color consistente del riesgo: rojo = alto, naranja = medio, verde = bajo. | Mismos colores en panel, mapa, riesgo y alertas, siempre acompañados de texto. |
| RNF-04 | Consistencia | Misma estructura visual en todas las pantallas. | Encabezado verde, tarjetas, tipografía Outfit y paleta reutilizados desde componentes compartidos. |
| RNF-05 | Retroalimentación | Toda acción debe responder visiblemente. | Estados de carga ("Ingresando…", "Enviando…"), confirmaciones, chips activos y contadores. |
| RNF-06 | Prevención de errores | Evitar envíos incompletos o datos inválidos. | Validación del login, envío bloqueado hasta completar campos obligatorios. |
| RNF-07 | Carga de memoria | El usuario no debe recordar datos: el sistema los propone. | GPS automático, correo precargado, zona preseleccionada, pasos visibles. |
| RNF-08 | Accesibilidad | Contraste legible al sol, etiquetas en los campos, `aria-label` en botones de ícono, color nunca como única señal. | Etiquetas `<label>`, `aria-pressed`, textos junto a los colores, respeta "movimiento reducido". |
| RNF-09 | Adaptabilidad (*responsive*) | Funcionar en celular y verse como app móvil en escritorio. | Pantalla completa en móvil; marco de teléfono y panel de contexto en escritorio. |
| RNF-10 | Idioma y contexto | Lenguaje sencillo en español, con referencias reales de Urabá. | Municipios Carepa, Apartadó y Turbo; términos del agricultor. |
| RNF-11 | Rendimiento | Carga rápida en redes rurales lentas. | Páginas estáticas prerenderizadas, sin imágenes pesadas (ilustraciones SVG), fuente optimizada. |
| RNF-12 | Patrones visuales | Seguir patrones conocidos de apps móviles (Material Design). | Barra de navegación inferior, botón de acción flotante, tarjetas y chips. |
| RNF-13 | Mantenibilidad | Código modular y separado por vistas, componentes y datos. | Carpetas `app/`, `components/`, `lib/`; cada vista es un ECS independiente. |
| RNF-14 | Trazabilidad / GCS | Todo cambio debe quedar versionado y justificado. | Git con ramas protegidas, SemVer, plantillas de Issue/PR y CHANGELOG. |
| RNF-15 | Portabilidad / despliegue | Desplegable en la nube sin configuración especial. | Next.js en Vercel: producción desde `main` y vistas previas por rama. |

## Restricciones

- Prototipo de **solo frontend**: sin backend, base de datos, autenticación real ni servicios externos.
- La foto, el GPS, el clima y el mapa son **simulaciones** visuales.
- Los nombres de personas y fincas son ficticios.

## Requisitos añadidos por la OCI-001 (v1.1.0)

| ID | Tipo | Requisito | Pantalla |
|---|---|---|---|
| RF-21 | Funcional | Al registrar un foco *Severo* o *Crítico*, el sistema debe generar automáticamente una notificación fitosanitaria al ICA. | `/reportar` |
| RF-22 | Funcional | El sistema debe precargar el registro ICA del predio y exigirlo para enviar la notificación. | `/reportar` |
| RF-23 | Funcional | El sistema debe mostrar el número de radicado ICA en la confirmación del reporte. | `/reportar` |
| RF-24 | Funcional | El sistema debe listar las notificaciones ICA con estado (Pendiente, Enviada, Confirmada) y permitir reenviar las pendientes. | `/ica` |
| RNF-16 | No funcional (disponibilidad) | Si el servicio del ICA no responde, la notificación debe quedar en cola y reintentarse sin perder datos. | `/ica` |
| RNF-17 | No funcional (privacidad) | Solo se envían al ICA los datos necesarios del predio y del foco (Ley 1581 de 2012). | — |
