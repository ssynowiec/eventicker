'use server';

import { env } from '@/env';
import { z } from 'zod';
import { insertEventSchema } from '@/schema/event';
import { cookies } from 'next/headers';

type NewEvent = z.infer<typeof insertEventSchema>;

export const createNewEvent = async (data: NewEvent) => {
	const res = await fetch(`${env.API_URL}/event`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: cookies().toString(),
		},
		body: JSON.stringify(data),
	});

	console.log(res.status);
};
