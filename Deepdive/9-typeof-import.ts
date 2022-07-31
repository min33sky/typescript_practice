//? typeof import를 사용하여 타입을 지정하는 방법

type ActionModule = typeof import('./constants/todo');

// type Action = 'ADD_TODO' | 'REMOVE_TODO' | 'EDIT_TODO';
type Action = ActionModule[keyof ActionModule];
