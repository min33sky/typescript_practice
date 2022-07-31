//? 객체의 값에 대한 타입 추출하기
type OBJ = {
  a: 'FOO';
  a2: 'a2';
  a3: 'a3';
  b1: 'b1';
  b2: 'b2';
  b3: 'b3';
};

type ValuesOfKeysStartingWithA<
  Obj,
  _ExtractedKeys extends keyof Obj = Extract<keyof Obj, `a${string}`>
> = {
  [K in _ExtractedKeys]: Obj[K];
}[_ExtractedKeys];

type NewUnion = ValuesOfKeysStartingWithA<OBJ>;

//? enum의 TYPE 추출하기
enum Whatever {
  whatever = 'we',
  something = 'st',
}

type WhateverValue = `${Whatever}`;
type WhateverKey = keyof typeof Whatever;
