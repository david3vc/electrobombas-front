import { useState, type JSX } from 'react';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	type RowSelectionState,
	type Updater,
} from '@tanstack/react-table';
import Table from 'react-bootstrap/Table';
import IndeterminateCheck from './IndeterminateCheck';

interface TableCoreSelectProps<T> {
	columns: Array<ColumnDef<T, any>>;
	data: T[];
	onRowSelection?: (payload: T[]) => void;
}

const TableCoreSelect = <T,>({
	columns,
	data,
	onRowSelection,
}: TableCoreSelectProps<T>): JSX.Element => {
	const [rowSelection, setRowSelection] = useState({});

	const table = useReactTable<T>({
		columns: [
			{
				id: 'select',
				header: ({ table: tbl }) => (
					<div className="text-center">
						{data.length > 0 && (
							<IndeterminateCheck
								{...{
									checked: tbl.getIsAllRowsSelected(),
									indeterminate: tbl.getIsSomeRowsSelected(),
									onChange: tbl.getToggleAllRowsSelectedHandler(),
								}}
							/>
						)}
					</div>
				),
				cell: ({ row }) => (
					<div className="text-center">
						<IndeterminateCheck
							{...{
								checked: row.getIsSelected(),
								indeterminate: row.getIsSomeSelected(),
								onChange: row.getToggleSelectedHandler(),
							}}
						/>
					</div>
				),
			},
			...columns,
		],
		data: data ?? [],
		state: { rowSelection },
		onRowSelectionChange: (updaterOrValue: Updater<RowSelectionState>) => {
			setRowSelection(prev => {
				const next = typeof updaterOrValue === 'function' ? updaterOrValue(prev) : updaterOrValue;

				const arrayIndex: number[] = Object.keys(next).map(d => parseInt(d));

				const rows = table.getPreFilteredRowModel().rows;

				const selectedRows = rows.filter(d => arrayIndex.includes(d.index)).map(d => d.original);

				onRowSelection?.(selectedRows);

				return next;
			});
		},
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<Table responsive bordered hover size="sm">
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id} className="bg-primary-ligth">
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
							))}
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default TableCoreSelect;
