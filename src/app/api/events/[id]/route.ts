import type { NextRequest } from 'next/server';
import { db } from '@/lib/auth/db';
import { eventTable } from '@/schema/event';
import { and, eq } from 'drizzle-orm';
import { lucia } from '@/lib/auth/auth';

interface EventIdParams {
	id: string;
}

export const GET = async (
	req: NextRequest,
	context: { params: Promise<EventIdParams> },
) => {
	if (req.cookies.get('auth_session')?.value) {
		const { user } = await lucia.validateSession(
			req.cookies.get('auth_session')?.value ?? '',
		);

		if (!user) {
			return new Response('Unauthorized', {
				status: 401,
			});
		}

		console.log('user', user);

		const events = await db
			.select()
			.from(eventTable)
			.where(
				and(
					eq(eventTable.id, Number((await context.params).id)),
					eq(eventTable.creator_id, user.id),
				),
			);

		if (events.length === 0) {
			return new Response('Not found', {
				status: 404,
			});
		}

		return new Response(JSON.stringify(events[0]), {
			status: 200,
		});
	}

	const events = await db
		.select()
		.from(eventTable)
		.where(
			and(
				eq(eventTable.id, Number((await context.params).id)),
				eq(eventTable.status, 'PUBLISHED'),
			),
		);

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
	context: { params: Promise<EventIdParams> },
) => {
	const id = Number((await context.params).id);

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
