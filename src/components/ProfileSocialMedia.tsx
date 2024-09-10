import { Card } from '@/components/ui/card';
import { FaGithub } from 'react-icons/fa6';
import type { ReactNode } from 'react';
import { ConnectedBadge } from '@/components/ConnectedBadge';
import { NotConnectedBadge } from '@/components/NotConnectedBadge';
import { getTranslations } from 'next-intl/server';
import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';
import { StripeConnectButton } from './StripeConnectButton';

const PROVIDERS: { name: string; value: 'githubId'; icon: ReactNode }[] = [
	{
		name: 'Github',
		value: 'githubId',
		icon: <FaGithub className="h-5 w-5" />,
	},
];

export const ProfileSocialMedia = async () => {
	const t = await getTranslations('Profile');
	const { user } = await validateRequest();

	if (!user) {
		return redirect('/login');
	}

	return (
		<div className="flex flex-col gap-2 py-4">
			<h2 className="text-xl font-medium">{t('socialMedia')}</h2>
			<div className="flex gap-2">
				<StripeConnectButton />
				{PROVIDERS.map((provider) => (
					<Card
						key={provider.name}
						className="flex items-center justify-between gap-2 px-6 py-4"
					>
						{provider.icon}
						{provider.name}
						{user[provider.value] !== null ? (
							<ConnectedBadge />
						) : (
							<NotConnectedBadge />
						)}
					</Card>
				))}
			</div>
		</div>
	);
};
