import * as React from 'react';
import { useObserver, useLocalStore } from 'mobx-react';
import { userStore, postStore } from './store';
import { useCallback } from 'react';
import { action } from 'mobx';

interface LocalStore {
  name: string;
  password: string;
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const App = () => {
  const state = useLocalStore<LocalStore>(() => ({
    name: '',
    password: '',
    // * this를 사용하기위해서 state의 타입을 설정해주자
    onChangeName: action(function(
      this: LocalStore,
      e: React.ChangeEvent<HTMLInputElement>,
    ) {
      this.name = e.target.value;
      userStore.isLoggingIn = false;
    }),
    onChangePassword: action(function(
      this: LocalStore,
      e: React.ChangeEvent<HTMLInputElement>,
    ) {
      this.password = e.target.value;
    }),
  }));

  const onLogIn = useCallback(() => {
    userStore.logIn({
      nickname: 'Leo Messi',
      password: '1234',
    });
  }, []);

  const onLogOut = useCallback(() => {
    userStore.logOut();
  }, []);

  // * useObserver : observable로 감싼 스토어들을 변경해준다
  return useObserver(() => (
    <div>
      {userStore.isLoggingIn ? (
        <div>로그인 중</div>
      ) : userStore.data ? (
        <div>{userStore.data.nickname}</div>
      ) : (
        '로그인 해주세요.'
      )}
      {!userStore.data ? (
        <button onClick={onLogIn}>로그인</button>
      ) : (
        <button onClick={onLogOut}>로그아웃</button>
      )}
      {postStore.data.length}
      <div>
        <input value={state.name} onChange={state.onChangeName} />
        <input
          value={state.password}
          type='password'
          onChange={state.onChangePassword}
        />
      </div>
    </div>
  ));
};

export default App;
