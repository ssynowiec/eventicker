'use server';

import { validateRequest } from '@/lib/auth/validateRequests';
import { db } from '@/lib/auth/db';
import { userTable } from '@/schema/user';
import { eq } from 'drizzle-orm';
import { stripe } from '@/lib/stripe/stripe';
import { redirect } from 'next/navigation';

export const createLoginStripeLinkAction = async () => {
	const { user } = await validateRequest();

	if (!user) {
		throw new Error('User not found');
	}

	const data = await db
		.select()
		.from(userTable)
		.where(eq(userTable.id, user.id));

	const userData = data[0];

	const loginLink = await stripe.accounts.createLoginLink(
		userData?.stripe_account_id as string,
	);

	return redirect(loginLink.url);
};
