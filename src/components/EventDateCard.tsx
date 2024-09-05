import { intlFormat, format, Locale } from 'date-fns';
import { ClockIcon, MapPinIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLocale } from 'next-intl';
import { enUS, pl } from 'date-fns/locale';
import Link from 'next/link';

interface EventDateCardProps {
	eventName: string;
	eventLocation: string;
	eventSlug: string;
	startDate: Date;
}

const dateLocaleMapping: { [key: string]: Locale } = {
	pl: pl,
	en: enUS,
};

export const EventDateCard = ({
	eventName,
	eventLocation,
	eventSlug,
	startDate,
}: EventDateCardProps) => {
	const locale = useLocale();

	return (
		<Card className="order-1 w-full max-w-md rounded-lg bg-muted p-6 md:order-2">
			<div className="flex items-center gap-4">
				<div className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground">
					<p className="text-center text-sm uppercase">
						{format(startDate, 'LLL', {
							locale: dateLocaleMapping[locale],
						})}
					</p>
					<p className="text-center text-2xl">{startDate.getDay()}</p>
					<p className="text-center text-sm">{startDate.getFullYear()}</p>
				</div>
				<div>
					<div className="text-xl font-semibold">{eventName}</div>
					<div className="flex items-center text-muted-foreground">
						<ClockIcon className="mr-1 inline-block h-4 w-4" />
						<p>
							{intlFormat(
								startDate,
								{ hour: 'numeric', minute: 'numeric' },
								{ locale: locale },
							)}
						</p>
					</div>
					<div className="flex items-center text-muted-foreground">
						<MapPinIcon className="mr-1 inline-block h-4 w-4" />
						<p>{eventLocation}</p>
					</div>
				</div>
			</div>
			<Link
				href={`/event/${eventSlug}/register`}
				className={buttonVariants({
					className: 'mt-4 w-full',
				})}
			>
				Get Tickets
			</Link>
		</Card>
	);
};
