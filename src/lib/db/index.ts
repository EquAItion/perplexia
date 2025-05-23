import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Use in-memory database for production environments
const sqlite = new Database(process.env.NODE_ENV === 'production' ? ':memory:' : 'data/db.sqlite');

// Enable WAL mode for better concurrency
sqlite.pragma('journal_mode = WAL');

const db = drizzle(sqlite, {
  schema: schema,
});

export default db;
