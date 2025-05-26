import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    host: process.env.DB_HOST || 'perplexia-db.ctg46gyw0poa.ap-south-1.rds.amazonaws.com',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'NaD+wcJGoAL8',
    database: process.env.DB_NAME || 'perplexia',
    ssl: process.env.DB_SSL === 'true'
  },
  verbose: true,
  strict: true,
});
