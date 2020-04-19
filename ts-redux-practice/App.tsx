import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { UserState } from './reducers/user';
import { FC, useState } from 'react';
import { logIn, logOut, LogInType, ThunkDispatch } from './actions/user';
import { RootState } from './reducers';

const App: FC = () => {
  const { data, isLoggingIn } = useSelector<RootState, UserState>(
    state => state.user,
  );
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logIn({ id: 'messi', password: '1234' }));
  };

  const onLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div>
      {isLoggingIn ? (
        <div>로그인 중</div>
      ) : data ? (
        <div>{data.nickname}</div>
      ) : (
        '로그인 해주세요'
      )}
      {!data ? (
        <button onClick={onClick}>로그인</button>
      ) : (
        <button onClick={onLogOut}>로그아웃</button>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  post: state.post,
}); // 참고: reselect

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  dispatchLogIn: (data: LogInType) => dispatch(logIn(data)),
  dispatchLogOut: () => dispatch(logOut()),
});

export default App;
