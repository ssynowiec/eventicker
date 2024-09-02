import { env } from '@/env';
import { selectEventSchema } from '@/schema/event';
import parse from 'html-react-parser';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ClockIcon, MapPinIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { format, getHours, intlFormat, Locale } from 'date-fns';
import { enUS, pl } from 'date-fns/locale';
import { useLocale } from 'next-intl';
import { EventDateCard } from '@/components/EventDateCard';

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

const EventPage = ({ params: { slug } }: EventPageProps) => {
	// const event = await getEventBySlug(slug);
	// console.log(event);

	const event = {
		id: 31,
		name: 'Example First Event in 2024',
		slug: 'elo123',
		thumbnail:
			'https://res.cloudinary.com/eventicker/image/upload/v1725110305/dv0zhj5efjvsbyijhm6y.jpg',
		location: 'ul. Przykładowa 1, 00-001 Warszawa',
		status: 'PUBLISHED',
		description: 'Description here',
		start_date: '2024-08-22T11:30:22.955Z',
		creator_id: 'sklivwkszw7fuiij',
		created_at: '2024-08-27 09:52:03.065159',
		updated_at: '2024-08-27 09:52:03.065159',
	};

	if (!event) {
		return notFound();
	}

	return (
		<main className="min-h-svh">
			<section className="mx-3 flex h-full max-w-5xl flex-col gap-2 py-2 md:mx-auto">
				<Link
					href="/"
					className="flex items-center gap-1 underline-offset-4 hover:underline"
				>
					<ArrowLeft className="h-4 w-4" /> Back to events
				</Link>
				<AspectRatio ratio={16 / 9}>
					<Image
						src={event.thumbnail ?? ''}
						alt={`${event.name} thumbnail`}
						className="h-full w-full rounded-md object-cover"
						width={1600}
						height={900}
						priority={true}
					/>
				</AspectRatio>

				<div className="flex flex-col justify-between gap-2 pt-1 md:flex-row md:pt-3">
					<div className="order-2 md:order-1">
						<h1 className="text-2xl font-bold">{event.name}</h1>
						{event.description && <div>{parse(event.description)}</div>}
					</div>
					<EventDateCard
						eventName={event.name}
						eventLocation={event.location}
						eventSlug={event.slug}
						startDate={new Date(event.start_date)}
					/>
				</div>
			</section>
		</main>
	);
};

export default EventPage;
