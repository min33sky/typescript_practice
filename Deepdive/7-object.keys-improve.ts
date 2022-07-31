//? Object.key()로 나오는 key들의 타입을 정확하게 구하기

const myObject = {
  a: 1,
  b: 2,
  c: 3,
};

//* 기존 방식: key의 타입은 string -> 객체의 인덱스로 사용시 에러 발생
Object.keys(myObject).forEach((key) => {
  console.log(myObject[key]);
});

//* 개선하기 위한 함수
const objectKeys = <OBJ>(obj: OBJ): (keyof OBJ)[] => {
  return Object.keys(obj) as (keyof OBJ)[];
};

//* key의 타입이 'a' | 'b' | 'c'로 정확하게 나온다
objectKeys(myObject).forEach((key) => {
  console.log(myObject[key]);
});
