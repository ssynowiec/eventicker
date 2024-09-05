import Link from 'next/link';
import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import { SocialLogins } from '@/components/SocialLogins';
import { Logo } from '@/components/Logo';

const LoginPage = async () => {
	const { user } = await validateRequest();
	// skipcq: JS-C1002
	const t = await getTranslations('Login');

	if (user) {
		return redirect('/dashboard');
	}

	return (
		<main className="flex h-svh flex-col items-center justify-center gap-6">
			<div className="flex items-center justify-center gap-2">
				<Logo />
				<h1 className="text-2xl font-bold">Eventicker</h1>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>{t('cardTitle')}</CardTitle>
				</CardHeader>
				<CardContent>
					<SocialLogins />
				</CardContent>
				<CardFooter>
					<p className="text-center text-muted-foreground">
						{t('consent')}
						<br />
						<Link
							href="/terms"
							className="underline underline-offset-4 hover:text-primary"
						>
							{t('terms')}
						</Link>{' '}
						{t('and')}{' '}
						<Link
							href="/privacy"
							className="underline underline-offset-4 hover:text-primary"
						>
							{t('privacy')}
						</Link>
						.
					</p>
				</CardFooter>
			</Card>
			<Link
				href="/"
				className="flex items-center justify-center gap-1 underline-offset-4 hover:underline"
			>
				<ArrowLeft className="h-5 w-5" />
				{t('backToHome')}
			</Link>
		</main>
	);
};

export default LoginPage;
