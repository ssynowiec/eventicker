import { PageTitle } from '@/components/PageTitle';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';
import { env } from '@/env';
import { cookies } from 'next/headers';
import { selectEventsSchema } from '@/schema/event';
import Link from 'next/link';
import { CalendarDays, CreditCard, Users } from 'lucide-react';

const getAllEvents = async () => {
	const eventsRes = await fetch(`${env.API_URL}/events?context=admin`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: (await cookies()).toString(),
		},
	});
	return selectEventsSchema.parse(await eventsRes.json());
};

const DashboardPage = async () => {
	const t = await getTranslations('Dashboard');

	const events = await getAllEvents();

	console.log(events);

	return (
		<div className="flex flex-col gap-4">
			<PageTitle>{t('title')}</PageTitle>
			<div className="flex flex-col gap-4 md:flex-row">
				<Link href="/dashboard/events" className="w-full md:w-1/4">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CalendarDays /> Your events
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl">{events.length}</p>
						</CardContent>
						<CardFooter>
							<p className="text-green-500">
								({events.filter((event) => event.status === 'PUBLISHED').length}{' '}
								published)
							</p>
						</CardFooter>
					</Card>
				</Link>
				<Link href="#" className="w-full md:w-1/4">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CreditCard /> Payments
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl">NaN</p>
						</CardContent>
						<CardFooter>
							<p className="text-green-500"></p>
						</CardFooter>
					</Card>
				</Link>
				<Link href="#" className="w-full md:w-1/4">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Users /> Participants
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl">NaN</p>
						</CardContent>
						<CardFooter>
							<p className="text-gray-500">coming soon</p>
						</CardFooter>
					</Card>
				</Link>
				<Link href="#" className="w-full md:w-1/4">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">Soon</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-3xl">NaN</p>
						</CardContent>
						<CardFooter>
							<p>no data</p>
						</CardFooter>
					</Card>
				</Link>
			</div>
		</div>
	);
};

export default DashboardPage;
