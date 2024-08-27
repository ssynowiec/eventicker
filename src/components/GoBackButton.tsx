'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const GoBackButton = () => {
	const t = useTranslations();
	const router = useRouter();
	return (
		<Button variant="outline" onClick={() => router.back()}>
			{t('goBack')}
		</Button>
	);
};
