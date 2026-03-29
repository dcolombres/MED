import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    email: string;
    matricula: string;
    especialidad?: string;
  }) {
    return this.prisma.doctor.create({ data });
  }

  async findAll() {
    return this.prisma.doctor.findMany({ orderBy: { name: 'asc' } });
  }

  async findAvailable() {
    return this.prisma.doctor.findFirst({ where: { status: 'AVAILABLE' } });
  }

  async setStatus(doctorId: string, status: 'AVAILABLE' | 'BUSY' | 'OFF') {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return this.prisma.doctor.update({
      where: { id: doctorId },
      data: { status },
    });
  }

  /**
   * Doctor acepta una consulta de la cola.
   * Asigna la consulta y notifica al paciente via WebSocket.
   */
  async acceptConsultation(doctorId: string, consultationId: string) {
    const doctor = await this.prisma.doctor.findUnique({
      where: { id: doctorId },
    });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const consultation = await this.prisma.consultation.update({
      where: { id: consultationId },
      data: { doctorId, status: 'IN_PROGRESS', startedAt: new Date() },
    });

    await this.prisma.doctor.update({
      where: { id: doctorId },
      data: { status: 'BUSY' },
    });

    return { consultation, doctor };
  }
}
