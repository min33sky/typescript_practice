//? Record 타입의 키에 접근 제한 두기

const myObj: Record<string, string[]> = {};

//? "tsconfig.json"에서  "noUncheckedIndexAccess: true" 옵션을 활성화하면 에러 발생
//? 설정 후 다음과 같이 처리하면 정상 작동
if (!myObj.foo) {
  myObj.foo = [];
}

myObj.foo.push('bar');
