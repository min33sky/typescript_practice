import React, { createContext, Dispatch, useReducer } from 'react';
import Profile from './components/Profile';

type UserDispatch = Dispatch<Action>;

export const SetUserContext = createContext<UserDispatch>(() => {});
export const UserContext = createContext<State>({
  name: '',
  team: '',
});

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <SetUserContext.Provider value={dispatch}>
      <UserContext.Provider value={state}>
        <Profile />
      </UserContext.Provider>
    </SetUserContext.Provider>
  );
}

interface State {
  name: string;
  team: string;
}

interface Action {
  type: string;
  name: string;
  team: string;
}

const INITIAL_STATE: State = { name: 'Messi', team: 'FC Barcelona' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        name: action.name,
        team: action.team,
      };

    default:
      return state;
  }
};

export default App;
