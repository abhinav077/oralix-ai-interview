import {Pool} from 'pg';
import {PrismaClient} from './generated/prisma/client';
import {PrismaPg} from '@prisma/adapter-pg';

const globalForPrisma = globalThis;

const databaseUrl = process.env.DATABASE_URL?.trim().replace(/^['"]|['"]$/g, '');

if (!databaseUrl) {
    throw new Error('DATABASE_URL is missing or empty. Set it in the runtime environment that starts the server.');
}



function createPrismaClient() {
    const pool = new Pool({ connectionString: databaseUrl });
    const adapter = new PrismaPg({pool});
    return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;