# `TypeScript` 연습

> Typescript 연습 + 웹 게임 구현

---

## 예제

- todo-app (투두 앱)
- ts-axios (Axios 만들어보기)

---

## Grammer

> 배열 타입을 `[ ]`으로 지정하면 never 타입이 되어서 어떤 값도 들어갈 수가 없다

```ts
// Error!!
let array: [];

// Success
let candidate: number[];
let resultArray: number[] = [];
let numberArray: Array<number>;
```

> `as const` : 객체 프로퍼티도 수정 못하게 막을 수 있다.

```ts
const score1 = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;

const score2 = {
  ROCK: 0,
  SCISSORS: 1,
  PAPER: -1,
} as const;

score1.ROCK = 4; // Success
score2.ROCK = 4; // Error!!
```

---

## `Type` vs `Interface`

- Type이 Interface보다 더 넓은 범위
- Interface는 중복 선언이 가능하다. (타인의 인터페이스를 맘대로 확장할 수 있다.)
- 객체는 Interface로 타입을 설정하는 것이 더 좋다.
- Type은 주로 | 와 함께 사용된다.

```ts
interface Leagues {
  EPL: 1,
  La Liga: 2,
  Bundesliga: 3,
  Seria A: 4,
  League 1: 5
}

interface Leagues {
  K-League: 6,
  J-League: 7,
  C-League: 8
}
```

```ts
type Hello = string | number;
```

> 타입에 여유를 주고 싶을 때 interface를 사용할 수 있다. (**비추천**)

```ts
interface Example {
  a: 3;
  b: 5;
  [key: string]: number;
}

const example: Example = {
  a: 3,
  b: 5,
  c: 7,
};
```

## keyof

> 변수 타입과 리턴 타입을 중복해서 적는걸 막기 위해서 `keyof`를 사용한다.

```ts
interface RSP {
  readonly ROCK: '0';
  readonly SCISSORS: '-142px';
  readonly PAPER: '-284px';
}

function computerChoice(
  imgCoords: '0' | '-142px' | '-284px',
): 'ROCK' | 'SCISSORS' | 'PAPER' {
  // 생략
}

// * keyof로 타입 중복을 제거할 수 있다.
function computerChoice(imgCoords: RSP[keyof RSP]): keyof RSP {
  // 생략
}
```

## 주의점

> Typescript는 HTML을 체크하지 못해 DOM 메서드 사용 시 NULL을 리턴한다고 파악하며 문자열도 인식 못한다.

```ts

// #computer 문자열을 인식 못해서 위와 아래가 같다고 판단을 못 한다.
if (document.querySelector<HTMLDivElement>('#computer')) {
      (document.querySelector<HTMLDivElement>('#computer').style.background = 'url(이미지)';

// 해결책 : 변수로 저장해서 사용하기
const computer = document.querySelector<HTMLDivElement>('#computer');
if(computer) {
  computer.style.background = 'url(이미지)';
}

```

## Module

- node는 commonjs 모듈, typescript는 javascript와 같은 모듈 시스템을 사용한다.

- 두 모듈의 차이점은 default의 유무이다.

```ts
// commonjs module
const hello = 'module';

// exports 객체의 속성 값으로 넣기
// const {a, b} = require('./module')로 불러올 수 있다.
exports.a = 1;
exports.b = 'hi';

// exports 객체를 덮어 씌우므로 위의 값들은 사라진다.
// const module = require('./module)로 불러올 수 있다.
module.exports = function() {
  c: 'bye',
};
```

```ts
// es2015 module
const hello = 'module';

// import {a, b} from './module'로 불러올 수 있다.
export const a = 1;
export const b = 'hi';

// commonjs와 달리 별개로 취급된다.
// !! module.exports와 차이점이다.
// import module from './module';로 불러올 수 있다.
export default function () {
  c: 'bye';
}
```

> import문으로 commonjs 모듈을 가져올 때 주의 사항

```ts
// X : tsconfig 설정을 통해서 아래와 같이 사용할 수 있지만 비추천
import hi from './module';
// O
import hi = require('./module');
import * as hi from './module';
```

## React-router

> 리액트 라우터의 타입은 react-router 모듈의 **RouteComponentProps**로 제공된다.

```js
// params는 제네릭에 타입을 넣어줘야한다.
type ProfileParams = {
  username: string;
};

export default function Profile({ match }: RouteComponentProps<ProfileParams>) {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

```
