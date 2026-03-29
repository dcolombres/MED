# UC-03b: Sala de Espera Virtual

## Objetivo
Mantener al paciente informado y comprometido durante el tiempo de espera entre la confirmación de pago (UC-03) y el inicio de la consulta con el médico (UC-04), aprovechando el tiempo para recopilar información clínica adicional.

## Actores
- Paciente
- Sistema de Cola / Asignación de Médicos (Backend)

## Flujo Principal
1. Confirmado el pago (UC-03), el paciente entra a la pantalla de **Sala de Espera**.
2. El sistema muestra:
   - Número de lugar en la cola (Ej: "Hay 2 personas antes que vos").
   - Tiempo estimado de espera (calculado dinámicamente según médicos disponibles).
   - Indicador visual animado (spinner o barra de progreso no determinista).
3. De forma opcional y progresiva, el sistema solicita datos clínicos complementarios:
   - Alergias conocidas.
   - Medicación habitual.
   - Breve descripción adicional de síntomas.
4. El paciente puede completarlos o saltearlos sin penalidad.
5. Cuando un médico acepta la consulta, el back-end emite un evento WebSocket al cliente.
6. El paciente recibe notificación: **"Tu médico está listo"** y es redirigido al chat (UC-04).

## Reglas de Negocio
- Si el tiempo de espera supera los **15 minutos**, el sistema envía una notificación push/email/SMS al paciente para que no abandone la ventana.
- Si el paciente cierra la app/browser durante la espera, se reserva su lugar por un máximo de **5 minutos** antes de pasarlo al siguiente en la cola.
- Los datos clínicos recopilados aquí se adjuntan al historial de la consulta y son visibles por el médico antes de iniciar el chat.
