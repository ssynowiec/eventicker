import { cookies } from 'next/headers';
import { OAuth2RequestError } from 'arctic';
import { generateIdFromEntropySize } from 'lucia';
import { github } from '@/lib/auth/github';
import { lucia } from '@/lib/auth/auth';
import { db } from '@/lib/auth/db';
import { eq } from 'drizzle-orm';
import { userTable } from '@/schema/user';
import WelcomeEmail from '@/components/emails/welcome';
import { resend } from '@/lib/resend';

export const GET = async (request: Request): Promise<Response> => {
	const url = new URL(request.url);
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedState = cookies().get('github_oauth_state')?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		const existingUser = await db
			.select()
			.from(userTable)
			.where(eq(userTable.github_id, githubUser.id));

		if (existingUser[0]) {
			const session = await lucia.createSession(existingUser[0].id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);
			return new Response(null, {
				status: 302,
				headers: {
					Location: '/dashboard',
				},
			});
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long

		await db.insert(userTable).values({
			id: userId,
			name: githubUser.name,
			username: githubUser.login,
			email: githubUser.email,
			avatar: githubUser.avatar_url,
			github_id: githubUser.id,
		});

		try {
			const { data, error } = await resend.emails.send({
				from: 'Eventicker <contact@eventicker.ssynowiec.dev>',
				to: [githubUser.email],
				subject: 'Welcome to Eventicker! 🎉',
				react: WelcomeEmail({ firstName: githubUser.name }),
			});

			if (error) {
				return Response.json({ error }, { status: 500 });
			}

			return Response.json(data);
		} catch (error) {
			return Response.json({ error }, { status: 500 });
		}

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/dashboard',
			},
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
};

interface GitHubUser {
	id: string;
	name: string;
	login: string;
	email: string;
	avatar_url: string;
}
