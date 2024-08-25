import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { RequiredField } from '@/components/RequiredField';
import { Input } from '@/components/ui/input';
import { Check, RefreshCw, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import _ from 'lodash';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

interface SlugInputProps<T extends FieldValues> {
	form: UseFormReturn<T>;
	name: FieldPath<T>;
	checkSlugAvailability: (slug: string) => Promise<boolean>;
}

export const SlugInput = <T extends FieldValues>({
	form,
	name,
	checkSlugAvailability,
}: SlugInputProps<T>) => {
	const t = useTranslations('Events.NewEvent.Form');

	const mutation = useMutation({
		mutationFn: async (slug: string) => {
			return checkSlugAvailability(slug);
		},
	});

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>
						{t('eventSlug')}
						<RequiredField />
					</FormLabel>
					<FormControl>
						<Input
							placeholder={t('eventSlugPlaceholder')}
							{...field}
							onChange={(e) => field.onChange(_.kebabCase(e.target.value))}
							onBlur={() => {
								field.onBlur();
								mutation.mutate(field.value);
							}}
						/>
					</FormControl>
					<FormDescription>{t('eventSlugDescription')}</FormDescription>
					<FormMessage />
					{mutation.isPending ? (
						<span className="flex items-center gap-1 text-green-500">
							<RefreshCw className="h-5 w-5 animate-spin rounded-full bg-green-500 p-1 text-white" />{' '}
							{t('checkingSlugAvailability')}
						</span>
					) : (
						<>
							{mutation.isError && (
								<span className="flex items-center gap-1 text-red-500">
									<X className="h-5 w-5 rounded-full bg-red-500 p-1 text-white" />
									{t('slugIsNotAvailable')}
								</span>
							)}

							{mutation.isSuccess && (
								<span className="flex items-center gap-1 text-green-500">
									<Check className="h-5 w-5 rounded-full bg-green-500 p-1 text-white" />
									{t('slugIsAvailable')}
								</span>
							)}
						</>
					)}
				</FormItem>
			)}
		/>
	);
};
