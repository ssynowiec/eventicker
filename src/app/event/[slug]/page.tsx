import { env } from '@/env';
import { selectEventSchema } from '@/schema/event';
import parse from 'html-react-parser';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';

interface EventPageProps {
	params: { slug: string };
}

const getEventBySlug = async (slug: string) => {
	try {
		const res = await fetch(`${env.API_URL}/events?slug=${slug}`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Cookie: cookies().toString(),
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

	console.log(event);

	if (!event) {
		return notFound();
	}

	return (
		<main>
			<section className="mx-auto flex max-w-5xl flex-col gap-2 py-4">
				<AspectRatio ratio={16 / 9}>
					<Image
						src=""
						alt={`${event.name} thumbnail`}
						className="rounded-md object-cover"
						width={1600}
						height={900}
					/>
				</AspectRatio>

				<h1 className="text-2xl font-bold">{event.name}</h1>

				{event.description && <div>{parse(event.description)}</div>}
			</section>
		</main>
	);
};

export default EventPage;
