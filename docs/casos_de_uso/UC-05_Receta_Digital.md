# UC-05: Emisión de Receta Digital

## Objetivo
Emitir y disponibilizar un documento PDF digital validado y no editable para que el paciente consiga los medicamentos prescriptos de forma lícita.

## Actores
- Médico (que emite la receta)
- Backend (PDF Compiler)
- Almacenamiento S3

## Flujo Principal
1. Como acción de cierre de la consulta (UC-04), el Médico llena un input con drogas (ej. Ibuprofeno 600mg), cantidad y observaciones.
2. Inyecta este formulario junto al sello y su firma avanzada hacia el backend.
3. El backend interpola los datos (Nombre Paciente, Fecha, Firma, Meds) con una plantilla HTML (Handlebars/EJS o PDFKit).
4. El servidor renderiza y compila un PDF en memoria. Carga el buffer a Amazon S3 protegido.
5. Se retorna a la UI del Paciente un enlace firmado por tiempo limitado (`Signed URL`).
6. El paciente visualiza el botón principal: **"Descargar Receta Digital (PDF)"**.

## Reglas de Negocio
- La receta debe cumplir con la **Ley 27.553** de Recetas Electrónicas/Digitales: Número de matrícula del profesional legible, Fecha de expedición inmodificable, DNI del receptor, denominación genérica del medicamento, posología y código de verificación único generado por el sistema.
- La receta **no incluye diagnóstico** por defecto (se puede omitir a pedido del paciente por privacidad según Art. 8 Ley 26.529).
