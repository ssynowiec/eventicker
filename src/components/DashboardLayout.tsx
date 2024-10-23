import type { ReactNode } from 'react';
import { DashboardTopBar } from '@/components/DashboardTopBar';
import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';
import { SidebarNavLink } from '@/types/SidebarNavLink';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface DashboardLayoutProps {
	children: ReactNode;
	mainNav: SidebarNavLink[];
	eventsNav: SidebarNavLink[];
}

export const DashboardLayout = async ({
	children,
	mainNav,
	eventsNav,
}: DashboardLayoutProps) => {
	const { user } = await validateRequest();

	if (!user) {
		return redirect('/login');
	}

	return (
		<SidebarProvider>
			<DashboardSidebar user={user} mainNav={mainNav} />
			<main className="flex w-full flex-col">
				<DashboardTopBar />
				<section className="flex flex-1 flex-col p-4">{children}</section>
			</main>
		</SidebarProvider>
	);
};
