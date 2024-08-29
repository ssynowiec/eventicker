'use client';

import { cn } from '@/lib/utils';
import { useSidebarIsCollapsed } from '@/hooks/useSidebarIsCollapsed';
import { SidebarNav } from '@/components/sidebar/SidebarNav';
import { User } from 'lucia';
import { SidebarUserMenu } from '@/components/sidebar/SidebarUserMenu';
import { SidebarHeader } from '@/components/sidebar/SidebarHeader';
import { SidebarHide } from '@/components/sidebar/SidebarHide';
import { SidebarNavLink } from '@/types/SidebarNavLink';
import { usePathname } from 'next/navigation';

interface SidebarProps {
	user: User;
	mainNav: SidebarNavLink[];
	eventsNav: SidebarNavLink[];
}

export const Sidebar = ({ user, mainNav, eventsNav }: SidebarProps) => {
	const [isCollapsed, setIsCollapsed] = useSidebarIsCollapsed();
	const pathname = usePathname();

	const navLinks = pathname.startsWith('/dashboard/events/')
		? eventsNav
		: mainNav;

	return (
		<aside
			className={cn(
				'flex h-full flex-col border-r-2 border-r-muted transition-[width] md:h-svh',
				isCollapsed ? 'w-12' : 'w-60',
			)}
		>
			<SidebarHeader isCollapsed={isCollapsed} />
			<SidebarNav isCollapsed={isCollapsed} navLinks={navLinks} />
			<SidebarHide isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
			<SidebarUserMenu isCollapsed={isCollapsed} user={user} />
		</aside>
	);
};
