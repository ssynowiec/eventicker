'use client';

import { ColumnDef } from '@tanstack/react-table';
import { selectEventSchema } from '@/schema/event';
import { z } from 'zod';
import { DataTableColumnHeader } from '@/components/dataTable/DataTableColumnHeader';
import { Checkbox } from '@/components/ui/checkbox';
import { FormatedDateAndTimeToLocalString } from '@/components/FormatedDateAndTimeToLocalString';
import Link from 'next/link';
import { EventTableActions } from '@/components/EventTableActions';
import { EventTableStatus } from '@/components/EventTableStatus';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Event = z.infer<typeof selectEventSchema>;

export const eventsColumns: ColumnDef<Event>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Event name" />
		),
		cell: ({ row }) => (
			<Link href={`events/${row.original.slug}`}>{row.getValue('name')}</Link>
		),
	},
	{
		id: 'Start date & time',
		accessorKey: 'Start date & time',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Start date & time" />
		),
		cell: ({ row }) => {
			return (
				<FormatedDateAndTimeToLocalString date={row.original.start_date} />
			);
		},
	},
	{
		id: 'status',
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => {
			const event = row.original;
			return <EventTableStatus status={event.status} />;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const event = row.original;

			return <EventTableActions event={event} />;
		},
		enableSorting: false,
		enableHiding: false,
	},
];
