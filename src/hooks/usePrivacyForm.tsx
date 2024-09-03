import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	insertPrivacyPolicySchema,
	selectPrivacyPolicySchema,
} from '@/schema/privacy_policies';
import { env } from '@/env';
import { createNewPolicyActions } from '@/actions/createNewPolicyAction';
import { updatePolicyActions } from '@/actions/updatePolicyAction';

const newPolicySchema = insertPrivacyPolicySchema;

export const usePrivacyForm = (
	privacyPolicy:
		| z.infer<typeof selectPrivacyPolicySchema>
		| { privacyText: string; eventId: number; lastUpdated?: string },
) => {
	// const t = useTranslations('Events.NewEvent.Form');

	console.log(privacyPolicy);

	const form = useForm<z.infer<typeof newPolicySchema>>({
		defaultValues: {
			eventId: privacyPolicy.eventId,
			privacyText: privacyPolicy.privacyText,
			lastUpdated: privacyPolicy?.lastUpdated ?? '',
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		if ('lastUpdated' in data && data.lastUpdated !== '') {
			if (privacyPolicy.eventId) {
				const res = await updatePolicyActions({
					eventId: data.eventId,
					privacyText: data.privacyText,
				});
			}
		} else {
			const res = await createNewPolicyActions({
				privacyText: data.privacyText,
				eventId: data.eventId,
			});
		}
	});

	return { form, onSubmit };
};
