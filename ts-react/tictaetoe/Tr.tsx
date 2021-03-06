import * as React from 'react';
import { FC, Dispatch, useMemo } from 'react';
import Td from './Td';

interface Props {
  rowData: string[];
  rowIndex: number;
  dispatch: Dispatch<any>;
}

const Tr: FC<Props> = ({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');

  return (
    <tr>
      {Array(rowData.length)
        .fill(null)
        .map((td, i) =>
          useMemo(
            () => (
              <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i}>
                {rowData[i]}
              </Td>
            ),
            [rowData[i]],
          ),
        )}
    </tr>
  );
};

export default Tr;
