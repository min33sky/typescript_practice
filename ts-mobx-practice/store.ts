import { observable, action, configure } from 'mobx';

configure({ enforceActions: 'always' });

interface User {
  nickname: string;
  password: string;
}

interface UserStore {
  isLoggingIn: boolean;
  data: User | null;
  logIn: (data: User) => void;
  logOut: () => void;
}

// observable로 감싸주면 안에 상태값이 바뀔 때 마다 랜더링 된다.
const userStore = observable<UserStore>({
  isLoggingIn: false,
  data: null,
  // State를 바꾸는 함수는 action으로 감싸는 것이 좋다. (비동기 처리때 문제가 발생할 수 있음)
  logIn: action((data: User) => {
    userStore.isLoggingIn = true;
    setTimeout(
      action(() => {
        userStore.data = data;
        userStore.isLoggingIn = false;
        postStore.data.push('1');
      }),
      2000,
    );
  }),
  logOut: action(() => {
    userStore.data = null;
  }),
});

interface PostStore {
  data: string[];
  addPost: (data: string) => void;
}

const postStore = observable<PostStore>({
  data: [],
  addPost: action((data: string) => {
    postStore.data.push(data);
  }),
});

export { userStore, postStore };
