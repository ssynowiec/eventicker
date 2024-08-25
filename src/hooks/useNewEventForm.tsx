import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { insertEventSchema } from '@/schema/event';
import { zodResolver } from '@hookform/resolvers/zod';

const newEventSchema = insertEventSchema;

const checkSlugAvailability = async (slug: string) => {
	const res = await fetch(`/api/event/${slug}`, {
		method: 'GET',
		credentials: 'include',
	});

	if (res.status === 404) {
		return true;
	} else {
		throw new Error('Slug is not available');
	}
};

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
		if (!(await checkSlugAvailability(data.slug))) {
			form.setError('slug', {
				type: 'unavailable',
				message: `${t('unavailableSlug')}`,
			});
		}

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

		console.log(form.formState.isValid);

		// const res = await fetch('/api/event', {
		// 	method: 'POST',
		// 	credentials: 'include',
		//
		// 	headers: {
		// 		// Cookie: `session_id=${session_id}`,
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(data),
		// });
		// console.log(data);
	});

	return { form, onSubmit, checkSlugAvailability };
};
