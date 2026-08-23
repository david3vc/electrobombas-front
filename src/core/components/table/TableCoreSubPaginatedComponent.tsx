import { Fragment, type JSX, type ReactElement } from 'react';
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	type Row,
	useReactTable,
} from '@tanstack/react-table';
import Table from 'react-bootstrap/Table';
import type { FilterPage, PaginationResponse } from '../../../types';
import PaginationLinks from './PaginationLinks';
import IconCore from '../general/IconCore';

export type { Row as RowTable };

interface TableCoreSubPaginatedComponentProps<T> {
	columns: Array<ColumnDef<T, any>>;
	data: PaginationResponse<T>;
	goToPage: (payload: FilterPage) => void;
	renderSubComponent: (props: { row: Row<T> }) => ReactElement;
	getRowCanExpand: (row: Row<T>) => boolean;
}

const TableCoreSubPaginatedComponent = <T,>({
	columns,
	data,
	goToPage,
	renderSubComponent,
	getRowCanExpand,
}: TableCoreSubPaginatedComponentProps<T>): JSX.Element => {
	const table = useReactTable<T>({
		data: data.data ?? [],
		columns: [
			{
				id: 'expander',
				header: () => null,
				cell: ({ row }) => {
					return row.getCanExpand() ? (
						<button
							className="btn btn-sm border-0 text-primary"
							{...{
								onClick: row.getToggleExpandedHandler(),
								style: { cursor: 'pointer' },
							}}
						>
							{row.getIsExpanded() ? (
								<IconCore icon="fa-solid fa-chevron-down" />
							) : (
								<IconCore icon="fa-solid fa-chevron-right" />
							)}
						</button>
					) : (
						'🔵'
					);
				},
			},
			...columns,
		],
		getRowCanExpand,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
	});

	return (
		<>
			<Table responsive bordered hover size="sm">
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								return (
									<th key={header.id} colSpan={header.colSpan} className="bg-primary-ligth">
										{header.isPlaceholder ? null : (
											<div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
										)}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => {
						return (
							<Fragment key={row.id}>
								<tr>
									{/* first row is a normal row */}
									{row.getVisibleCells().map(cell => {
										return (
											<td key={cell.id}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</td>
										);
									})}
								</tr>
								{row.getIsExpanded() && (
									<tr>
										{/* 2nd row is a custom 1 cell row */}
										<td colSpan={row.getVisibleCells().length}>{renderSubComponent({ row })}</td>
									</tr>
								)}
							</Fragment>
						);
					})}
				</tbody>
			</Table>

			{data?.data?.length > 0 && <PaginationLinks data={data} goToPage={goToPage} />}
		</>
	);
};

export default TableCoreSubPaginatedComponent;
