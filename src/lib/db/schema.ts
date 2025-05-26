import { sql } from 'drizzle-orm';
import { text, integer, pgTable, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const messages = pgTable('messages', {
  id: integer('id').primaryKey(),
  content: text('content').notNull(),
  chatId: text('chatId').notNull(),
  messageId: text('messageId').notNull(),
  role: text('role').notNull().$type<'assistant' | 'user'>(),
  metadata: jsonb('metadata'),
});

interface File {
  name: string;
  fileId: string;
}

export const chats = pgTable('chats', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  focusMode: text('focusMode').notNull(),
  files: jsonb('files').default(sql`'[]'::jsonb`).$type<File[]>(),
});
