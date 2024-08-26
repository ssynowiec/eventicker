'use client';

import { useLocale } from 'next-intl';
import { Locale } from '@/lib/next-intl.config';

interface FormatedDateAndTimeToLocalStringProps {
	date: string;
}

type LocaleMap = {
	[key in Locale]: string;
};

const dateLocaleMapping: LocaleMap = {
	en: 'en-EN',
	pl: 'pl-PL',
};

export const FormatedDateAndTimeToLocalString = ({
	date,
}: FormatedDateAndTimeToLocalStringProps) => {
	const locale = useLocale();

	const formatted_date = new Date(date).toLocaleDateString(
		dateLocaleMapping[locale as Locale],
	);
	const formatted_time = new Date(date).toLocaleTimeString(
		dateLocaleMapping[locale as Locale],
		{
			hour: '2-digit',
			minute: '2-digit',
		},
	);

	return <p>{`${formatted_date} ${formatted_time}`}</p>;
};
