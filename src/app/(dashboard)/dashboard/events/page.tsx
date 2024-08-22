import { PageTitle } from '@/components/PageTitle';
import { getTranslations } from 'next-intl/server';
import { env } from '@/env';
import { cookies } from 'next/headers';
import { selectEventsSchema } from '@/schema/event';

const getEvents = async () => {
	const session_id = cookies().get('auth_session')?.value;

	const eventsRes = await fetch(`${env.API_URL}/event`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			Cookie: `session_id=${session_id}`,
		},
	});
	
	const events = await eventsRes.json();

	return selectEventsSchema.parse(events);
};

const EventsPage = async () => {
	const t = await getTranslations('Events');

	const events = await getEvents();

	return (
		<main>
			<PageTitle>{t('title')}</PageTitle>
			{events.length === 0 ? (
				<p>{t('noEvents')}</p>
			) : (
				<ul>
					{events.map((event) => (
						<li key={event.id}>{event.name}</li>
					))}
				</ul>
			)}
		</main>
	);
};

export default EventsPage;
