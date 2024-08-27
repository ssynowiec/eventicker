import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { insertEventSchema } from '@/schema/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkSlugAvailability } from '@/lib/checkSlugAvailability';
import { createNewEvent } from '@/lib/createNewEvent';

const newEventSchema = insertEventSchema;

export const useNewEventForm = () => {
	const t = useTranslations('Events.NewEvent.Form');

	const form = useForm<z.infer<typeof newEventSchema>>({
		resolver: zodResolver(newEventSchema),
		defaultValues: {
			name: '',
			slug: '',
			description: '',
			start_date: '',
			creator_id: '',
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		try {
			if (data.slug === '') {
				new Error('Slug is required');
			} else {
				await checkSlugAvailability(data.slug);
			}
		} catch (error) {
			form.setError('slug', {
				type: 'unavailable',
				message: `${t('unavailableSlug')}`,
			});
		}
		// if (!(await checkSlugAvailability(data.slug))) {
		// 	form.setError('slug', {
		// 		type: 'unavailable',
		// 		message: `${t('unavailableSlug')}`,
		// 	});
		// }

		if (data.name === '') {
			form.setError('name', {
				type: 'required',
				message: `${t('eventName')} ${t('fieldRequired')}`,
			});
			form.setError('root', {
				type: 'required',
				message: `All fields are required`,
			});
		}

		if (data.slug === '') {
			form.setError('slug', {
				type: 'required',
				message: `${t('eventSlug')} ${t('fieldRequired')}`,
			});
			form.setError('root', {
				type: 'required',
				message: `All fields are required`,
			});
		}

		if (data.description === '') {
			form.setError('description', {
				type: 'required',
				message: `${t('eventDescription')} ${t('fieldRequired')}`,
			});
			form.setError('root', {
				type: 'required',
				message: `All fields are required`,
			});
		}

		if (data.start_date === '') {
			form.setError('start_date', {
				type: 'required',
				message: `${t('pickStartDate')} ${t('fieldRequired')}`,
			});
			form.setError('root', {
				type: 'required',
				message: `All fields are required`,
			});
		}

		console.log('check 1');

		console.log('form.formState.isValid value', form.formState.isValid);

		if (form.formState.isValid) {
			return;
		}

		console.log('check 2');

		await createNewEvent(data);

		// console.log(form.formState.isValid);
	});

	return { form, onSubmit, checkSlugAvailability };
};
