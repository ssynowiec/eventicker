import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe/stripe';
import { env } from '@/env';
import { db } from '@/lib/auth/db';
import { userTable } from '@/schema/user';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe';

export const POST = async (req: Request) => {
	const body = await req.text();

	const signature = headers().get('stripe-signature') as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (error) {
		if (error instanceof Error) {
			return new Response(`Webhook Error: ${error.message}`, { status: 400 });
		}
		return new Response('Webhook Error', { status: 400 });
	}

	switch (event.type) {
		case 'account.updated': {
			const account = event.data.object;

			await db
				.update(userTable)
				.set({
					stripeConnected: !(
						account.capabilities?.transfers === 'pending' ||
						account.capabilities?.transfers === 'inactive'
					),
				})
				.where(eq(userTable.stripe_account_id, account.id));

			break;
		}
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	return new Response(null, { status: 200 });
};
