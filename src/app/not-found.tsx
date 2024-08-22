import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { GoBackButton } from '@/components/GoBackButton';

const NotFoundPage = () => {
	return (
		<main className="h-svh">
			<div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
				<h1 className="text-9xl font-bold">404</h1>
				<span className="font-medium">Oops! Page Not Found!</span>
				<p className="text-center text-muted-foreground">
					It seems like the page you&apos;re looking for <br />
					does not exist or might have been removed.
				</p>
				<div className="mt-6 flex gap-4">
					<GoBackButton />
					<Link href="/" className={buttonVariants()}>
						Back to Home
					</Link>
				</div>
			</div>
		</main>
	);
};

export default NotFoundPage;
