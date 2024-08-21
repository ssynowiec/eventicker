import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export const ProfileDangerZone = async () => {
	const t = await getTranslations('Profile');

	return (
		<div className="flex flex-col gap-2 py-4">
			<h2 className="text-xl font-medium">{t('dangerZone')}</h2>
			<Button variant="destructive" className="w-1/6">
				<TriangleAlert className="mr-2 h-4 w-4" /> {t('delete')}
			</Button>
		</div>
	);
};
