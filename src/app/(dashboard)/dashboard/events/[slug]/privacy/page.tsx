import { PrivacyEditorForm } from '@/components/PrivacyEditorForm';
import { selectEventSchema } from '@/schema/event';
import { selectPrivacyPolicySchema } from '@/schema/privacy_policies';
import { notFound } from 'next/navigation';
import { env } from 'process';

interface PrivacyEditPageProps {
	params: { slug: string };
}

const getCurrentPrivacyPolicy = async (slug: string) => {
	const eventRes = await fetch(`${env.API_URL}/events?slug=${slug}`);
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

const PrivacyEditPage = async ({ params: { slug } }: PrivacyEditPageProps) => {
	const privacyPolicy = await getCurrentPrivacyPolicy(slug);

	return (
		<div className="flex flex-col gap-2">
			<PrivacyEditorForm privacyPolicy={privacyPolicy} />
		</div>
	);
};

export default PrivacyEditPage;
