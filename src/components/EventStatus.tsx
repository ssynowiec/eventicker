import { Badge } from '@/components/ui/badge';
import { z } from 'zod';
import { eventStatusEnumSchema } from '@/schema/event';
import { useTranslations } from 'next-intl';

interface EventStatusProps {
	status: z.infer<typeof eventStatusEnumSchema>;
}

export const EventStatus = ({ status }: EventStatusProps) => {
	const t = useTranslations('Events.Status');

	switch (status) {
		case 'ARCHIVED':
			return <Badge variant="destructive">{t('archived')}</Badge>;
		case 'DRAFT':
			return (
				<Badge className="bg-gray-500 hover:bg-gray-500/80">{t('draft')}</Badge>
			);
		case 'PUBLISHED':
			return (
				<Badge className="bg-green-500 hover:bg-green-500/80">
					{t('published')}
				</Badge>
			);
	}
};
