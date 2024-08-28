import type { NextRequest } from 'next/server';
import { db } from '@/lib/auth/db';
import { eventTable } from '@/schema/event';
import { eq } from 'drizzle-orm';

interface EventIdParams {
	id: string;
}

export const GET = async (
	req: NextRequest,
	context: { params: EventIdParams },
) => {
	const events = await db
		.select()
		.from(eventTable)
		.where(eq(eventTable.id, Number(context.params.id)));

	if (events.length === 0) {
		return new Response('Not found', {
			status: 404,
		});
	}

	return new Response(JSON.stringify(events[0]), {
		status: 200,
	});
};

export const DELETE = async (
	req: NextRequest,
	context: { params: EventIdParams },
) => {
	const id = Number(context.params.id);

	try {
		const deletedEvent = await db
			.delete(eventTable)
			.where(eq(eventTable.id, id))
			.returning();

		if (deletedEvent) {
			return new Response('Successfully deleted event', {
				status: 200,
			});
		}
	} catch (e) {
		return new Response('Something went wrong', {
			status: 500,
		});
	}
};
