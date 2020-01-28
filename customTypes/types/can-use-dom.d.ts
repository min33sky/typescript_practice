// 앰비언트 모듈 (모듈 이름을 npm 모듈 이름과 일치 시켜준다.)
declare module 'can-use-dom' {
  const canUseDOM: boolean;
  export default canUseDOM;
}
