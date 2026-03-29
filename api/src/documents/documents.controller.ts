import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('prescription')
  generatePrescription(
    @Body()
    body: {
      consultationId: string;
      medications: Array<{ name: string; dose: string; frequency: string; quantity: string }>;
      observations?: string;
      doctorName: string;
      doctorMatricula: string;
      patientName: string;
      patientDni: string;
    },
  ) {
    return this.documentsService.generatePrescription(body.consultationId, body);
  }

  @Post('certificate')
  generateCertificate(
    @Body()
    body: {
      consultationId: string;
      doctorName: string;
      doctorMatricula: string;
      patientName: string;
      patientDni: string;
      daysOff: number;
      diagnosis?: string;
      returnDate: string;
    },
  ) {
    return this.documentsService.generateCertificate(body.consultationId, {
      ...body,
      returnDate: new Date(body.returnDate),
    });
  }

  @Get('verify/:code')
  verify(@Param('code') code: string) {
    return this.documentsService.verify(code);
  }
}
