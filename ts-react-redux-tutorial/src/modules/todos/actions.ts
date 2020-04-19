import { createAction } from 'typesafe-actions';

export const ADD_TODO = 'todos/ADD_TODO';
export const TOGGLE_TODO = 'todos/TOGGLE_TODO';
export const REMOVE_TODO = 'todos/REMOVE_TODO';

export const addTodo = createAction(ADD_TODO)<string>();

// ({
//   type: ADD_TODO,
//   payload: text,
// });

export const toggleTodo = createAction(TOGGLE_TODO)<number>();

// ({
//   type: TOGGLE_TODO,
//   payload: id,
// });

export const removeTodo = createAction(REMOVE_TODO)<number>();
// ({
//   type: REMOVE_TODO,
//   payload: id,
// });
