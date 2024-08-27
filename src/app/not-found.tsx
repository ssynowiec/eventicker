import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { GoBackButton } from '@/components/GoBackButton';
import { getTranslations } from 'next-intl/server';

const NotFoundPage = async () => {
	const t = await getTranslations('NotFound');

	return (
		<main className="h-svh">
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-4">
				<h1 className="text-9xl font-bold">404</h1>
				<span className="font-medium">{t('title')}</span>
				<p className="text-center text-muted-foreground">{t('message')}</p>
				<div className="flex gap-4">
					<GoBackButton />
					<Link href="/" className={buttonVariants()}>
						{t('backToHome')}
					</Link>
				</div>
			</div>
		</main>
	);
};

export default NotFoundPage;
