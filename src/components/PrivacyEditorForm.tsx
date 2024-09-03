'use client';

import { TextRichEditor } from '@/components/TextRichEditor';
import { selectPrivacyPolicySchema } from '@/schema/privacy_policies';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { PageTitle } from '@/components/PageTitle';
import { Button } from '@/components/ui/button';
import { usePrivacyForm } from '@/hooks/usePrivacyForm';
import { RequiredField } from '@/components/RequiredField';

interface PrivacyEditorFormProps {
	privacyPolicy:
		| z.infer<typeof selectPrivacyPolicySchema>
		| { privacyText: string; eventId: number };
}

export const PrivacyEditorForm = ({
	privacyPolicy,
}: PrivacyEditorFormProps) => {
	const { form, onSubmit } = usePrivacyForm(privacyPolicy);

	return (
		<Form {...form}>
			<form onSubmit={onSubmit}>
				<div className="flex justify-between">
					<PageTitle>Privacy policy editor</PageTitle>
					<Button type="submit">Save</Button>
				</div>
				<FormField
					control={form.control}
					name="privacyText"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{/* {t('eventDescription')} */}
								<RequiredField />
							</FormLabel>
							<FormControl>
								<TextRichEditor
									placeholder="Content"
									content={field.value ?? ''}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormDescription>
								{/* {t('eventDescriptionDescription')} */}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};
