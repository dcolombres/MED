import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConsultationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(triageId: string, userId?: string) {
    return this.prisma.consultation.create({
      data: { triageId, userId, status: 'WAITING' },
      include: { triage: true },
    });
  }

  async findById(id: string) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
      include: { doctor: true, messages: true, payment: true },
    });
    if (!consultation) throw new NotFoundException('Consultation not found');
    return consultation;
  }

  async assignDoctor(consultationId: string, doctorId: string) {
    // Mark doctor as BUSY
    await this.prisma.doctor.update({
      where: { id: doctorId },
      data: { status: 'BUSY' },
    });
    return this.prisma.consultation.update({
      where: { id: consultationId },
      data: { doctorId, status: 'IN_PROGRESS', startedAt: new Date() },
    });
  }

  async addMessage(
    consultationId: string,
    senderId: string,
    senderType: 'PATIENT' | 'DOCTOR',
    content: string,
    imageUrl?: string,
  ) {
    return this.prisma.message.create({
      data: { consultationId, senderId, senderType, content, imageUrl },
    });
  }

  async close(consultationId: string) {
    const consultation = await this.prisma.consultation.update({
      where: { id: consultationId },
      data: { status: 'COMPLETED', endedAt: new Date() },
      include: { doctor: true },
    });
    // Free the doctor
    if (consultation.doctorId) {
      await this.prisma.doctor.update({
        where: { id: consultation.doctorId },
        data: { status: 'AVAILABLE' },
      });
    }
    return consultation;
  }

  async findWaiting() {
    return this.prisma.consultation.findMany({
      where: { status: 'WAITING' },
      include: { triage: true, user: true },
      orderBy: { createdAt: 'asc' },
    });
  }
}
