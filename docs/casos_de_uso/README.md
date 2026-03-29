# Casos de Uso - ME-DIC

Este directorio contiene la documentación formal funcional del proyecto, dividida por actores (Paciente, Médico, Sistema) y flujos (Use Cases).

## Índice de Casos de Uso

| UC | Título | Actor Principal |
|---|---|---|
| [UC-01](./UC-01_Onboarding_y_Registro.md) | Onboarding y Registro | Paciente |
| [UC-02](./UC-02_Triage_y_Evaluacion.md) | Triage y Evaluación Sintomática | Paciente |
| [UC-03](./UC-03_Pago_y_Checkout.md) | Pago y Checkout (MercadoPago) | Paciente / Sistema |
| [UC-03b](./UC-03b_Sala_de_Espera.md) | Sala de Espera Virtual | Paciente / Sistema |
| [UC-04](./UC-04_Consulta_Medica.md) | Consulta Médica (Chat Real-Time) | Paciente + Médico |
| [UC-05](./UC-05_Receta_Digital.md) | Emisión de Receta Digital | Médico |
| [UC-06](./UC-06_Certificado_Medico.md) | Emisión de Certificado Médico Laboral | Médico |
| [UC-07](./UC-07_Panel_Medico.md) | Panel Médico / Gestión de Guardia | Médico |

## Flujo End-to-End

```
Entrada → [UC-01] → [UC-02] → [UC-03] → [UC-03b] → [UC-04] → [UC-05 / UC-06]
                                                          ↑
                                                       [UC-07] (Médico)
```

## Normativa Aplicable

| Ley | Aplica a |
|---|---|
| **Ley 25.326** | Protección de Datos Personales (chat, imágenes, historial) |
| **Ley 25.506** | Firma Digital (certificados y recetas) |
| **Ley 26.529** | Derechos del Paciente (confidencialidad diagnóstico) |
| **Ley 27.553** | Recetas Electrónicas / Digitales |
