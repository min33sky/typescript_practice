import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList, { Todo } from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function App() {
  const [todos, setTodos] = useState(createBulkTodos);

  // 고유값으로 사용될 id
  // ref를 사용하여 변수 담기 (랜더링과 상관 없는 값)
  const nextId = useRef<number>(2501);

  const onInsert = useCallback((text: string) => {
    const todo: Todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    // ! 함수형 업데이트를 사용하면 의존배열에 상태값을 넣을 필요가 없어서
    // ! 함수 재생성을 막아준다.
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(
    (id: number) => () => {
      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    },
    [],
  );

  const onToggle = useCallback(
    (id: number) => () => {
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
