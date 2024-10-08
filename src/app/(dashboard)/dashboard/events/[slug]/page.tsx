import { env } from '@/env';
import { selectEventSchema } from '@/schema/event';
import { notFound } from 'next/navigation';
import { EventStatus } from '@/components/EventStatus';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

interface EventAdminPageProps {
	params: { slug: string };
}

const getEventBySlug = async (slug: string) => {
	const res = await fetch(`${env.API_URL}/events?slug=${slug}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: cookies().toString(),
		},
	});
	return selectEventSchema.parse(await res.json());
};

const EventAdminPage = async ({ params: { slug } }: EventAdminPageProps) => {
	const event = await getEventBySlug(slug);
	const t = await getTranslations();

	if (!event) {
		return notFound();
	}

	console.log(event);

	return (
		<div className="flex items-center justify-between gap-2">
			<div className="flex items-center gap-2">
				<h1 className="text-2xl font-bold">{event.name}</h1>
				<EventStatus status={event.status} />
			</div>
			{event.status === 'DRAFT' && (
				<Button>🚀 {t('Events.Actions.publish')}</Button>
			)}
		</div>
	);
};

export default EventAdminPage;
