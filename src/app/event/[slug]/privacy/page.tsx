import { PageTitle } from '@/components/PageTitle';
import { env } from '@/env';
import { selectEventSchema } from '@/schema/event';
import { selectPrivacyPolicySchema } from '@/schema/privacy_policies';
import parse from 'html-react-parser';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PrivacyPolicyPageParams {
	params: Promise<{ slug: string }>;
}

const getEvent = async (slug: string) => {
	const res = await fetch(`${env.API_URL}/events?slug=${slug}`);

	if (!res.ok) {
		return notFound();
	}

	return selectEventSchema.parse(await res.json());
};

const getPrivacyPolicies = async (slug: string) => {
	const event = await getEvent(slug);

	const res = await fetch(`${env.API_URL}/events/${event.id}/privacy`);

	if (!res.ok) {
		return notFound();
	}

	return selectPrivacyPolicySchema.parse(await res.json());
};

const PrivacyPoliciesPage = async (props: PrivacyPolicyPageParams) => {
    const params = await props.params;

    const {
        slug
    } = params;

    const privacyPolicies = await getPrivacyPolicies(slug);
    const event = await getEvent(slug);

    if (!privacyPolicies || !privacyPolicies.privacyText || !event) {
		return notFound();
	}

    return (
		<main className="min-h-svh">
			<section className="mx-3 flex h-full max-w-5xl flex-col gap-2 py-2 text-center md:mx-auto">
				<Link
					href={`/event/${slug}`}
					className="flex items-center gap-1 underline-offset-4 hover:underline"
				>
					<ArrowLeft className="h-4 w-4" /> Back to event
				</Link>
				<PageTitle>Privacy Policy</PageTitle>
				<p>
					of the <span className="font-bold">{event.name}</span> event
				</p>

				<div className="flex flex-col justify-between gap-2 pt-1 text-left md:pt-3">
					{parse(privacyPolicies.privacyText)}
				</div>
			</section>
		</main>
	);
};

export default PrivacyPoliciesPage;
