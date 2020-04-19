import * as React from 'react';
import { useState, useRef, useCallback } from 'react';

const WordRelay = () => {
  const [word, setWord] = useState('레알 마드리드');
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);

  const onSubmitForm = useCallback<(e: React.FormEvent) => void>(
    e => {
      e.preventDefault();
      const input = inputEl.current;

      if (word[word.length - 1] === value[0]) {
        setResult('정답');
        setWord(value);
        setValue('');
        if (input) {
          input.focus();
        }
      } else {
        setResult('땡');
        setValue('');
        if (input) {
          input.focus();
        }
      }
    },
    [word, value],
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  }, []);

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input type='text' ref={inputEl} value={value} onChange={onChange} />
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelay;
