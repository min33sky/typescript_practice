import React, { useState } from 'react';
import ColorBox from './components/ColorBox';
import SelectColors from './components/SelectColors';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { ColorProvider } from './contexts/ColorContext';
import { TodosContextProvider } from './contexts/TodosContext';

function App() {
  const [mode, setMode] = useState(true);

  return (
    <>
      {!mode && (
        <ColorProvider>
          <SelectColors />
          <hr />
          <ColorBox />
        </ColorProvider>
      )}
      {mode && (
        <TodosContextProvider>
          <TodoForm />
          <TodoList />
        </TodosContextProvider>
      )}
      <hr />
      <button onClick={() => setMode((prev) => !prev)}>화면 전환</button>
    </>
  );
}

export default App;
