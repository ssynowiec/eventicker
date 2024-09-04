import { Footer } from '@/components/Footer';
import { UserBar } from '@/components/UserBar';
import { validateRequest } from '@/lib/auth/validateRequests';
import type { ReactNode } from 'react';

interface EventLayoutProps {
	children: ReactNode;
}

const EventLayout = async ({ children }: EventLayoutProps) => {
	const { user } = await validateRequest();

	return (
		<div>
			{user && <UserBar user={user} />}
			{children}
			<Footer />
		</div>
	);
};

export default EventLayout;
