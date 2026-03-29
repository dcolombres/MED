# UC-01: Onboarding y Registro

## Objetivo
Permitir que un prospecto/paciente inicie sesión sin contraseñas de la forma más rápida posible para acceder al servicio de guardia.

## Actores
- Paciente
- Servicio Auth (Auth0 / Firebase / NextAuth)

## Flujo Principal
1. El Paciente ingresa a la Landing Page.
2. Presiona "Consultar Médico Ahora".
3. El sistema solicita DNI, Nombre y Teléfono (o email).
4. Se envía un Magic Link o SMS OTP al Paciente.
5. El Paciente verifica su identidad mediante el código o enlace recibido.
6. El sistema crea o recupera el ID del Paciente en BD y abre la sesión.

## Reglas de Negocio
- El DNI es obligatorio como clave principal en Argentina para validación de Identidad y posterior cruce con obras sociales.
- El **access token** (JWT) expira en **30 minutos**. El **refresh token** tiene vigencia de **7 días**.
- Tras 30 min de inactividad se requiere re-autenticación sin necesidad de nuevo Magic Link (se usa el refresh token si está vigente).
- Al cerrar sesión activamente, ambos tokens se invalidan en el servidor (blacklist Redis).
