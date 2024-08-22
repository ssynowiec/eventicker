import { db } from '@/lib/auth/db';
import { eventTable } from '@/schema/event';
import { NextRequest } from 'next/server';
import { lucia } from '@/lib/auth/auth';
import { eq } from 'drizzle-orm';

export const GET = async (req: NextRequest) => {
	const { user } = await lucia.validateSession(
		req.cookies.get('session_id')?.value ?? '',
	);

	if (!user) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}

	const events = await db
		.select()
		.from(eventTable)
		.where(eq(eventTable.creator_id, user.id));

	return new Response(JSON.stringify(events), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
