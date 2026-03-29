import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(
    @Body()
    body: {
      name: string;
      email: string;
      matricula: string;
      especialidad?: string;
    },
  ) {
    return this.doctorService.create(body);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get('available')
  findAvailable() {
    return this.doctorService.findAvailable();
  }

  @Patch(':id/status')
  setStatus(
    @Param('id') id: string,
    @Body() body: { status: 'AVAILABLE' | 'BUSY' | 'OFFLINE' },
  ) {
    return this.doctorService.setStatus(id, body.status);
  }

  @Post(':id/accept-consultation')
  acceptConsultation(
    @Param('id') id: string,
    @Body() body: { consultationId: string },
  ) {
    return this.doctorService.acceptConsultation(id, body.consultationId);
  }
}
