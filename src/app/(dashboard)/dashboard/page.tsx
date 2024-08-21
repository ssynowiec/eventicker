import { PageTitle } from '@/components/PageTitle';
import { useTranslations } from 'next-intl';

const DashboardPage = () => {
	const t = useTranslations('Dashboard');

	return (
		<div>
			<PageTitle>{t('title')}</PageTitle>
		</div>
	);
};

export default DashboardPage;
