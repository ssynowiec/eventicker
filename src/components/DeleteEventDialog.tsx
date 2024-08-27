import { useEffect, useState } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Trash2 } from 'lucide-react';
import { CommandShortcut } from '@/components/ui/command';
import { selectEventSchema } from '@/schema/event';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { deleteEventById } from '@/lib/deleteEvent';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type Event = z.infer<typeof selectEventSchema>;

interface DeleteEventDialogProps {
	event: Event;
}

export const DeleteEventDialog = ({ event }: DeleteEventDialogProps) => {
	const t = useTranslations('Events.DeleteEventDialog');

	const [open, setOpen] = useState(false);

	const deleteEvent = useMutation({
		mutationFn: async (eventId: string | number) => {
			await deleteEventById(eventId);
		},
		onSuccess: () => {
			toast.success(`${t('successfullyDeleted')}!`);
			console.log('Event deleted successfully!');
		},
		onError: () => {
			toast.error(`${t('failedToDelete')}!`);
			console.log('Failed to delete event!');
		},
	});

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (open && e.key === 'Escape') {
				e.preventDefault();
				setOpen((prev) => !prev);
			}
			if (open && e.key === 'Enter') {
				e.preventDefault();
				deleteEvent.mutate(event.id);
				setOpen((prev) => !prev);
			}
		};
		if (open) document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, [open]);
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem
					className="flex cursor-pointer items-center gap-1 text-red-500"
					onClick={() => setOpen((prev) => !prev)}
					onSelect={(e) => e.preventDefault()}
				>
					<Trash2 className="h-4 w-4" />
					{t('deleteEvent')}
				</DropdownMenuItem>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{t('areYouSure')} "{event.name}"?
					</AlertDialogTitle>
					<AlertDialogDescription>
						{t('thisActionCannotBeUndone')}.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="flex gap-1">
						{t('no')} <CommandShortcut>(esc)</CommandShortcut>
					</AlertDialogCancel>
					<AlertDialogAction
						className={cn(
							'flex gap-1',
							buttonVariants({
								variant: 'destructive',
							}),
						)}
						onClick={() => deleteEvent.mutate(event.id)}
					>
						<Trash2 className="h-4 w-4" />
						{t('yes')}{' '}
						<CommandShortcut className="text-white">(Enter)</CommandShortcut>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
