import { ReactNode } from 'react';
import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/sidebar/Sidebar';

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
			<main>{children}</main>
		</div>
	);
};

export default DashboardLayout;
