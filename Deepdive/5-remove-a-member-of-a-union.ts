//? Union 타입에서 지정한 맴버를 제거한 타입 반환하기
export type Letters = 'a' | 'b' | 'c';

type RemoveC<TType> = TType extends 'c' ? never : TType;

type WowWithoutC = RemoveC<Letters>;
