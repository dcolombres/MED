# UC-04: Consulta Médica (Chat Real-Time)

## Objetivo
Facilitar la interacción bidireccional ágil, confidencial y cifrada entre el paciente y el médico asignado.

## Actores
- Paciente
- Médico de Guardia (Dashboard Admin)
- Gateway Socket.io / NestJS

## Flujo Principal
1. En la Sala de Espera, el back-end enruta al paciente con un Médico libre.
2. Se une a ambos a una _Room_ privada en el WebSocket.
3. El paciente recibe una alerta visual: "Tu médico te está atendiendo".
4. Ambos intercambian texto enriquecido. Si es necesario, el paciente envía una fotografía visible de sus estudios físicos pasados o la zona dolorizada al chat (Almacenamiento temporal/seguro en S3).
5. El médico elabora el diagnóstico en su panel paralelo.
6. El médico emite los documentos requeridos de forma optativa (Ej. Receta Digital, Certificado de Licencia Laboral).
7. El médico finaliza expresamente la comunicación presionando "Cerrar Consulta".
8. El Chat pasa a modo Historial Inmutable.

## Reglas de Negocio
- Los datos de imágenes enviados no deben ser indexados por buscadores (S3 privado).
- Ninguna de las partes puede "borrar" un mensaje ya enviado por cuestiones legales de mala praxis y auditoría.
