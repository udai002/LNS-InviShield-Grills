import React, { useState, useMemo } from 'react';

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
    pageSize?: number;
    pageSizeOptions?: number[];
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
    pageSize: initialPageSize = 10,
    pageSizeOptions = [5, 10, 20, 50],
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const totalPages = useMemo(() => Math.ceil((data?.length ?? 0) / pageSize), [data, pageSize]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return data?.slice(start, start + pageSize) ?? [];
    }, [data, currentPage, pageSize]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
    };

    const getPageNumbers = (): (number | '...')[] => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        const pages: (number | '...')[] = [1];
        if (currentPage > 3) pages.push('...');
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) pages.push(i);
        if (currentPage < totalPages - 2) pages.push('...');
        pages.push(totalPages);
        return pages;
    };

    if (loading) {
        return (
            <div style={styles.stateBox}>
                <div style={styles.spinner} />
                <span style={styles.stateText}>Loading…</span>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div style={styles.stateBox}>
                <span style={styles.stateText}>{emptyMessage}</span>
            </div>
        );
    }

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, data.length);

    return (
        <div className={className} style={styles.wrapper}>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={String(col.key)}
                                    style={{ ...styles.th, width: col.width }}
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, index) => {
                            const globalIndex = (currentPage - 1) * pageSize + index;
                            return (
                                <tr
                                    key={keyExtractor(row, globalIndex)}
                                    onClick={() => onRowClick?.(row)}
                                    style={{
                                        ...styles.tr,
                                        backgroundColor:
                                            striped && index % 2 === 1
                                                ? 'var(--color-background-secondary)'
                                                : 'var(--color-background-primary)',
                                        cursor: onRowClick ? 'pointer' : 'default',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (onRowClick)
                                            (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                                                'var(--color-background-tertiary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                                            striped && index % 2 === 1
                                                ? 'var(--color-background-secondary)'
                                                : 'var(--color-background-primary)';
                                    }}
                                >
                                    {columns.map((col) => (
                                        <td key={String(col.key)} style={styles.td}>
                                            {col.render
                                                ? col.render(row[col.key], row)
                                                : String(row[col.key] ?? '-')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination bar */}
            <div style={styles.paginationBar}>
                {/* Left: count info + page size */}
                <div style={styles.paginationLeft}>
                    <span style={styles.countText}>
                        {startItem}–{endItem} of {data.length}
                    </span>
                    <select
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        style={styles.pageSizeSelect}
                        aria-label="Rows per page"
                    >
                        {pageSizeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt} / page
                            </option>
                        ))}
                    </select>
                </div>

                {/* Right: page buttons */}
                <div style={styles.pageButtons}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={styles.navBtn(currentPage === 1)}
                        aria-label="Previous page"
                    >
                        ‹
                    </button>

                    {getPageNumbers().map((page, i) =>
                        page === '...' ? (
                            <span key={`ellipsis-${i}`} style={styles.ellipsis}>
                                …
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page as number)}
                                style={styles.pageBtn(page === currentPage)}
                                aria-current={page === currentPage ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        )
                    )}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={styles.navBtn(currentPage === totalPages)}
                        aria-label="Next page"
                    >
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        display: 'flex' as const,
        flexDirection: 'column' as const,
        gap: '0',
        background: 'var(--color-background-primary)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 'var(--border-radius-lg)',
        overflow: 'hidden',
    },
    tableWrapper: {
        overflowX: 'auto' as const,
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse' as const,
        fontSize: '14px',
    },
    th: {
        padding: '12px 16px',
        textAlign: 'left' as const,
        fontWeight: 500,
        fontSize: '13px',
        color: 'var(--color-text-secondary)',
        background: 'var(--color-background-secondary)',
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        whiteSpace: 'nowrap' as const,
        letterSpacing: '0.01em',
    },
    tr: {
        transition: 'background 0.1s',
    },
    td: {
        padding: '11px 16px',
        color: 'var(--color-text-primary)',
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        fontSize: '14px',
        lineHeight: '1.5',
    },
    paginationBar: {
        display: 'flex' as const,
        alignItems: 'center' as const,
        justifyContent: 'space-between' as const,
        padding: '10px 16px',
        borderTop: '0.5px solid var(--color-border-tertiary)',
        background: 'var(--color-background-secondary)',
        gap: '12px',
        flexWrap: 'wrap' as const,
    },
    paginationLeft: {
        display: 'flex' as const,
        alignItems: 'center' as const,
        gap: '12px',
    },
    countText: {
        fontSize: '13px',
        color: 'var(--color-text-secondary)',
    },
    pageSizeSelect: {
        fontSize: '13px',
        padding: '4px 8px',
        borderRadius: 'var(--border-radius-md)',
        border: '0.5px solid var(--color-border-secondary)',
        background: 'var(--color-background-primary)',
        color: 'var(--color-text-primary)',
        cursor: 'pointer',
        outline: 'none',
    },
    pageButtons: {
        display: 'flex' as const,
        alignItems: 'center' as const,
        gap: '4px',
    },
    navBtn: (disabled: boolean): React.CSSProperties => ({
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--border-radius-md)',
        border: '0.5px solid var(--color-border-tertiary)',
        background: 'var(--color-background-primary)',
        color: disabled ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
        fontSize: '18px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        lineHeight: 1,
        transition: 'background 0.1s, color 0.1s',
    }),
    pageBtn: (active: boolean): React.CSSProperties => ({
        minWidth: '32px',
        height: '32px',
        padding: '0 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--border-radius-md)',
        border: active ? '0.5px solid var(--color-border-info)' : '0.5px solid var(--color-border-tertiary)',
        background: active ? 'var(--color-background-info)' : 'var(--color-background-primary)',
        color: active ? 'var(--color-text-info)' : 'var(--color-text-primary)',
        fontSize: '13px',
        fontWeight: active ? 500 : 400,
        cursor: active ? 'default' : 'pointer',
        transition: 'background 0.1s, color 0.1s, border-color 0.1s',
    }),
    ellipsis: {
        width: '32px',
        height: '32px',
        display: 'flex' as const,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        fontSize: '13px',
        color: 'var(--color-text-tertiary)',
    },
    stateBox: {
        display: 'flex' as const,
        flexDirection: 'column' as const,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        padding: '48px 24px',
        gap: '12px',
        background: 'var(--color-background-primary)',
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 'var(--border-radius-lg)',
    },
    stateText: {
        color: 'var(--color-text-secondary)',
        fontSize: '14px',
    },
    spinner: {
        width: '20px',
        height: '20px',
        border: '2px solid var(--color-border-tertiary)',
        borderTopColor: 'var(--color-text-info)',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
    },
};