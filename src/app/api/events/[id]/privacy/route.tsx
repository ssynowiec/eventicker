import { lucia } from '@/lib/auth/auth';
import { db } from '@/lib/auth/db';
import {
	insertPrivacyPolicySchema,
	privacyPolicies,
} from '@/schema/privacy_policies';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

interface EventIdParams {
	id: string;
}

export const GET = async (
	req: NextRequest,
	context: { params: EventIdParams },
) => {
	const id = Number(context.params.id);

	const privacy = await db
		.select()
		.from(privacyPolicies)
		.where(eq(privacyPolicies.eventId, id));

	if (privacy.length === 0) {
		return new Response('Not found', {
			status: 404,
		});
	}

	return new Response(JSON.stringify(privacy[0]), {
		status: 200,
	});
};

export const POST = async (
	req: NextRequest,
	context: { params: EventIdParams },
) => {
	const { user } = await lucia.validateSession(
		req.cookies.get('auth_session')?.value ?? '',
	);

	console.log(user);
	console.log(req.cookies.get('auth_session')?.value);

	if (!user) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}

	const id = Number(context.params.id);

	const newPrivacy = insertPrivacyPolicySchema.parse(await req.json());

	const privacy = await db
		.insert(privacyPolicies)
		.values(newPrivacy)
		.returning();

	return new Response(JSON.stringify(privacy[0]), {
		status: 200,
	});
};

export const PUT = async (
	req: NextRequest,
	context: { params: EventIdParams },
) => {
	const { user } = await lucia.validateSession(
		req.cookies.get('auth_session')?.value ?? '',
	);

	if (!user) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}

	const id = Number(context.params.id);

	const newPrivacy = insertPrivacyPolicySchema.parse(await req.json());

	const privacy = await db
		.update(privacyPolicies)
		.set({ privacyText: newPrivacy.privacyText })
		.where(eq(privacyPolicies.eventId, id))
		.returning();

	return new Response(JSON.stringify(privacy[0]), {
		status: 200,
	});
};
