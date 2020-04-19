import React, { useState } from 'react';
import { useTodosDispatch } from '../contexts/TodosContext';

function TodoForm() {
  const [value, setValue] = useState('');
  const dispatch = useTodosDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      text: value,
    });
    setValue('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        placeholder="무엇을 하실 건가요?"
        onChange={handleChange}
      />
      <button>등록</button>
    </form>
  );
}

export default TodoForm;
