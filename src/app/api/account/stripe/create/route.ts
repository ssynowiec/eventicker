import { lucia } from '@/lib/auth/auth';
import { stripe } from '@/lib/stripe/stripe';

import { NextRequest, NextResponse } from 'next/server';

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
		const account = await stripe.accounts.create({
			email: user.email,
			type: 'express',
		});

		// await db
		// 	.update(userTable)
		// 	.set({
		// 		stripe_account: account.id,
		// 	})
		// 	.where(eq(userTable.id, user.id));

		return NextResponse.json({ account: account.id });
	} catch (error) {
		console.error(
			'An error occurred when calling the Stripe API to create an account:',
			error,
		);
		const errorMessage =
			error instanceof Error ? error.message : 'An unknown error occurred';
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
};
