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

interface DashboardLayoutProps {
	children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
	const { user } = await validateRequest();
	const t = await getTranslations('Dashboard.Sidebar.Menu');

	if (!user) {
		return redirect('/login');
	}

	const MAIN_NAV_LINKS = [
		{
			href: '/dashboard',
			name: 'dashboard',
			icon: <LayoutDashboard />,
			children: t('dashboard'),
		},
		{
			href: '/dashboard/events',
			name: 'events',
			icon: <CalendarDays />,
			children: t('events'),
		},
		{
			href: '/settings',
			name: 'settings',
			icon: <Settings />,
			children: t('settings'),
		},
	];

	const EVENTS_NAV_LINKS = [
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
	];

	return (
		<DashboardLayoutRoot mainNav={MAIN_NAV_LINKS} eventsNav={EVENTS_NAV_LINKS}>
			{children}
		</DashboardLayoutRoot>
	);
};

export default DashboardLayout;
