'use server';

import { env } from '@/env';
import { actionClient } from '@/lib/safe-action';
import { cookies } from 'next/headers';

export const createStripeAccountAction = actionClient.action(async () => {
	const res = await fetch(`${env.API_URL}/account/stripe/create`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			Cookie: (await cookies()).toString(),
			'Content-Type': 'application/json',
		},
	});

	if (res.status === 401) {
		return { failure: 'Unauthorized' };
	}

	if (res.status === 400) {
		return { failure: 'Bad request' };
	}

	return await res.json();
});
