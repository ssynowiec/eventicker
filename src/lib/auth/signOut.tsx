'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { lucia } from '@/lib/auth/auth';
import { validateRequest } from '@/lib/auth/validateRequests';

export const logout = async (): Promise<ActionResult> => {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: 'Unauthorized',
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	(await cookies()).set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
	return redirect('/');
};

interface ActionResult {
	error: string | null;
}
