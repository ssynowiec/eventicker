'use server';

import { ReactNode } from 'react';
import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';
import {
	ArrowLeft,
	CalendarDays,
	FileCheck2,
	LayoutDashboard,
	Settings,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { DashboardLayout as DashboardLayoutRoot } from '@/components/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { cookies } from 'next/headers';
import { selectEventsSchema } from '@/schema/event';
import { env } from '@/env';
import { SidebarNavLink } from '@/types/SidebarNavLink';

interface DashboardLayoutProps {
	children: ReactNode;
}

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

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
	const { user } = await validateRequest();
	const t = await getTranslations('Dashboard.Sidebar.Menu');
	const events = await getAllEvents();

	if (!user) {
		return redirect('/login');
	}

	const MAIN_NAV_LINKS: SidebarNavLink[] = [
		{
			category: 'Application',
			links: [
				{
					href: '/dashboard',
					name: 'dashboard',
					icon: <LayoutDashboard />,
					children: t('dashboard'),
					badge: (
						<>
							<Badge>New</Badge>
						</>
					),
				},
				{
					href: '/settings',
					name: 'settings',
					icon: <Settings />,
					children: t('settings'),
				},
			],
		},
		{
			category: 'Events',
			categoryAction: '/dashboard/events/add',
			categoryActionText: 'Add Event',
			links: [
				{
					href: '/dashboard/events',
					name: 'events',
					icon: <CalendarDays />,
					children: t('events'),
					badge: '15',
				},
			],
		},
	];

	const EVENTS_NAV_LINKS: SidebarNavLink[] = [
		{
			category: 'Event',
			links: [
				{
					href: '/dashboard/events',
					name: 'back',
					icon: <ArrowLeft />,
					children: t('back'),
				},
				{
					href: '/dashboard/events/etst1231532/privacy',
					name: 'privacy',
					icon: <FileCheck2 />,
					children: 'Privacy policy',
				},
			],
		},
	];

	return (
		<DashboardLayoutRoot mainNav={MAIN_NAV_LINKS} eventsNav={EVENTS_NAV_LINKS}>
			{children}
		</DashboardLayoutRoot>
	);
};

export default DashboardLayout;
