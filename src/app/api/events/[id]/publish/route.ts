import type { NextRequest } from 'next/server';
import { db } from '@/lib/auth/db';
import { eventTable } from '@/schema/event';
import { eq } from 'drizzle-orm';
import { lucia } from '@/lib/auth/auth';

interface EventIdParams {
	id: string;
}

export const PUT = async (
	req: NextRequest,
	context: { params: Promise<EventIdParams> },
) => {
	const id = Number((await context.params).id);

	const events = await db
		.select()
		.from(eventTable)
		.where(eq(eventTable.id, id));

	if (events.length === 0) {
		return new Response('Not found', {
			status: 404,
		});
	}

	const event = events[0];

	const { user } = await lucia.validateSession(
		req.cookies.get('auth_session')?.value ?? '',
	);

	if (!user) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}

	if (event.creator_id !== user.id) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}

	try {
		const publishedEvent = await db
			.update(eventTable)
			.set({
				status: 'PUBLISHED',
			})
			.where(eq(eventTable.id, id))
			.returning();

		if (publishedEvent) {
			return new Response('Successfully published event', {
				status: 200,
			});
		}
	} catch (e) {
		if (e instanceof Error) {
			return new Response(e.message, {
				status: 500,
			});
		}
	}
};
