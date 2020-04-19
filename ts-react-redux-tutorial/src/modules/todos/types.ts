import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

// 액션 객체의 타입
// type TodosAction =
//   | ReturnType<typeof addTodo>
//   | ReturnType<typeof toggleTodo>
//   | ReturnType<typeof removeTodo>;

export type TodosAction = ActionType<typeof actions>;

// 상태를 위한 타입
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type TodosState = Todo[];
