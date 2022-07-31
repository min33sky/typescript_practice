//? 제네릭 타입 체크시 에러메세지 설정

const deepEqualCompare = <Arg>(
  a: Arg extends any[] ? "Don't pass array" : Arg,
  b: Arg extends any[] ? "Don't pass array" : Arg
): boolean => {
  //* Array.isArray() 구문을 사용해 에러를 발생시키는 구문을 추가 할 필요가 없다.
  return a === b;
};

deepEqualCompare(3, 5);
// deepEqualCompare([], []); //! Error
