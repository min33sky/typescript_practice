"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var can_use_dom_1 = require("can-use-dom");
console.log(can_use_dom_1.default);
// 유명하지 않은 패키지의 경우엔 타입을 직접 적어줘야한다.
// ex) 'npm i @types/모듈이름'이 존재하지 않을 경우
window.hello = 'a';
var error = new Error('');
error.code;
