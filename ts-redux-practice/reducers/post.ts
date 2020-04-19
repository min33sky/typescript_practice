import produce from 'immer';
import { AddPostAction, ADD_POST } from '../actions/post';

const initialState: string[] = [];

const postReducer = (prevState = initialState, action: AddPostAction) => {
  return produce(prevState, draft => {
    switch (action.type) {
      case ADD_POST:
        draft.push(action.data);
        break;

      default:
        break;
    }
  });
};

export default postReducer;
