import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import path from 'path';
import { promises as fs } from 'fs';

const initializeDatabase = async () => {
  const dbPath = path.join(process.cwd(), 'data/db.sqlite');
  let sqlite;

  try {
    // Ensure data directory exists
    const dataDir = path.dirname(dbPath);
    await fs.mkdir(dataDir, { recursive: true });

    // Initialize database with write permissions
    sqlite = new Database(dbPath, { fileMustExist: false });
    
    // Test database connection
    sqlite.prepare('SELECT 1').get();

    return drizzle(sqlite, { schema });
  } catch (error) {
    console.error('Database initialization error:', error);
    throw new Error('Failed to initialize database. Please check file permissions and disk space.');
  }
};

let db: ReturnType<typeof drizzle>;

try {
  db = drizzle(new Database(path.join(process.cwd(), 'data/db.sqlite')), { schema });
} catch (error) {
  console.error('Using fallback database initialization...');
  // Initialize asynchronously for production environment
  initializeDatabase().then((database) => {
    db = database;
  }).catch((error) => {
    console.error('Fatal database error:', error);
  });
}

export default db;
