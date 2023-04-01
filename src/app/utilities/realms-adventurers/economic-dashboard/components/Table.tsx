"use client";
import { useState } from 'react';

export interface Headers {
    header: string;
    accessor: string;
}

interface TableProps {
    headers?: Headers[];
    data: any[];
}

export const Table = ({ headers, data }: TableProps) => {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' }>({
        key: 'id',
        direction: 'ascending',
    });

    console.log("Table data:", data);

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig) return 0;

        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getArrowStyle = (key: string) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? { color: 'blue', cursor: 'pointer' } : { color: 'red', cursor: 'pointer' };
        }
        return { color: 'grey', cursor: 'pointer' };
    };

    const getInactiveArrow = () => '▲';

    return (
        <table className="w-full border border-white/30">
            <thead className="uppercase">
                <tr>
                    {headers
                        ? headers.map((header, index) => (
                            <th key={index} className="p-2 border border-white/30">
                                {header.header}
                                <button onClick={() => requestSort(header.accessor)} style={getArrowStyle(header.accessor)}>
                                    {sortConfig.key === header.accessor ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : getInactiveArrow()}
                                </button>
                            </th>
                        ))
                        : Object.keys(data[0]).map((key) => (
                            <th className="p-2 border border-white/30" key={key}>
                                {key}
                                <button onClick={() => requestSort(key)} style={getArrowStyle(key)}>
                                    {sortConfig.key === key ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : getInactiveArrow()}
                                </button>
                            </th>
                        ))}
                </tr>
            </thead>
            <tbody>
                {sortedData.map((row, index) => (
                    <tr key={index}>
                        {Object.values(row).map((cell: any, cellIndex) => (
                            <td className="p-2 border border-white/30" key={cellIndex}>
                                {typeof cell === 'object' ? JSON.stringify(cell) : cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;