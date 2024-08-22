import { PageTitle } from '@/components/PageTitle';
import { getTranslations } from 'next-intl/server';

const EventsPage = async () => {
	const t = await getTranslations('Events');

	return (
		<div>
			<PageTitle>{t('title')}</PageTitle>
		</div>
	);
};

export default EventsPage;
