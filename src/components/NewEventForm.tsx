'use client';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, type Locale, subDays } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { useLocale, useTranslations } from 'next-intl';
import { RequiredField } from '@/components/RequiredField';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { enUS, pl } from 'date-fns/locale';
import _ from 'lodash';
import { SlugInput } from '@/components/SlugInput';
import { useNewEventForm } from '@/hooks/useNewEventForm';

const dateLocaleMapping: { [key: string]: Locale } = {
	pl: pl,
	en: enUS,
};

export const NewEventForm = () => {
	const t = useTranslations('Events.NewEvent.Form');
	const locale = useLocale();

	const { form, onSubmit, checkSlugAvailability } = useNewEventForm();

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{t('eventName')}
								<RequiredField />
							</FormLabel>
							<FormControl>
								<Input
									placeholder={t('eventNamePlaceholder')}
									{...field}
									onChange={(e) => {
										const slugField = form.getValues('slug');
										if (slugField === _.kebabCase(field.value))
											form.setValue('slug', _.kebabCase(e.target.value));
										field.onChange(e.target.value);
									}}
								/>
							</FormControl>
							<FormDescription>{t('eventNameDescription')}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<SlugInput
					form={form}
					name="slug"
					checkSlugAvailability={checkSlugAvailability}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{t('eventDescription')}
								<RequiredField />
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder={t('eventDescriptionPlaceholder')}
									className="resize-none"
									{...field}
									value={field.value ?? ''}
								/>
							</FormControl>
							<FormDescription>
								{t('eventDescriptionDescription')}
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex w-full flex-col gap-2">
					<div className="flex gap-4">
						<FormField
							control={form.control}
							name="start_date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>
										{t('eventStartDate')}
										<RequiredField />
									</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-[240px] pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground',
													)}
												>
													{field.value ? (
														format(field.value, 'PPP', {
															locale: dateLocaleMapping[locale],
														})
													) : (
														<span>{t('pickStartDate')}</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												locale={dateLocaleMapping[locale]}
												mode="single"
												selected={new Date(field.value)}
												onSelect={(date) => {
													if (field.value) {
														const hours = new Date(field.value).getHours();
														const minutes = new Date(field.value).getMinutes();

														date?.setHours(hours, minutes);
														field.onChange(date?.toISOString());
													} else {
														date?.setHours(12, 0);
														field.onChange(date?.toISOString());
													}
												}}
												disabled={(date) => date < subDays(new Date(), 1)}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="start_date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>{t('eventStartTime')}</FormLabel>
									<FormControl>
										<Select
											defaultValue={
												`${new Date(field.value).getHours()}:${new Date(field.value).getMinutes()}`!
											}
											onValueChange={(e) => {
												const [hours, minutes] = e.split(':');
												if (field.value) {
													const newDate = new Date(field.value);
													newDate.setHours(parseInt(hours), parseInt(minutes));
													field.onChange(newDate.toISOString());
												} else {
													const date = new Date();
													date.setHours(parseInt(hours), parseInt(minutes));
													field.onChange(date.toISOString());
												}
											}}
										>
											<SelectTrigger className="w-[120px] font-normal focus:ring-0">
												<SelectValue placeholder={'HH:MM'} />
											</SelectTrigger>
											<SelectContent>
												<ScrollArea className="h-[15rem]">
													{Array.from({ length: 96 }).map((_, i) => {
														const hour = Math.floor(i / 4)
															.toString()
															.padStart(2, '0');
														const minute = ((i % 4) * 15)
															.toString()
															.padStart(2, '0');
														return (
															<SelectItem key={i} value={`${hour}:${minute}`}>
																{hour}:{minute}
															</SelectItem>
														);
													})}
												</ScrollArea>
											</SelectContent>
										</Select>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<FormDescription>
						{t('eventStartDate&TimeDescription')}
					</FormDescription>
					<FormMessage />
				</div>
				<Button type="submit">{t('submit')}</Button>
			</form>
		</Form>
	);
};
