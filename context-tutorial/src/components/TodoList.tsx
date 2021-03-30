import React from 'react';
import { useTodoState } from '../contexts/TodosContext';
import TodoItem from './TodoItem';

export default function TodoList() {
  const todos = useTodoState();
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}
