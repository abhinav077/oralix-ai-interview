import 'dotenv/config';
import {PrismaClient} from './generated/prisma/client';
import {PrismaPg} from '@prisma/adapter-pg';

const globalForPrisma = globalThis;
const prismaCacheKey = '__oralixPrismaV2';

const databaseUrl = process.env.DATABASE_URL?.trim().replace(/^['"]|['"]$/g, '');

if (!databaseUrl) {
    throw new Error('DATABASE_URL is missing or empty. Set it in the runtime environment that starts the server.');
}

function buildPoolConfig(connectionString) {
    const parsedUrl = new URL(connectionString);
    const password = typeof parsedUrl.password === 'string'
        ? decodeURIComponent(parsedUrl.password)
        : '';

    const shouldUseSsl =
        parsedUrl.searchParams.get('sslmode') === 'require' ||
        parsedUrl.hostname.endsWith('.supabase.com');

    return {
        host: parsedUrl.hostname,
        port: Number(parsedUrl.port || 5432),
        user: decodeURIComponent(parsedUrl.username),
        password,
        database: parsedUrl.pathname.replace(/^\//, ''),
        ssl: shouldUseSsl ? { rejectUnauthorized: false } : undefined,
    };
}

function createPrismaClient() {
    const adapter = new PrismaPg(buildPoolConfig(databaseUrl));
    return new PrismaClient({ adapter });
}

export const db = globalForPrisma[prismaCacheKey] ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma[prismaCacheKey] = db;
