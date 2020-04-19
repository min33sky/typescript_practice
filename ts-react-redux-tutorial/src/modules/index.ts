import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;

// useSelector에서 사용할 타입
export type RootState = ReturnType<typeof rootReducer>;
