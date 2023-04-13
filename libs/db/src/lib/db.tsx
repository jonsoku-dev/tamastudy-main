import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).__db) {
    (global as any).__db = new PrismaClient();
    (global as any).__db.$connect();
  }
  prisma = (global as any).__db;
}

export { prisma };
