import { Lucia } from 'lucia';
import { adapter } from '@/lib/auth/db';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
	getUserAttributes: (attributes) => {
		return {
			githubId: attributes.github_id,
			stripe_account_id: attributes.stripe_account_id,
			stripeConnected: attributes.stripeConnected,
			name: attributes.name,
			email: attributes.email,
			avatar: attributes.avatar,
			username: attributes.username,
		};
	},
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	github_id: string | null;
	stripe_account_id: string | null;
	stripeConnected: boolean;
	name: string;
	email: string;
	avatar: string;
	username: string;
}
