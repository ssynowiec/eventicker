'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useTransition } from 'react';
import { setUserLocale } from '@/lib/locale';
import { Locale } from '@/lib/next-intl.config';

export const LocalSwitcher = () => {
	// const t = useTranslations('LocalSwitcher');
	const [isPending, startTransition] = useTransition();
	const currentLocale = useLocale();

	const changeLocale = (value: string) => {
		const locale = value as Locale;
		startTransition(() => {
			setUserLocale(locale);
		});
	};

	return (
		<Select defaultValue={currentLocale} onValueChange={changeLocale}>
			<SelectTrigger className="w-[65px]">
				<SelectValue
					placeholder={
						<Image
							src={`/locales/${currentLocale}.png`}
							alt={currentLocale}
							width={24}
							height={24}
						/>
					}
				/>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="pl">
					<Image src="/locales/pl.png" alt="pl" width={24} height={24} />
				</SelectItem>
				<SelectItem value="en">
					<Image src="/locales/en.png" alt="en" width={24} height={24} />
				</SelectItem>
			</SelectContent>
		</Select>
	);
};
