import { PageTitle } from '@/components/PageTitle';
import { useTranslations } from 'next-intl';

const ProfilePage = () => {
	const t = useTranslations('Profile');
	return (
		<div>
			<PageTitle>{t('title')}</PageTitle>
		</div>
	);
};

export default ProfilePage;
