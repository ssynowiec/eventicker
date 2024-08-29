import { db } from '@/lib/auth/db';
import { eventTable, insertEventSchema } from '@/schema/event';
import { NextRequest } from 'next/server';
import { lucia } from '@/lib/auth/auth';
import { ZodError } from 'zod';
import { and, eq, or } from 'drizzle-orm';

export const GET = async (req: NextRequest) => {
	const slug = req.nextUrl.searchParams.get('slug') ?? '';
	const context = req.nextUrl.searchParams.get('context') ?? 'public';
	const authSession = req.cookies.get('auth_session')?.value ?? '';
	let user = null;

	if (authSession) {
		const session = await lucia.validateSession(authSession);
		user = session?.user ?? null;
	}

	if (slug) {
		let events;

		if (user) {
			events = await db
				.select()
				.from(eventTable)
				.where(
					and(
						eq(eventTable.slug, slug),
						or(
							eq(eventTable.creator_id, user.id),
							eq(eventTable.status, 'PUBLISHED'),
						),
					),
				);
		} else {
			events = await db
				.select()
				.from(eventTable)
				.where(
					and(eq(eventTable.slug, slug), eq(eventTable.status, 'PUBLISHED')),
				);
		}

		if (events.length === 0) {
			return new Response('Not found', {
				status: 404,
			});
		}

		return new Response(JSON.stringify(events[0]), {
			status: 200,
		});
	}

	if (user) {
		let events;

		if (context === 'admin') {
			events = await db
				.select()
				.from(eventTable)
				.where(eq(eventTable.creator_id, user.id));
		} else {
			events = await db
				.select()
				.from(eventTable)
				.where(eq(eventTable.status, 'PUBLISHED'));
		}

		return new Response(JSON.stringify(events), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}

	const events = await db
		.select()
		.from(eventTable)
		.where(eq(eventTable.status, 'PUBLISHED'));

	if (events.length === 0) {
		return new Response('Not found', {
			status: 404,
		});
	}

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
