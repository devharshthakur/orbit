import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `var` declarations to prevent multiple instances during development
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
