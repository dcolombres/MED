import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConsultationService } from './consultation.service';

@WebSocketGateway({
  cors: { origin: process.env.FRONTEND_URL || 'http://localhost:3000' },
  namespace: '/consultation',
})
export class ConsultationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly consultationService: ConsultationService) {}

  handleConnection(client: Socket) {
    console.log(`[WS] Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`[WS] Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(
    @MessageBody() data: { consultationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(data.consultationId);
    client.emit('joined', { room: data.consultationId });
    return { event: 'joined', data: { room: data.consultationId } };
  }

  @SubscribeMessage('send-message')
  async handleMessage(
    @MessageBody()
    data: {
      consultationId: string;
      senderId: string;
      senderType: 'PATIENT' | 'DOCTOR';
      content: string;
      imageUrl?: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.consultationService.addMessage(
      data.consultationId,
      data.senderId,
      data.senderType,
      data.content,
      data.imageUrl,
    );
    // Broadcast to everyone in the room
    this.server.to(data.consultationId).emit('new-message', message);
    return message;
  }

  @SubscribeMessage('close-consultation')
  async handleClose(
    @MessageBody() data: { consultationId: string },
    @ConnectedSocket() _client: Socket,
  ) {
    const consultation = await this.consultationService.close(
      data.consultationId,
    );
    this.server
      .to(data.consultationId)
      .emit('consultation-closed', { consultationId: data.consultationId });
    return consultation;
  }

  // Called by DoctorService when a doctor accepts a consultation
  notifyPatientDoctorReady(consultationId: string, doctorName: string) {
    this.server
      .to(consultationId)
      .emit('doctor-ready', { doctorName, consultationId });
  }
}
