'use server';

import { env } from '@/env';

export const deleteEventById = async (eventId: string | number) => {
	const res = await fetch(`${env.API_URL}/events/${eventId.toString()}`, {
		method: 'DELETE',
	});
};
