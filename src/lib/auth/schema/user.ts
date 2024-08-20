import { pgTable, text } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
	id: text('id').primaryKey(),
	github_id: text('github_id'),
	username: text('username').notNull(),
});
