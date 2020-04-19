import React, { createContext, Dispatch, useReducer, useContext } from 'react';

/**
 * * 상태용 Context와 디스패치용 Context를 따로 만든다.
 * ? Context 1개를 쓰는 것보다 쓸대없는 랜더링을 줄일 수 있다.
 */

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

type TodoState = Todo[];

// ****** 상태용 Context
const TodosStateContext = createContext<TodoState | undefined>(undefined);

type Action =
  | {
      type: 'CREATE';
      text: string;
    }
  | {
      type: 'TOGGLE';
      id: number;
    }
  | {
      type: 'REMOVE';
      id: number;
    };

type TodosDispatch = Dispatch<Action>;

// ***** 디스패치용 Context
const TodosDispatchContext = createContext<TodosDispatch | undefined>(
  undefined,
);

function todosReducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case 'CREATE':
      const nextId = Math.max(0, ...state.map((todo) => todo.id)) + 1;
      return state.concat({
        id: nextId,
        text: action.text,
        done: false,
      });

    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id
          ? {
              ...todo,
              done: !todo.done,
            }
          : todo,
      );

    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);

    default:
      throw new Error('Unhandled action');
  }
}

// ***** Provider

export function TodosContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, dispatch] = useReducer(todosReducer, [
    {
      id: 1,
      text: 'Context API 배우기',
      done: true,
    },
    {
      id: 2,
      text: 'Typescript 배우기',
      done: true,
    },
    {
      id: 3,
      text: 'Typescript 와 Context API 함께 사용하기',
      done: false,
    },
  ]);

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
}

// ***** Custom Hooks

export function useTodosState() {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error('TodosProvider not found');
  return state;
}

export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error('TodosProvider not found');
  return dispatch;
}
