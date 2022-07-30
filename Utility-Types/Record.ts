/**
 ** Record
 *? 객체의 타입을 정의
 */
const data = [
  { name: 'John', age: 30 },
  { name: 'Jisoo', age: 28 },
];

const result = data.reduce(
  (
    acc: Record<
      string,
      {
        name: string;
        age: number;
      }
    >,
    cur,
    index
  ) => {
    acc[String(index)] = {
      ...cur,
    };
    return acc;
  },
  {}
);

console.log({ result });
