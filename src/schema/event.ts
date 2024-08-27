import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { userTable } from '@/schema/user';
import { z } from 'zod';

export const eventStatusEnum = pgEnum('event_status', [
	'DRAFT',
	'PUBLISHED',
	'ARCHIVED',
]);

export const eventTable = pgTable('event', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	slug: text('slug').notNull(),
	status: eventStatusEnum('status').default('DRAFT').notNull(),
	description: text('description'),
	start_date: text('start_date').notNull(),
	creator_id: text('creator_id')
		.notNull()
		.references(() => userTable.id),

	created_at: timestamp('created_at', { mode: 'string' })
		.defaultNow()
		.notNull(),
	updated_at: timestamp('updated_at', { mode: 'string' })
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date().toDateString()),
});

export const selectEventsSchema = createSelectSchema(eventTable).array();
export const selectEventSchema = createSelectSchema(eventTable);
export const insertEventSchema = createInsertSchema(eventTable);
export const eventStatusEnumSchema = z.enum(eventStatusEnum.enumValues);
