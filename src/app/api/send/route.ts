import { EmailTemplate } from '@/components/emails/email-template';
import { resend } from '@/lib/resend';

export async function POST() {
	try {
		const { data, error } = await resend.emails.send({
			from: 'Acme <onboarding@resend.dev>',
			to: ['contact@eventicker.ssynowiec.dev'],
			subject: 'Hello world',
			react: EmailTemplate({ firstName: 'John' }),
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		return Response.json(data);
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
