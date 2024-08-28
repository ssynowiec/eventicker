import { env } from '@/env';
import { selectEventSchema } from '@/schema/event';
import parse from 'html-react-parser';
import { notFound } from 'next/navigation';

interface EventPageProps {
	params: { slug: string };
}

const getEventBySlug = async (slug: string) => {
	try {
		const res = await fetch(`${env.API_URL}/events?slug=${slug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();

		if (!res.ok) {
			new Error(data.message);
		}

		return selectEventSchema.parse(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
	}
};

const EventPage = async ({ params: { slug } }: EventPageProps) => {
	const event = await getEventBySlug(slug);

	if (!event || event.status !== 'PUBLISHED') {
		return notFound();
	}

	return (
		<>
			<h1>{event.name}</h1>

			{event.description && (
				<div>
					<p>Description</p>
					{parse(event.description)}
				</div>
			)}
		</>
	);
};

export default EventPage;
