import { getTranslations } from 'next-intl/server';
import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';
import { ChangeAvatar } from '@/components/ChangeAvatar';

export const ProfileMyData = async () => {
	const t = await getTranslations('Profile');
	const { user } = await validateRequest();

	if (!user) {
		return redirect('/login');
	}

	return (
		<section className="flex flex-col gap-2 py-4">
			<h2 className="text-xl font-medium">{t('myData')}</h2>
			<ChangeAvatar />
		</section>
	);
};
