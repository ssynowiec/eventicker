import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

const LoginPage = () => {
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
