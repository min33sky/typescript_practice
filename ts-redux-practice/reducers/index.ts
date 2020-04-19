import { combineReducers } from 'redux';
import user from './user';
import post from './post';

const reducer = combineReducers({
  user,
  post,
});

// * 함수의 리턴 타입을 사용할 때 ReturnType을 사용
export type RootState = ReturnType<typeof reducer>;

export default reducer;
