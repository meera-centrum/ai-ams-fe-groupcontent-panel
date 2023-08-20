import React from 'react';
import { take } from 'lodash';
import fetcher from 'utils/fetcher';
import useSWR from 'swr';

import './table-list.css';

interface TableListProps {
  query: string;
}

const TableList = ({ query: queryBuf }: TableListProps) => {
  /** Constants */
  const PAGE_SIZE = 10;
  /** Variable */
  let query = '';
  //
  try {
    query = atob(decodeURIComponent(queryBuf));
  } catch (e: any) {}
  const { data, isLoading } = useSWR(
    () => (!!query ? `http://localhost:3001/api/ds?query=${encodeURIComponent(query)}` : null),
    fetcher,
    {}
  );
  //
  if (isLoading) {
    return <div>Loading data...</div>;
  }
  //
  const { data: queryResult } = data;

  /** Callbacks */
  const IsTable = () => {
    const firstRow = queryResult[0];
    return Object.keys(firstRow).length > 1;
  };

  const columnNames = () => {
    const firstRow = queryResult[0];
    return Object.keys(firstRow);
  };

  const formatCellValue = (cellValue: any) => {
    if (cellValue instanceof Date) {
      return (cellValue as Date).toDateString();
    }
    if (typeof cellValue === 'string') {
      const dateValue = Date.parse(cellValue);
      if (!isNaN(dateValue)) {
        const date = new Date(cellValue);
        return date.toDateString();
      }
    }
    return cellValue;
  };

  /** Renderer */
  return (
    <div className="table-list--main-container">
      {queryResult.length === 0 ? (
        <span>No result for you question!</span>
      ) : IsTable() ? (
        <table className="mb-4 table-list--table-container">
          <thead>
            <tr>
              {columnNames().map((columName, i) => (
                <th key={'response-table-header-row-' + i} className="table-list--table-header">
                  {columName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {take(queryResult, PAGE_SIZE).map((row: any, i: number) => (
              <tr key={'response-table-row-' + i}>
                {columnNames().map((columnName: string, j) => (
                  <td key={'response-table-cell-' + j} className="table-list--table-row">
                    {formatCellValue(row[columnName])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul>
          {take(queryResult, PAGE_SIZE).map((row: any, i: number) => (
            <li key={'response-list-row-' + i}>
              {columnNames().map((columnName: string, j) => (
                <span key={'response-list-item-' + j}>
                  {columnName}: {row[columnName]}
                </span>
              ))}
            </li>
          ))}
        </ul>
      )}
      {queryResult.length > PAGE_SIZE && (
        <small>
          There are {queryResult.length} items in the result. The rest are hidden to prevent cluttering the chat.
        </small>
      )}
    </div>
  );
};

export default TableList;
