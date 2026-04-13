import React from 'react';

interface Column<T> {
    key: keyof T;
    label: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
    width?: string;
    sortable?: boolean;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor?: (row: T, index: number) => string | number;
    onRowClick?: (row: T) => void;
    loading?: boolean;
    emptyMessage?: string;
    className?: string;
    striped?: boolean;
}

export default function DataTable<T extends Record<string, any>>({
    columns,
    data,
    keyExtractor = (_, index) => index,
    onRowClick,
    loading = false,
    emptyMessage = 'No data available',
    className = '',
    striped = true,
}: DataTableProps<T>) {
    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (!data || data.length === 0) {
        return <div className="text-center py-4 text-gray-500">{emptyMessage}</div>;
    }

    return (
        <div className={`overflow-x-auto ${className}`}>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                style={{ width: column.width }}
                                className="border border-gray-300 px-4 py-2 text-left font-semibold"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={keyExtractor(row, index)}
                            onClick={() => onRowClick?.(row)}
                            className={`${
                                striped && index % 2 === 1 ? 'bg-gray-50' : ''
                            } ${onRowClick ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                        >
                            {columns.map((column) => (
                                <td
                                    key={String(column.key)}
                                    className="border border-gray-300 px-4 py-2"
                                >
                                    {column.render
                                        ? column.render(row[column.key], row)
                                        : String(row[column.key] ?? '-')}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}