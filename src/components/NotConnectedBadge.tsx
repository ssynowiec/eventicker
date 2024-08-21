import { Badge } from '@/components/ui/badge';
import { getTranslations } from 'next-intl/server';

export const NotConnectedBadge = async () => {
	const t = await getTranslations('Profile');

	return (
		<Badge variant="outline" className="border-red-800 bg-red-100 text-red-800">
			{t('disconnected')}
		</Badge>
	);
};
