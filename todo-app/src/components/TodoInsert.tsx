import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

type TodoInsertProps = {
  onInsert: (text: string) => void;
};

function TodoInsert({ onInsert }: TodoInsertProps) {
  const [value, setValue] = useState('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onInsert(value);
      setValue('');
    },
    [value, onInsert],
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        onChange={onChange}
        value={value}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
}

export default TodoInsert;
