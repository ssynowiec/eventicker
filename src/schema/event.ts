import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { userTable } from '@/schema/user';

export const eventTable = pgTable('event', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	slug: text('slug').notNull(),
	description: text('description'),
	start_date: text('start_date').notNull(),
	creator_id: text('creator_id')
		.notNull()
		.references(() => userTable.id),

	created_at: timestamp('created_at').defaultNow().notNull(),
	updated_at: timestamp('updated_at')
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
});
