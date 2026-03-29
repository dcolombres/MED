import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'file:./dev.db', // Hardcoded para SQLite en el MVP para evitar conflictos
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
