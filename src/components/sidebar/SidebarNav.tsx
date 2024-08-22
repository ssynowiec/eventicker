import { CalendarDays, LayoutDashboard, Settings } from 'lucide-react';
import { SidebarNavIcon } from '@/components/sidebar/SidebarNavIcon';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SidebarNavLink } from '@/components/sidebar/SidebarNavLink';
import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

interface SidebarNavProps {
	isCollapsed: boolean;
}

export const SidebarNav = ({ isCollapsed }: SidebarNavProps) => {
	const t = useTranslations('Dashboard.Sidebar.Menu');

	const NAV_LINKS = [
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

	const renderSidebarNavLinkAndIcon = (
		href: string,
		icon: string | ReactNode,
		children: string,
	) => {
		if (isCollapsed) {
			return (
				<SidebarNavIcon href={href} icon={icon} key={href}>
					{children}
				</SidebarNavIcon>
			);
		}

		return (
			<SidebarNavLink href={href} icon={icon} key={href}>
				{children}
			</SidebarNavLink>
		);
	};

	return (
		<TooltipProvider delayDuration={0}>
			<nav className="flex-1">
				<ul className="flex flex-col gap-1">
					{NAV_LINKS.map(({ href, icon, children }) =>
						renderSidebarNavLinkAndIcon(href, icon, children),
					)}
				</ul>
			</nav>
		</TooltipProvider>
	);
};
