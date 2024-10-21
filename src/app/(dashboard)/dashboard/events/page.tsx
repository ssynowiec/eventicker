import { PageTitle } from '@/components/PageTitle';
import { getTranslations } from 'next-intl/server';
import { env } from '@/env';
import { cookies } from 'next/headers';
import { Loading } from '@/components/Loading';
import { Suspense } from 'react';
import { DataTable } from '@/components/dataTable/DataTable';
import { eventsColumns } from '@/app/(dashboard)/dashboard/events/eventsColumns';
import { selectEventsSchema } from '@/schema/event';

const getEvents = async () => {
	const eventsRes = await fetch(`${env.API_URL}/events?context=admin`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			Cookie: (await cookies()).toString(),
		},
	});

	const events = await eventsRes.json();

	return selectEventsSchema.parse(events);
};

const EventsPage = async () => {
	const t = await getTranslations('Events');

	const events = await getEvents();

	return (
		<>
			<PageTitle>{t('title')}</PageTitle>
			<Suspense fallback={<Loading />}>
				<DataTable columns={eventsColumns} data={events} searchBy="name" />
			</Suspense>
		</>
	);
};

export default EventsPage;
