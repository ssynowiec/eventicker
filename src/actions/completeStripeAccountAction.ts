'use server';

import { env } from '@/env';
import { actionClient } from '@/lib/safe-action';
import { cookies } from 'next/headers';
import { z } from 'zod';

const completeStripeAccountParams = z.object({ account: z.string() });

export const completeStripeAccountAction = actionClient
	.schema(completeStripeAccountParams)
	.action(async ({ parsedInput: { account } }) => {
		const res = await fetch(`${env.API_URL}/account/stripe/complete`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				Cookie: (await cookies()).toString(),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ account }),
		});

		if (res.status === 401) {
			return { failure: 'Unauthorized' };
		}

		if (res.status === 400) {
			return { failure: 'Bad request' };
		}

		return await res.json();
	});
