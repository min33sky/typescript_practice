# `TypeScript` 연습

> Typescript 연습 + 웹 게임 구현

---

## Grammer

> 배열 타입을 `[ ]`으로 지정하면 never 타입이 되어서 어떤 값도 들어갈 수가 없다

```ts
// Error!!
let array: [];

// Success
let candidate: number[];
let resultArray: number[] = [];
let numberArray: Array<Number>;
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

- 변수 타입과 리턴 타입을 중복해서 적는걸 막기 위해서 `keyof`를 사용한다.

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

## Typescript는 HTML을 체크하지 못해 DOM 메서드 사용 시 NULL을 리턴한다고 파악하며 문자열도 인식 못한다.

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
