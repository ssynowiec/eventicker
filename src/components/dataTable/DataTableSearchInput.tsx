import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

interface DataTableSearchInputProps<TData> {
	table: Table<TData>;
	searchBy: string;
}

export const DataTableSearchInput = <TData,>({
	table,
	searchBy,
}: DataTableSearchInputProps<TData>) => {
	const t = useTranslations('DataTable');

	return (
		<Input
			placeholder={`${t('search')}...`}
			value={table.getColumn(searchBy)?.getFilterValue() as string}
			onChange={(event) =>
				table.getColumn(searchBy)?.setFilterValue(event.target.value)
			}
			className="max-w-sm"
		/>
	);
};
