import { Badge } from '@/components/ui/badge';
import { getTranslations } from 'next-intl/server';

export const ConnectedBadge = async () => {
	const t = await getTranslations('Profile');

	return (
		<Badge
			variant="outline"
			className="border-green-800 bg-green-100 text-green-800"
		>
			{t('connected')}
		</Badge>
	);
};
