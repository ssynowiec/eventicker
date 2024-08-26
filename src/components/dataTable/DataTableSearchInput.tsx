import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';

interface DataTableSearchInputProps<TData> {
	table: Table<TData>;
	searchBy: string;
}

export const DataTableSearchInput = <TData,>({
	table,
	searchBy,
}: DataTableSearchInputProps<TData>) => {
	return (
		<Input
			placeholder="Search by event name..."
			value={table.getColumn(searchBy)?.getFilterValue() as string}
			onChange={(event) =>
				table.getColumn(searchBy)?.setFilterValue(event.target.value)
			}
			className="max-w-sm"
		/>
	);
};
