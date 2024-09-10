import { NextRequest, NextResponse } from 'next/server';
import { lucia } from '@/lib/auth/auth';
import { stripe } from '@/lib/stripe/stripe';

export const POST = async (req: NextRequest, res: NextResponse) => {
	const { user } = await lucia.validateSession(
		req.cookies.get('auth_session')?.value ?? '',
	);

	if (!user) {
		return new Response('Unauthorized', {
			status: 401,
		});
	}

	try {
		const { account } = await req.json();

		const accountLink = await stripe.accountLinks.create({
			account: account,
			refresh_url: `https://localhost:3000/refresh/${account}`,
			return_url: `https://localhost:3000/profile`,
			type: 'account_onboarding',
		});

		return NextResponse.json({
			url: accountLink.url,
		});
	} catch (error) {
		console.error(
			'An error occurred when calling the Stripe API to create an account link:',
			error,
		);
		const errorMessage =
			error instanceof Error ? error.message : 'An unknown error occurred';
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
};
