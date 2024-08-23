import { getTranslations } from 'next-intl/server';
import { PageTitle } from '@/components/PageTitle';
import { NewEventForm } from '@/components/NewEventForm';

const NewEventPage = async () => {
	const t = await getTranslations('Events.NewEvent');

	return (
		<div>
			<PageTitle>{t('title')}</PageTitle>
			<NewEventForm />
		</div>
	);
};

export default NewEventPage;
