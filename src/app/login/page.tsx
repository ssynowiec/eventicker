import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { validateRequest } from '@/lib/auth/validateRequests';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
	const { user } = await validateRequest();

	if (user) {
		return redirect('/dashboard');
	}

	return (
		<div>
			<h1>Login Page</h1>
			<Link
				href="/api/auth/github"
				className={buttonVariants({
					variant: 'outline',
				})}
			>
				Login with GitHub
			</Link>
		</div>
	);
};

export default LoginPage;
