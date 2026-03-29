# UC-06: Emisión de Certificado Médico Laboral

## Objetivo
Generar y proveer un certificado de reposo o licencia médica homologado, que el paciente pueda descargar e imprimir o compartir digitalmente para presentar ante su empleador (RRHH).

## Actores
- Médico (Emisor)
- Generador de PDF (Backend)
- Paciente

## Flujo Principal
1. Durante el interrogatorio o cierre de la consulta (UC-04), el Médico determina el reposo del paciente.
2. El Médico completa el formulario de *Certificado Laboral* en su panel (indicando diagnóstico genérico, cantidad de días otorgados y fecha de alta/reintegro).
3. El servidor compila una plantilla legal que incluye el Nombre, DNI del paciente, Número de Matrícula del médico y la Firma Digital estampada.
4. El archivo PDF cerrado se hospeda temporal o permanentemente en un Bucket S3 seguro.
5. El Paciente encuentra destacado en la finalización de su cita el documento **"Certificado de Reposo Médico"** listo para su descarga (o su envío directo vía WhatsApp a su superior laboral).

## Reglas de Negocio
- **Validación Anti-Fraude:** El PDF emitido debe contar idealmente con un *Código QR* u hash unívoco verificable, para que Recursos Humanos de la empresa pueda acceder a la página oficial, ingresar el código y validar que dicho certificado fue efectivamente emitido por UMA.
- El formato impreso en PDF no puede modificarse una vez cerrado el caso.
- **Firma Digital del Médico:** debe estar respaldada por un certificado emitido por una Autoridad Certificante (CA) reconocida bajo **Ley 25.506** (ej. AFIP como PSP homologado, o una CA privada acreditada ante la Jefatura de Gabinete). UMA debe gestionar la incorporación de los profesionales al sistema de firma.
- Contemplar un período de gracia de **2 horas** para subsanar errores en el certificado antes de que quede bloqueado definitivamente.
