import type { NextRequest } from 'next/server';
import { db } from '@/lib/auth/db';
import { eventTable } from '@/schema/event';
import { eq } from 'drizzle-orm';

interface GetEventBySlugParams {
	slug: string;
}

export const GET = async (
	req: NextRequest,
	context: { params: GetEventBySlugParams },
) => {
	const events = await db
		.select()
		.from(eventTable)
		.where(eq(eventTable.slug, context.params.slug));

	if (events.length === 0) {
		return new Response('Not found', {
			status: 404,
		});
	}

	return new Response(JSON.stringify(events[0]), {
		status: 200,
	});
};

interface DeleteEventByIdParams {
	id: string;
}

export const DELETE = async (
	req: NextRequest,
	context: { params: DeleteEventByIdParams },
) => {
	const id = context.params.id;

	console.log('Deleting event with ID:', id);

	return new Response(`Deleting event with ID: ${id}`);
};
