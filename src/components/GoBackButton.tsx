'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const GoBackButton = () => {
	const router = useRouter();
	return (
		<Button variant="outline" onClick={() => router.back()}>
			Go Back
		</Button>
	);
};
