import { db } from '@/lib/auth/db';
import { eventTable, insertEventSchema } from '@/schema/event';
import { NextRequest } from 'next/server';
import { lucia } from '@/lib/auth/auth';
import { eq } from 'drizzle-orm';
import { ZodError } from 'zod';

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

export const POST = async (req: NextRequest) => {
	const { user } = await lucia.validateSession(
		req.cookies.get('auth_session')?.value ?? '',
	);

	if (!user) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}

	try {
		const newEvent = insertEventSchema.parse(await req.json());

		const event = await db
			.insert(eventTable)
			.values({ ...newEvent, creator_id: user.id });

		return new Response(JSON.stringify(event), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (e) {
		if (e instanceof ZodError) {
			return new Response(e.message, {
				status: 400,
			});
		}
	}
};