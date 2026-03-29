# UC-03: Pago y Checkout (MercadoPago)

## Objetivo
Asegurar el cobro de la consulta médica (o la validación de obra social completada) ANTES de ocupar la agenda de ingresos del médico.

## Actores
- Paciente
- Integración MercadoPago API
- API Backend (Validación de Webhook)

## Flujo Principal
1. Tras el Triage (UC-02), si el paciente amerita cobro directo, el sistema calcula la tarifa.
2. El usuario visualiza la pantalla de Pago y elige tarjeta, saldo de billetera, o Padrón de O.S.
3. Se invoca el widget Checkout Pro (Web) o nativo de MercadoPago.
4. El usuario procesa el dinero.
5. Un Webhook viaja al servidor validando la transacción. Se emite a la BD el estado `approved`.
6. El Front-end recibe confirmación y enruta al paciente a la Sala de Espera (Loading).

## Reglas de Negocio
- Si MercadoPago no devuelve inmediatamente el Webhook por demoras de red, el Front-end efectúa *Polling* corto al Back-end por un máximo de tiempo prudente.
- Está prohibido contactar médicos hasta que el pago (o cobertura) esté al 100% aprobado.
- **Fallback OS:** Si el DNI del paciente no puede cruzarse con un padrón de Obra Social activo en el sistema, el flujo cae automáticamente a *Pago Particular* sin bloquear la consulta. El paciente puede solicitar el reintegro a su OS por fuera de la plataforma.
