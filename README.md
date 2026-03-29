# 🏥 MED — Plataforma de Telemedicina MVP

> **MVP funcional de telemedicina** con flujo de triage, autenticación sin contraseña, consulta médica online, pagos y generación de documentos clínicos. Diseñado bajo principios de arquitectura limpia y cumplimiento regulatorio argentino.

[![GitHub](https://img.shields.io/badge/GitHub-dcolombres%2FMED-blue?logo=github)](https://github.com/dcolombres/MED)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)
![NestJS](https://img.shields.io/badge/NestJS-10.x-e0234e?logo=nestjs)
![Next.js](https://img.shields.io/badge/Next.js-15.x-black?logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?logo=prisma)

---

## 📋 Índice

- [Descripción](#-descripción)
- [Arquitectura](#-arquitectura)
- [Stack Tecnológico](#-stack-tecnológico)
- [Módulos del Backend](#-módulos-del-backend)
- [Flujo Principal](#-flujo-principal)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Configuración del Entorno](#-configuración-del-entorno)
- [Inicio en Desarrollo](#-inicio-en-desarrollo)
- [Base de Datos](#-base-de-datos)
- [Convenciones](#-convenciones)

---

## 📖 Descripción

**MED** es un sistema de telemedicina orientado al mercado argentino que permite a los pacientes:

1. **Completar un triage digital** describiendo sus síntomas antes de la consulta.
2. **Autenticarse sin contraseña** mediante un Magic Link enviado por correo electrónico.
3. **Pagar la consulta** de forma integrada antes de iniciarla.
4. **Acceder a la consulta médica** con un profesional de salud.
5. **Recibir documentación clínica** (recetas, certificados, órdenes de estudios) generada automáticamente en PDF, con validez legal conforme a la normativa argentina.

El proyecto sigue el principio **KISS** (Keep It Simple, Stupid): sin sobreingeniería, sin capas innecesarias.

---

## 🏛 Arquitectura

```
MVP_med/
├── api/          # Backend REST — NestJS + Prisma
├── web/          # Frontend — Next.js (App Router)
├── docs/         # Documentación técnica y funcional
├── docker-compose.yml  # PostgreSQL para producción local
└── stack.md      # Registro del stack tecnológico
```

El sistema es un **monorepo simple** con dos aplicaciones independientes que se comunican vía HTTP REST.

```
[Usuario]
    │
    ▼
[Next.js Frontend :3000]
    │  HTTP/REST
    ▼
[NestJS API :3001]
    │
    ├─ [SQLite] (desarrollo)
    └─ [PostgreSQL] (producción)
```

---

## 🛠 Stack Tecnológico

### Backend (`/api`)
| Tecnología | Versión | Rol |
|---|---|---|
| Node.js | 20.x LTS | Runtime |
| TypeScript | 5.x | Lenguaje |
| NestJS | 10.x | Framework REST |
| Prisma | 5.x | ORM / Migraciones |
| SQLite | — | BD en desarrollo |
| PostgreSQL | 15 | BD en producción |
| JWT | — | Autenticación stateless |

### Frontend (`/web`)
| Tecnología | Versión | Rol |
|---|---|---|
| Next.js | 15.x | Framework React (App Router) |
| TypeScript | 5.x | Lenguaje |
| Tailwind CSS | 3.x | Estilos (Mobile First) |
| React Context | — | Estado global |

### Infraestructura
| Tecnología | Rol |
|---|---|
| Docker Compose | Levantar PostgreSQL localmente |
| GitHub | Control de versiones |
| Conventional Commits | Estándar de commits |

---

## 🧩 Módulos del Backend

### `AuthModule`
- **Magic Link**: Autenticación sin contraseña. Genera un token único, lo envía por email y lo valida al hacer click.
- **JWT**: Emisión de tokens de sesión tras validación del link.

### `TriageModule`
- Recopila síntomas del paciente antes de la consulta.
- Determina si el caso requiere certificado médico.
- Estados: `PENDING → COMPLETED → PAID → EXPIRED`.

### `ConsultationModule`
- Gestión del ciclo de vida de las consultas médicas.
- Vincula triage, paciente y médico.

### `PaymentModule`
- Integración con pasarela de pagos.
- Confirma el pago antes de habilitar la consulta.

### `DoctorModule`
- Gestión de perfiles de profesionales médicos.
- Disponibilidad y asignación a consultas.

### `DocumentsModule`
- Generación de PDFs clínicos: recetas, certificados, órdenes de estudios.
- Archivos servidos como archivos estáticos desde `/uploads`.

### `PrismaModule`
- Servicio global de base de datos, inyectable en todos los módulos.

---

## 🔄 Flujo Principal

```
1. Paciente ingresa síntomas  →  Triage creado (PENDING)
2. Sistema envía Magic Link   →  Paciente verifica email
3. Paciente hace click        →  Sesión JWT iniciada
4. Paciente paga              →  Triage actualizado (PAID)
5. Médico atiende consulta    →  Consulta completada
6. Sistema genera PDF         →  Documento disponible en /uploads
```

---

## 📁 Estructura del Proyecto

```
api/
├── src/
│   ├── auth/           # Magic Link + JWT
│   ├── triage/         # Flujo de síntomas
│   ├── consultation/   # Gestión de consultas
│   ├── payment/        # Pagos
│   ├── doctor/         # Profesionales
│   ├── documents/      # Generación de PDFs
│   ├── prisma/         # Servicio de BD
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma   # Modelos: User, Triage, MagicLinkToken
│   └── migrations/
└── uploads/            # PDFs generados (servidos como estáticos)

web/
├── src/
│   ├── app/
│   │   ├── auth/verify/    # Verificación del Magic Link
│   │   ├── checkout/       # Pantalla de pago
│   │   └── success/        # Confirmación post-pago
│   ├── components/
│   │   ├── auth/Onboarding.tsx
│   │   └── triage/TriageFlow.tsx
│   └── lib/
│       └── api.ts          # Cliente HTTP centralizado
```

---

## ⚙️ Configuración del Entorno

### Backend (`/api/.env`)
Crear el archivo `/api/.env` basándote en este modelo:

```env
# Base de datos (desarrollo con SQLite)
DATABASE_URL="file:./dev.db"

# Base de datos (producción con PostgreSQL)
# DATABASE_URL="postgresql://user:password@localhost:5432/mvp_med"

# JWT
JWT_SECRET="tu_secreto_jwt_super_seguro"
JWT_EXPIRES_IN="7d"

# Email para Magic Link
MAIL_HOST="smtp.ejemplo.com"
MAIL_PORT=587
MAIL_USER="no-reply@ejemplo.com"
MAIL_PASS="tu_password_smtp"

# URL base del frontend (para el Magic Link)
FRONTEND_URL="http://localhost:3000"
```

> ⚠️ **NUNCA** commitear el archivo `.env` con credenciales reales.

---

## 🚀 Inicio en Desarrollo

### 1. Instalar dependencias

```bash
# Backend
cd api && npm install

# Frontend
cd ../web && npm install
```

### 2. Levantar la base de datos (opcional — solo para PostgreSQL)

```bash
# Desde la raíz del proyecto
docker compose up -d
```

### 3. Aplicar migraciones de Prisma

```bash
cd api
npx prisma migrate dev --name init
```

### 4. Iniciar los servidores

```bash
# Terminal 1 — Backend (http://localhost:3001)
cd api
npm run start:dev

# Terminal 2 — Frontend (http://localhost:3000)
cd web
npm run dev
```

---

## 🗄 Base de Datos

### Modelos actuales (`schema.prisma`)

| Modelo | Descripción |
|---|---|
| `User` | Paciente autenticado con email + CUID |
| `MagicLinkToken` | Token de autenticación sin contraseña |
| `Triage` | Registro de síntomas con estado del flujo |

### Estados del Triage

```
PENDING → COMPLETED → PAID → EXPIRED
```

---

## 📐 Convenciones

### Commits (Conventional Commits)
```
feat:     nueva funcionalidad
fix:      corrección de bug
refactor: refactorización sin cambio funcional
docs:     cambios en documentación
chore:    tareas de mantenimiento (deps, config)
```

### Idioma
- **Código, variables, comentarios técnicos:** Inglés
- **Documentación, comunicación, commits:** Español

### Documentación
- `README.md` → actualizar ante cada cambio funcional
- `stack.md` → actualizar ante cualquier cambio de tecnología
- `docs/` → flujos extraordinarios y guías de despliegue

---

## 👤 Autor

**Diego Colombres** — [@dcolombres](https://github.com/dcolombres)
