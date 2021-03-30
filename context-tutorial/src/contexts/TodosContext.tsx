import React, { createContext, Dispatch, useContext, useReducer } from 'react';

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodosState = Todo[];

// 상태 전용 Context
const TodosStateContext = createContext<TodosState | undefined>(undefined);

type Action =
  | { type: 'CREATE'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number };

type TodosDispatch = Dispatch<Action>;

// 디스패치 전용 Context
const TodosDispatchContext = createContext<TodosDispatch | undefined>(
  undefined,
);

// 리듀서
function todosReducer(state: TodosState, action: Action): TodosState {
  switch (action.type) {
    case 'CREATE': {
      //? Math.max(...[])의 값은 -Infinity이므로 기본값으로 0을 넣어주자
      const nextId = Math.max(0, ...state.map((todo) => todo.id)) + 1;
      return [...state, { id: nextId, text: action.text, done: false }];
    }

    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );

    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);

    default:
      throw new Error('Unhandled action');
  }
}

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
      text: 'Typescript와 Context API 함께 사용하기',
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

//? custom Hook (undefined를 미리 처리해서 사용하기)
export function useTodoState() {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error('TodosProvider not found');
  return state;
}

export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error('TodosProvider not found');
  return dispatch;
}
