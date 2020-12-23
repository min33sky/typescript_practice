function logMessage(value: string) {
  console.log(value);
}
function logMessage(value: number) {
  console.log(value);
}
function logMessage(value: any) {
  console.log(value);
}

// # Union 타입 문법 - `any` 보다는 명시적임
function logMessage(value: string | number) {
  console.log(value);
}

function logMessage(value: string | number) {
  if (typeof value === 'string') {
    value.toLocaleUpperCase();
  }
  if (typeof value === 'number') {
    value.toLocaleString();
  }
  throw new TypeError('value must be string or number');
}

// # Intersection 타입 문법
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

// 유니온 타입은 공통 속성만 보여준다. (타입이 깨지는 걸 막기위해)
function askSomeone(someone: Developer | Person) {
  someone.name; // O
  someone.age; // X
}

// 인터섹션 타입은 모든 속성을 다 포함한다.
function askSomeone2(someone: Developer & Person) {
  someone.name;
  someone.age;
  someone.skill;
}

askSomeone({ name: '철수', skill: '전장' });
askSomeone({ name: '옥냥이', age: 33 });
askSomeone2({ name: '침착맨', age: 38, skill: '열받게하기' });
