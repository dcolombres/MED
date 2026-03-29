import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ConsultationModule } from '../consultation/consultation.module';

@Module({
  imports: [ConsultationModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
