import canUseDOM from 'can-use-dom';

console.log(canUseDOM);

// 유명하지 않은 패키지의 경우엔 타입을 직접 적어줘야한다.
// ex) 'npm i @types/모듈이름'이 존재하지 않을 경우

window.hello = 'a';
const error = new Error('');
error.code;
