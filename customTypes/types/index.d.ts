export {}; // 글로벌 모듈을 외부 모듈로 변경하기위한 꼼수

declare global {
  interface Window {
    hello: string;
  }

  interface Error {
    code?: any;
  }
}
