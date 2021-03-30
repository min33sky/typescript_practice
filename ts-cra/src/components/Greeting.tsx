import React, { useCallback, useContext, useState } from 'react';
import { SetUserContext, UserContext } from '../App';

export default function Greeting() {
  const user = useContext(UserContext);
  const dispatch = useContext(SetUserContext);

  const [value, setValue] = useState('');
  const [show, setShow] = useState(true);

  console.log('Greeting');

  const handleClick = () => {
    dispatch({
      type: 'update',
      name: 'ronaldo',
      team: 'juventus',
    });
    setShow((v) => !v);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const inputRef = useCallback((ref) => ref && setValue(INITIAL_VALUE), []);

  return (
    <>
      <div>이름 : {user.name}</div>
      <div>팀 : {user.team}</div>
      <button onClick={handleClick}>클릭하세요</button>
      {show && <input ref={inputRef} value={value} onChange={handleInput} />}
    </>
  );
}

const INITIAL_VALUE = '안녕하세요';
