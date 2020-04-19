import { createAction, ActionType, createReducer } from 'typesafe-actions';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';

export const increase = createAction(INCREASE)();

// () => ({
//   type: INCREASE,
// });

export const decrease = createAction(DECREASE)();

// () => ({
//   type: DECREASE,
// });

export const increaseBy = createAction(INCREASE_BY)<number>();

// (diff: number) => ({
//   type: INCREASE_BY,
//   payload: diff,
// });

/**
 * ? typesafe-action으로 액션함수를 만들 때 아래와 같은 경우 대처법
 * - 임의의 id 값을 payload에 추가한 경우
 * const createItem = (name: string) => ({ type: CREATE_ITEM, payload: { id: nanoid(), name } });
 * - 해결법 :
 * const createItem = createStandardAction(CREATE_ITEM).map(name => ({ payload: { id: nanoid(), name } }));
 *
 */

// ReturnType: 함수의 반환 타입을 가져오는 유틸타입
// type CounterAction =
//   | ReturnType<typeof increase>
//   | ReturnType<typeof decrease>
//   | ReturnType<typeof increaseBy>;

// 액션 객체 타입 생성
const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;

type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: (state) => ({ count: state.count + 1 }),
  [DECREASE]: (state) => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }),
});

// function counter(
//   state: CounterState = initailState,
//   action: CounterAction,
// ): CounterState {
//   switch (action.type) {
//     case 'counter/INCREASE':
//       return {
//         count: state.count + 1,
//       };
//     case 'counter/DECREASE':
//       return {
//         count: state.count - 1,
//       };

//     case 'counter/INCREASE_BY':
//       return {
//         count: state.count + action.payload,
//       };
//     default:
//       return state;
//   }
// }

export default counter;
