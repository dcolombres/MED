# UC-07: Panel Médico / Gestión de Guardia

## Objetivo
Permitir que un profesional de salud registrado en UMA se incorpore a la cola de guardia, manage su disponibilidad y acepte/atienda consultas de pacientes entrantes.

## Actores
- Médico (usuario del backoffice)
- Sistema de Cola / Asignación

## Flujo Principal
1. El Médico ingresa al **Dashboard Interno** (ruta privada) con sus credenciales institucionales.
2. El Médico activa su estado: **"Tomar Guardia"** desde un botón prominente.
3. El sistema lo registra como disponible en la cola de médicos activos.
4. Cuando llega una consulta asignada, el médico recibe una notificación en pantalla con:
   - Nombre del Paciente.
   - Motivo de consulta (del Triage, UC-02).
   - Datos clínicos opcionales recopilados en Sala de Espera (UC-03b).
5. El médico puede **Aceptar** o (en casos excepcionales) **Derivar** la consulta.
6. Al aceptar, se une al WebSocket room del paciente (UC-04).
7. Al finalizar (presionando "Cerrar Consulta"), su estado vuelve a "Disponible" automáticamente.
8. El médico puede desactivar su guardia en cualquier momento pulsando **"Salir de Guardia"**.

## Reglas de Negocio
- Un médico no puede atender más de **1 consulta simultánea** en el MVP (escalar en v2).
- La **matrícula del médico** debe ser validada al momento del alta en la plataforma contra el padrón del **Ministerio de Salud de la Nación** (API de SISA o verificación manual).
- Los médicos deben renovar su estado activo cada **8 horas** para evitar quedarse en guardia "zombie" (sin respuesta).
- El historial de consultas del médico (fecha, duración, diagnóstico emitido) debe ser auditable por el equipo de calidad de UMA.
