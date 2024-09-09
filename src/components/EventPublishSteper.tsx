import { Check, FileCheck2, Rocket } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';
import { z } from 'zod';
import { selectEventSchema } from '@/schema/event';
import { StatusItem } from './StatusItem';
import { ReactNode } from 'react';
import { env } from '@/env';
import { selectPrivacyPolicySchema } from '@/schema/privacy_policies';

interface EventPublishSteperProps {
	event: z.infer<typeof selectEventSchema>;
}

const getEventPrivacyPolicy = async (id: number) => {
	const res = await fetch(`${env.API_URL}/events/${id}/privacy`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (res.status === 404) {
		return;
	}

	return selectPrivacyPolicySchema.parse(await res.json());
};

export const EventPublishSteper = async ({
	event,
}: EventPublishSteperProps) => {
	if (!event) {
		return;
	}

	const privacyPolicy = await getEventPrivacyPolicy(event.id);

	const STEPS: {
		status: 'TODO' | 'IN_PROGRESS' | 'DONE';
		icon: ReactNode;
		title: string;
		description?: string;
		link?: string;
	}[] = [
		{
			status: privacyPolicy ? 'DONE' : 'TODO',
			icon: <FileCheck2 className="h-5 w-5" />,
			title: 'Privacy policy',
			description: 'Please create a privacy policy for your event',
			link: `${event.slug}/privacy`,
		},
		{
			status: event.status === 'PUBLISHED' ? 'DONE' : 'TODO',
			icon:
				event.status === 'PUBLISHED' ? (
					<Check className="h-5 w-5" />
				) : (
					<Rocket className="h-5 w-5" />
				),
			title: event.status === 'PUBLISHED' ? 'Published!' : 'Publish',
		},
	];

	return (
		<Card className="w-full">
			<Accordion
				type="single"
				collapsible
				className="w-full"
				defaultValue="item-1"
			>
				<AccordionItem value="item-1">
					<AccordionTrigger className="pr-6 hover:no-underline">
						<CardHeader className="px-6 py-4 text-left">
							<CardTitle>Preparing the event for publication</CardTitle>
							<CardDescription>
								Follow all steps to fully prepare your event
							</CardDescription>
						</CardHeader>
					</AccordionTrigger>
					<AccordionContent>
						<CardContent className="px-6 py-4">
							<div className="flex w-full items-center justify-evenly">
								<div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-evenly">
									{STEPS.map((step, index) => (
										<StatusItem
											key={index}
											status={step.status}
											icon={step.icon}
											title={step.title}
											description={step.description}
											link={step.link}
										/>
									))}
								</div>
							</div>
						</CardContent>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</Card>
	);
};
