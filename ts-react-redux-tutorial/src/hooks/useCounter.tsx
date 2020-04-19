import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { increase, decrease, increaseBy } from '../modules/counter';

export default function useCounter() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const onIncrement = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrement = useCallback(() => dispatch(decrease()), [dispatch]);
  const onIncrementBy = useCallback(
    (diff: number) => dispatch(increaseBy(diff)),
    [dispatch],
  );

  return {
    count,
    onIncrement,
    onDecrement,
    onIncrementBy,
  };
}
