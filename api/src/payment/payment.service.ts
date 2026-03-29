import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea una preferencia de pago en MercadoPago y registra en BD.
   * Por ahora simula el SDK de MP - reemplazar con SDK real cuando se tengan credenciales.
   */
  async createPreference(consultationId: string, amount: number) {
    const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    const frontendUrl =
      process.env.FRONTEND_URL || 'http://localhost:3000';

    // Simulación del SDK de MercadoPago para MVP
    // En producción: usar MercadoPago SDK oficial
    let preference: { id: string; init_point: string };

    if (
      !mpAccessToken ||
      mpAccessToken.startsWith('TEST-000000')
    ) {
      // Mock para desarrollo local
      preference = {
        id: `mock-pref-${consultationId}`,
        init_point: `${frontendUrl}/checkout/success?external_reference=${consultationId}&status=approved`,
      };
    } else {
      // En producción, integrar aquí el SDK real de MercadoPago
      // const { MercadoPagoConfig, Preference } = await import('mercadopago');
      // const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
      // const pref = new Preference(client);
      // const result = await pref.create({ body: { ... } });
      preference = {
        id: `real-pref-${consultationId}`,
        init_point: `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=...`,
      };
    }

    // Crear registro de pago en BD
    const payment = await this.prisma.payment.create({
      data: {
        consultationId,
        mpPreferenceId: preference.id,
        status: 'PENDING',
        amount,
      },
    });

    return { payment, init_point: preference.init_point };
  }

  /**
   * Webhook de MercadoPago — actualiza el estado del pago.
   */
  async handleWebhook(body: {
    type: string;
    data?: { id?: string };
    topic?: string;
  }) {
    if (body.type !== 'payment' && body.topic !== 'payment') return;

    const mpPaymentId = body.data?.id;
    if (!mpPaymentId) return;

    // En un caso real, consultaríamos la API de MP para obtener el estado real
    // Por MVP, buscamos el pago por mpPreferenceId y lo aprobamos
    const payment = await this.prisma.payment.findFirst({
      where: { mpPaymentId: null, status: 'PENDING' },
    });

    if (!payment) return;

    return this.prisma.payment.update({
      where: { id: payment.id },
      data: { mpPaymentId, status: 'APPROVED' },
    });
  }

  /**
   * Polling: el frontend consulta el estado del pago mientras espera el webhook.
   */
  async getStatusByConsultation(consultationId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { consultationId },
    });
    if (!payment) throw new BadRequestException('Payment not found');
    return { status: payment.status, consultationId };
  }
}
