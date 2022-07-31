//? 제네릭 타입 체크시 에러메세지 설정

type CheckForBadArgs<Arg> = Arg extends any[] ? "Don't pass array" : Arg;

const deepEqualCompare = <Arg>(
  a: CheckForBadArgs<Arg>,
  b: CheckForBadArgs<Arg>
): boolean => {
  // * 매개변수의 타입으로 타입 체크가 미리 가능하므로 아래 코드가 필요가 없어진다.
  // if (Array.isArray(a) || Array.isArray(b)) {
  //   throw new Error('Array Nooooooooooooooooooooo!!');
  // }

  return a === b;
};

deepEqualCompare(3, 5);
// deepEqualCompare([], []); //! Error
