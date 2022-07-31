//? 복잡한 객체의 값을 가져올 때 올바른 타입 설정하기

export const getDeepValue = <
  TObj,
  TFirstKey extends keyof TObj,
  TSecondKey extends keyof TObj[TFirstKey]
>(
  obj: TObj,
  firstKey: TFirstKey,
  secondKey: TSecondKey
) => {
  return obj[firstKey][secondKey];
};

const obj = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: '12',
    d: 18,
  },
};

const value = getDeepValue(obj, 'foo', 'b');

console.log(typeof value);

console.log(value);
