import { pgTable, text } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	username: text('username').notNull(),
	email: text('email').notNull(),
	avatar: text('avatar'),
	github_id: text('github_id'),
});
