import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { TriageModule } from './triage/triage.module';
import { AuthModule } from './auth/auth.module';
import { ConsultationModule } from './consultation/consultation.module';
import { PaymentModule } from './payment/payment.module';
import { DoctorModule } from './doctor/doctor.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    // Serve uploaded PDFs as static files for local dev
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    TriageModule,
    ConsultationModule,
    PaymentModule,
    DoctorModule,
    DocumentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
