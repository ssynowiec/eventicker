import { FaGithub } from 'react-icons/fa6';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SOCIAL_PROVIDERS = [
	{
		name: 'GitHub',
		icon: FaGithub,
	},
];

export const SocialLogins = async () => {
	const t = await getTranslations('Login');

	return (
		<>
			{SOCIAL_PROVIDERS.map((provider) => (
				<Link
					key={provider.name}
					href={`/api/auth/${provider.name.toLowerCase()}`}
					className={cn(
						buttonVariants({
							variant: 'outline',
						}),
						'flex items-center justify-center gap-2',
					)}
				>
					<provider.icon className="h-5 w-5" />
					{t('loginWith')} {provider.name}
				</Link>
			))}
		</>
	);
};
