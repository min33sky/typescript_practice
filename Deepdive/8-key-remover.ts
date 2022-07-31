//? 객체의 키의 타입을 제거하는 방법

const makeKeyRemover =
  <Key extends PropertyKey>(keys: Key[]) =>
  <Obj>(obj: Obj): Omit<Obj, Key> => {
    return {} as any;
  };

//? 제거할 키를 배열로 받는다.
const keyRemover = makeKeyRemover(['a', 'b']);

//? 키를 제거할 객체를 전달
const newObject = keyRemover({ a: 1, b: 2, c: 3 });

// newObject.a;
// newObject.b;
newObject.c;
