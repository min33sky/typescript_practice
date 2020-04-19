import React from 'react';
import TodoItem from './TodoItem';
import { useTodosState } from '../contexts/TodosContext';

function TodoList() {
  // ContextAPI를 사용하기 위한 Custom Hook을 가져온다.
  const todos = useTodosState();

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}

export default TodoList;
