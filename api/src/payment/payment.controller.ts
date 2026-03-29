import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-preference')
  createPreference(@Body() body: { consultationId: string; amount: number }) {
    return this.paymentService.createPreference(
      body.consultationId,
      body.amount,
    );
  }

  @Post('webhook')
  handleWebhook(@Body() body: any) {
    return this.paymentService.handleWebhook(body);
  }

  @Get('status/:consultationId')
  getStatus(@Param('consultationId') consultationId: string) {
    return this.paymentService.getStatusByConsultation(consultationId);
  }
}
