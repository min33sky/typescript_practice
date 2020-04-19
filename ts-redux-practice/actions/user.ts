import { UserState } from './../reducers/user';
import { addPost, AddPostAction } from './post';
import { Dispatch } from 'redux';
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';

export type UserActionType =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogOutAction;

export interface LogInType {
  id: string;
  password: string;
}

export interface LoginRequestAction {
  type: typeof LOG_IN_REQUEST;
  data: LogInType;
}

export interface LoginSuccessAction {
  type: typeof LOG_IN_SUCCESS;
  data: {
    userId: number;
    nickname: string;
  };
}

export interface LoginFailureAction {
  type: typeof LOG_IN_FAILURE;
  error: Error;
}

export interface LogOutAction {
  type: typeof LOG_OUT;
}

export const logInRequest = (data: {
  id: string;
  password: string;
}): LoginRequestAction => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logInSuccess = (data: {
  userId: number;
  nickname: string;
}): LoginSuccessAction => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  };
};

export const logInFailure = (error: Error): LoginFailureAction => {
  return {
    type: LOG_IN_FAILURE,
    error,
  };
};

export interface ThunkDispatch {
  (thunkAction: ThunkAction): void; // thunk 액션 : 리턴값이 없는 함수
  <A>(action: A): A; // 일반 액션 : 리턴 값이 있다.
  <TAction>(action: TAction | ThunkAction): TAction; // 위에 둘 중에서 하나를 골라서 리턴
}

export type ThunkAction = (dispatch: ThunkDispatch) => void; // 함수를 액션 타입으로 설정

export const logIn = (data: LogInType): ThunkAction => {
  return (
    dispatch: Dispatch<
      | LoginRequestAction
      | LoginSuccessAction
      | LoginFailureAction
      | AddPostAction
    >,
  ) => {
    dispatch(logInRequest(data));
    try {
      setTimeout(() => {
        dispatch(
          logInSuccess({
            userId: 1,
            nickname: '메시',
          }),
        );
        dispatch(addPost('zz'));
      }, 1000);
    } catch (error) {
      dispatch(logInFailure(error));
    }
  };
};

export const logOut = (): LogOutAction => {
  return {
    type: LOG_OUT,
  };
};
