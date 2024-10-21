import { PrivacyEditorForm } from '@/components/PrivacyEditorForm';
import { selectEventSchema } from '@/schema/event';
import { selectPrivacyPolicySchema } from '@/schema/privacy_policies';
import { method } from 'lodash';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { env } from 'process';

interface PrivacyEditPageProps {
	params: Promise<{ slug: string }>;
}

const getCurrentPrivacyPolicy = async (slug: string) => {
	const eventRes = await fetch(
		`${env.API_URL}/events?slug=${slug}&context=admin`,
		{
			method: 'GET',
			credentials: 'include',
			headers: {
				Cookie: (await cookies()).toString(),
				'Content-Type': 'application/json',
			},
		},
	);

	if (eventRes.status === 404) {
		return notFound();
	}

	const eventData = selectEventSchema.parse(await eventRes.json());

	if (!eventData) {
		return notFound();
	}

	const response = await fetch(`${env.API_URL}/events/${eventData.id}/privacy`);

	if (response.status === 404) {
		return { privacyText: '', eventId: eventData.id };
	}

	const data = await response.json();

	return selectPrivacyPolicySchema.parse(data);
};

const PrivacyEditPage = async (props: PrivacyEditPageProps) => {
    const params = await props.params;

    const {
        slug
    } = params;

    const privacyPolicy = await getCurrentPrivacyPolicy(slug);

    return (
		<div className="flex flex-col gap-2">
			<PrivacyEditorForm privacyPolicy={privacyPolicy} />
		</div>
	);
};

export default PrivacyEditPage;
