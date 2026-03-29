import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { ConsultationService } from './consultation.service';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  create(@Body() body: { triageId: string; userId?: string }) {
    return this.consultationService.create(body.triageId, body.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationService.findById(id);
  }

  @Get('queue/waiting')
  findWaiting() {
    return this.consultationService.findWaiting();
  }

  @Patch(':id/assign')
  assignDoctor(
    @Param('id') id: string,
    @Body() body: { doctorId: string },
  ) {
    return this.consultationService.assignDoctor(id, body.doctorId);
  }

  @Patch(':id/close')
  close(@Param('id') id: string) {
    return this.consultationService.close(id);
  }
}
