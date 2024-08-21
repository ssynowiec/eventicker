'use client';

import { cn } from '@/lib/utils';
import { useSidebarIsCollapsed } from '@/hooks/useSidebarIsCollapsed';
import { SidebarNav } from '@/components/sidebar/SidebarNav';
import { User } from 'lucia';
import { SidebarUserMenu } from '@/components/sidebar/SidebarUserMenu';
import { SidebarHeader } from '@/components/sidebar/SidebarHeader';
import { SidebarHide } from '@/components/sidebar/SidebarHide';

interface SidebarProps {
	user: User;
}

export const Sidebar = ({ user }: SidebarProps) => {
	const [isCollapsed, setIsCollapsed] = useSidebarIsCollapsed();

	return (
		<aside
			className={cn(
				'flex h-full flex-col border-r-2 border-r-muted transition-[width] md:h-svh',
				isCollapsed ? 'w-12' : 'w-60',
			)}
		>
			<SidebarHeader isCollapsed={isCollapsed} />
			<SidebarNav isCollapsed={isCollapsed} />
			<SidebarHide isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
			<SidebarUserMenu isCollapsed={isCollapsed} user={user} />
		</aside>
	);
};
