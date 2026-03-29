import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async generateMagicLink(email: string) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    await this.prisma.magicLinkToken.create({
      data: { email, token, expiresAt },
    });

    // En un entorno real, enviaríamos el email aquí.
    console.log(`[MAGIC LINK] http://localhost:3000/auth/verify?token=${token}`);
    
    return { message: 'Magic link sent to your email' };
  }

  async verifyMagicLink(token: string) {
    const magicLink = await this.prisma.magicLinkToken.findUnique({
      where: { token },
    });

    if (!magicLink || magicLink.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Upsert user (si no existe, lo crea)
    const user = await this.prisma.user.upsert({
      where: { email: magicLink.email },
      update: {},
      create: { email: magicLink.email },
    });

    // Eliminar el token usado
    await this.prisma.magicLinkToken.delete({ where: { token } });

    return {
      accessToken: this.jwtService.sign({ email: user.email, sub: user.id }),
      user,
    };
  }
}
