import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

export type Todo = {
  id: number;
  text: string;
  checked: boolean;
};

export type TodoListProps = {
  todos: Todo[];
  onRemove: (id: number) => () => void;
  onToggle: (id: number) => () => void;
};

function TodoList({ todos, onRemove, onToggle }: TodoListProps) {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default TodoList;
