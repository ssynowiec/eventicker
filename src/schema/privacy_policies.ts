import { pgTable, integer, timestamp, text } from 'drizzle-orm/pg-core';
import { eventTable } from './event';

export const privacyPolicies = pgTable('privacy_policies', {
	eventId: integer('event_id')
		.primaryKey()
		.references(() => eventTable.id),
	privacyText: text('privacy_text'),
	lastUpdated: timestamp('last_updated', { withTimezone: true }).defaultNow(),
});
