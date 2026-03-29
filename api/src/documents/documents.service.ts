import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import PDFDocument from 'pdfkit';
import * as QRCode from 'qrcode';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentsService {
  private readonly uploadsDir: string;
  private readonly publicUrl: string;

  constructor(private readonly prisma: PrismaService) {
    this.uploadsDir = process.env.UPLOADS_DIR || './uploads';
    this.publicUrl =
      process.env.UPLOADS_PUBLIC_URL || 'http://localhost:3001/uploads';
    // Ensure uploads directory exists
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  // ─── PRESCRIPTION ─────────────────────────────────────────────────────────

  async generatePrescription(consultationId: string, data: {
    medications: Array<{ name: string; dose: string; frequency: string; quantity: string }>;
    observations?: string;
    doctorName: string;
    doctorMatricula: string;
    patientName: string;
    patientDni: string;
  }) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id: consultationId },
      include: { doctor: true, user: true },
    });
    if (!consultation) throw new NotFoundException('Consultation not found');

    const verificationCode = `RX-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const filename = `prescription-${consultationId}.pdf`;
    const filepath = path.join(this.uploadsDir, filename);

    await this.buildPrescriptionPdf(filepath, { ...data, verificationCode });

    const pdfUrl = `${this.publicUrl}/${filename}`;

    await this.prisma.prescription.create({
      data: {
        consultationId,
        medications: data.medications,
        observations: data.observations,
        pdfUrl,
        verificationCode,
      },
    });

    return { pdfUrl, verificationCode };
  }

  private async buildPrescriptionPdf(
    filepath: string,
    data: {
      doctorName: string;
      doctorMatricula: string;
      patientName: string;
      patientDni: string;
      medications: Array<{ name: string; dose: string; frequency: string; quantity: string }>;
      observations?: string;
      verificationCode: string;
    },
  ) {
    const qrDataUrl = await QRCode.toDataURL(
      `${this.publicUrl}/verify/${data.verificationCode}`,
    );
    const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');

    return new Promise<void>((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      // Header
      doc.fontSize(20).fillColor('#1a4fa0').text('ME-DIC', { align: 'center' });
      doc.fontSize(14).fillColor('#333').text('RECETA MÉDICA DIGITAL', { align: 'center' });
      doc.moveDown();
      doc.fontSize(10).fillColor('#666')
        .text(`Fecha: ${new Date().toLocaleDateString('es-AR')}`, { align: 'right' });
      doc.moveDown();

      // Doctor info
      doc.fillColor('#333').fontSize(11);
      doc.text(`Médico: ${data.doctorName}`);
      doc.text(`Matrícula: ${data.doctorMatricula}`);
      doc.moveDown();

      // Patient info
      doc.text(`Paciente: ${data.patientName}`);
      doc.text(`DNI: ${data.patientDni}`);
      doc.moveDown();

      // Medications
      doc.fontSize(13).fillColor('#1a4fa0').text('Medicamentos Prescriptos:');
      doc.fontSize(11).fillColor('#333');
      doc.moveDown(0.5);
      data.medications.forEach((med, i) => {
        doc.text(
          `${i + 1}. ${med.name} ${med.dose} — ${med.frequency} x ${med.quantity}`,
        );
      });

      if (data.observations) {
        doc.moveDown();
        doc.fontSize(11).text(`Observaciones: ${data.observations}`);
      }

      // QR Code
      doc.moveDown(2);
      doc.image(qrBuffer, { width: 80, align: 'right' });
      doc.fontSize(9).fillColor('#888')
        .text(`Código de verificación: ${data.verificationCode}`, { align: 'center' });
      doc.text('Ley 27.553 — Recetas Electrónicas/Digitales', { align: 'center' });

      doc.end();
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
  }

  // ─── MEDICAL CERTIFICATE ──────────────────────────────────────────────────

  async generateCertificate(consultationId: string, data: {
    doctorName: string;
    doctorMatricula: string;
    patientName: string;
    patientDni: string;
    daysOff: number;
    diagnosis?: string;
    returnDate: Date;
  }) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id: consultationId },
    });
    if (!consultation) throw new NotFoundException('Consultation not found');

    const verificationCode = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    const filename = `certificate-${consultationId}.pdf`;
    const filepath = path.join(this.uploadsDir, filename);

    await this.buildCertificatePdf(filepath, { ...data, verificationCode });

    const pdfUrl = `${this.publicUrl}/${filename}`;

    await this.prisma.medicalCertificate.create({
      data: {
        consultationId,
        daysOff: data.daysOff,
        diagnosis: data.diagnosis,
        returnDate: data.returnDate,
        pdfUrl,
        verificationCode,
      },
    });

    return { pdfUrl, verificationCode };
  }

  private async buildCertificatePdf(
    filepath: string,
    data: {
      doctorName: string;
      doctorMatricula: string;
      patientName: string;
      patientDni: string;
      daysOff: number;
      diagnosis?: string;
      returnDate: Date;
      verificationCode: string;
    },
  ) {
    const qrDataUrl = await QRCode.toDataURL(
      `${this.publicUrl}/verify/${data.verificationCode}`,
    );
    const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');

    return new Promise<void>((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      // Header
      doc.fontSize(20).fillColor('#1a4fa0').text('ME-DIC', { align: 'center' });
      doc.fontSize(14).fillColor('#333').text('CERTIFICADO MÉDICO LABORAL', { align: 'center' });
      doc.moveDown();
      doc.fontSize(10).fillColor('#666')
        .text(`Fecha de emisión: ${new Date().toLocaleDateString('es-AR')}`, { align: 'right' });
      doc.moveDown();

      // Doctor info
      doc.fillColor('#333').fontSize(11);
      doc.text(`Quien suscribe, Dr./Dra. ${data.doctorName}`);
      doc.text(`Matrícula Nº: ${data.doctorMatricula}`);
      doc.moveDown();

      // Certificate body
      doc.fontSize(11);
      doc.text(
        `CERTIFICA que el/la paciente ${data.patientName}, DNI ${data.patientDni}, ` +
        `requiere licencia médica por un plazo de ${data.daysOff} (${this.numberToWords(data.daysOff)}) días hábiles, ` +
        `con fecha de reintegro estimada el ${data.returnDate.toLocaleDateString('es-AR')}.`,
        { align: 'justify' },
      );

      if (data.diagnosis) {
        doc.moveDown();
        doc.text(`Motivo: ${data.diagnosis}`);
      }

      doc.moveDown(2);
      doc.text('El presente certificado es emitido para ser presentado ante quien corresponda.', {
        align: 'center',
        oblique: true,
      });

      // QR Code for verification
      doc.moveDown(2);
      doc.image(qrBuffer, { width: 80, align: 'right' });
      doc.fontSize(9).fillColor('#888')
        .text(`Código de verificación: ${data.verificationCode}`, { align: 'center' });
      doc.text('Verificar en: me-dic.com.ar/verificar', { align: 'center' });

      doc.end();
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
  }

  // ─── PUBLIC VERIFICATION ──────────────────────────────────────────────────

  async verify(code: string) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { verificationCode: code },
      include: { consultation: { include: { user: true } } },
    });
    if (prescription) {
      return { type: 'prescription', valid: true, issuedAt: prescription.issuedAt };
    }

    const certificate = await this.prisma.medicalCertificate.findUnique({
      where: { verificationCode: code },
      include: { consultation: { include: { user: true } } },
    });
    if (certificate) {
      return {
        type: 'certificate',
        valid: true,
        daysOff: certificate.daysOff,
        returnDate: certificate.returnDate,
        issuedAt: certificate.issuedAt,
      };
    }

    return { valid: false };
  }

  private numberToWords(n: number): string {
    const words = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez'];
    return words[n] ?? n.toString();
  }
}
