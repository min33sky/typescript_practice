import * as React from 'react';
import { FC, Dispatch, useCallback } from 'react';
import { clickCell } from './tictaetoe';

interface Props {
  rowIndex: number;
  cellIndex: number;
  dispatch: Dispatch<any>;
  children: string;
}

const Td: FC<Props> = ({ rowIndex, cellIndex, dispatch, children }) => {
  console.log('td rendered');

  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if (children) return; // 이미 클릭한 것은 클릭 금지
    dispatch(clickCell(rowIndex, cellIndex));
  }, [children]);

  return <td onClick={onClickTd}>{children}</td>;
};

export default Td;
