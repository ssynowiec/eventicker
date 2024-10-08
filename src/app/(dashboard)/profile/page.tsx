import { PageTitle } from '@/components/PageTitle';
import { getTranslations } from 'next-intl/server';
import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';
import { ProfileSocialMedia } from '@/components/ProfileSocialMedia';
import { ProfileDangerZone } from '@/components/ProfileDangerZone';
import { ProfileMyData } from '@/components/ProfileMyData';

const ProfilePage = async () => {
	const t = await getTranslations('Profile');
	const { user } = await validateRequest();

	if (!user) {
		return redirect('/login');
	}

	return (
		<div>
			<PageTitle>{t('title')}</PageTitle>
			<ProfileMyData />
			<ProfileSocialMedia />
			<ProfileDangerZone />
		</div>
	);
};

export default ProfilePage;
