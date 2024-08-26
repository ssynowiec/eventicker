import { ReactNode } from 'react';
import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { DashboardTopBar } from '@/components/DashboardTopBar';

interface DashboardLayoutProps {
	children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
	const { user } = await validateRequest();

	if (!user) {
		return redirect('/login');
	}

	return (
		<div className="relative flex h-full">
			<Sidebar user={user} />
			<main className="flex w-full flex-col">
				<DashboardTopBar />
				<section className="flex flex-1 flex-col p-4">{children}</section>
			</main>
		</div>
	);
};

export default DashboardLayout;
