# UC-02: Triage y Evaluación Sintomática

## Objetivo
Capturar de forma inicial y rápida los síntomas del paciente para segmentar a qué profesional deberá enrutarse la consulta.

## Actores
- Paciente
- Sistema de Asignación / Cola

## Flujo Principal
1. Una vez autenticado (UC-01), el Paciente visualiza una pantalla con opciones predefinidas de motivos de consulta (Ej: "Gripe o cuadro viral", "Dolor o malestar agudo", "Pedido de Recetas", "Otra derivación", "Certificado Laboral por Reposo").
2. El Paciente selecciona la opción correspondiente o escribe una línea breve sobre su dolor.
3. El sistema etiqueta la especialidad primaria requerida (generalmente Clínico de guardia).
4. El sistema avanza al flujo de Checkout o Sala de Espera.

## Reglas de Negocio
- Se prioriza una UI minimalista para no causar sobrecarga cognitiva (Fatiga). Detalles extra (peso, edad precisa, alergias) se piden de forma opcional *después* de que se garantiza la retención.
