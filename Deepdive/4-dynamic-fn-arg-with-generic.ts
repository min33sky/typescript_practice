//? 함수의 동적 파라미터에 대한 타입 구현하기

export type Event =
  | {
      type: 'LOG_IN';
      payload: {
        userId: string;
      };
    }
  | {
      type: 'SIGN_OUT';
    };

//! No!!!
// const sendEvent = (eventType: Event['type'], payload?: any) => {};

//* Yes
const sendEvent = <Type extends Event['type']>(
  ...args: Extract<Event, { type: Type }> extends { payload: infer TPayload }
    ? [type: Type, payload: TPayload]
    : [type: Type]
) => {};

/**
 * Correct
 */
sendEvent('SIGN_OUT');
sendEvent('LOG_IN', {
  userId: '123',
});

/**
 * Should Error
 */
// sendEvent('SIGN_OUT', {});
// sendEvent('LOG_IN', {
//   userId: 123,
// });
// sendEvent('LOG_IN', {});
// sendEvent('LOG_IN');
