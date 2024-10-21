'use server';

import { env } from '@/env';
import { actionClient } from '@/lib/safe-action';
import { insertPrivacyPolicySchema } from '@/schema/privacy_policies';
import { cookies } from 'next/headers';

const schema = insertPrivacyPolicySchema;

export const updatePolicyActions = actionClient
	.schema(schema)
	.action(async ({ parsedInput: { eventId, privacyText } }) => {
		const res = await fetch(`${env.API_URL}/events/${eventId}/privacy`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				Cookie: (await cookies()).toString(),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ eventId, privacyText }),
		});

		if (res.status === 401) {
			return { failure: 'Unauthorized' };
		}

		if (res.status === 400) {
			return { failure: 'Bad request' };
		}

		return await res.json();
	});
