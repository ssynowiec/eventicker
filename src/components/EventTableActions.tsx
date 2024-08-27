import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ExternalLink, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import { selectEventSchema } from '@/schema/event';
import { DeleteEventDialog } from '@/components/DeleteEventDialog';

export type Event = z.infer<typeof selectEventSchema>;

interface EventTableActionsProps {
	event: Event;
}

export const EventTableActions = ({ event }: EventTableActionsProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem
					onClick={() => navigator.clipboard.writeText(event.id.toString())}
				>
					Copy event ID
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="#" className="flex cursor-pointer items-center gap-1">
						<ExternalLink className="h-4 w-4" />
						View event page
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DeleteEventDialog event={event} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
