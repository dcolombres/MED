import { Controller, Post, Body } from '@nestjs/common';
import { TriageService } from './triage.service';

@Controller('triage')
export class TriageController {
  constructor(private readonly triageService: TriageService) {}

  @Post()
  async create(
    @Body() body: { 
      symptoms: any; 
      identityNumber?: string; 
      requiresCertificate?: boolean 
    }
  ) {
    return this.triageService.create(
      body.symptoms, 
      body.identityNumber, 
      body.requiresCertificate
    );
  }
}
