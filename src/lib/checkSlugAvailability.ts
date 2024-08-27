'use server';

import { env } from '@/env';

export const checkSlugAvailability = async (slug: string) => {
	console.log('Checking slug availability:', slug);
	const res = await fetch(`${env.API_URL}/event?slug=${slug}`, {
		method: 'GET',
		credentials: 'include',
	});

	console.log('Response:', res.status);

	if (res.status === 404) {
		return true;
	} else {
		throw new Error('Slug is not available');
	}
};
