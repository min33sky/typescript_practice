import * as React from 'react';
import { useContext } from 'react';
import { TableContext } from './mineSearch';
import Tr from './Tr';

const Table = () => {
  const { tableData } = useContext(TableContext);

  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill(null)
          .map((tr, i) => (
            <Tr key={i} rowIndex={i} />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
