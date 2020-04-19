import React from 'react';
import useCounter from '../hooks/useCounter';

export default function Counter() {
  const { count, onIncrement, onDecrement, onIncrementBy } = useCounter();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrement}>+1</button>
      <button onClick={onDecrement}>-1</button>
      <button onClick={() => onIncrementBy(5)}>+5</button>
    </div>
  );
}
