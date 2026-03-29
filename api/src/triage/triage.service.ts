import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TriageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(symptoms: any, identityNumber?: string, requiresCertificate?: boolean) {
    return this.prisma.triage.create({
      data: {
        symptoms: JSON.stringify(symptoms), // Convertir JSON a String para SQLite
        identityNumber,
        requiresCertificate: !!requiresCertificate,
      },
    });
  }
}
