import React from 'react';
import { take } from 'lodash';
import './table-list.css';
interface TableListProps {
  data: string;
}

const TableList = ({ data }: TableListProps) => {
  const dataJson = JSON.parse(atob(data));

  /** Constants */
  const PAGE_SIZE = 10;

  /** Callbacks */
  const IsTable = () => {
    const firstRow = dataJson[0];
    return Object.keys(firstRow).length > 1;
  };
  //
  const columnNames = () => {
    const firstRow = dataJson[0];
    return Object.keys(firstRow);
  };

  /** Renderer */
  return (
    <div className="table-list--main-container">
      {dataJson.length === 0 ? (
        <span>No result for your question!</span>
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
            {take(dataJson, PAGE_SIZE).map((row: any, i: number) => (
              <tr key={'response-table-row-' + i}>
                {columnNames().map((columnName: string, j) => (
                  <td key={'response-table-cell-' + j} className="table-list--table-row">
                    {row[columnName]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul>
          {take(dataJson, PAGE_SIZE).map((row: any, i: number) => (
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
      {dataJson.length > PAGE_SIZE && (
        <small>
          There are {dataJson.length} items in the result. The rest are hidden to prevent cluttering the chat.
        </small>
      )}
    </div>
  );
};

export default TableList;
