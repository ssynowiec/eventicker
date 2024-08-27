import { z } from 'zod';
import { selectEventSchema } from '@/schema/event';

type Event = z.infer<typeof selectEventSchema>;

export const publishEvent = async (event: Event) => {
	try {
		const res = await fetch(`/api/event/${event.id}/publish`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(event),
		});
	} catch (e) {
		console.error('Failed to publish event:', e);
	}
};
