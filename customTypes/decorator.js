"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function makeGender(target) {
    console.log(target);
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.gender = 'male';
            return _this;
        }
        class_1.prototype.sayGender = function () {
            return this.gender;
        };
        return class_1;
    }(target));
}
function readonly(target, key, descriptor) {
    console.log(target, key);
    descriptor.writable = false;
}
var Person = /** @class */ (function () {
    function Person(title) {
        this.age = 27;
        this.title = title;
    }
    Person.prototype.setTitle = function (title) {
        this.title = title;
    };
    Person.prototype.sayTitle = function () {
        return this.title;
    };
    __decorate([
        readonly
    ], Person.prototype, "sayTitle", null);
    Person = __decorate([
        makeGender
    ], Person);
    return Person;
}());
var Person2 = /** @class */ (function () {
    function Person2(title) {
        this.age = 27;
        this.title = title;
    }
    Person2.prototype.setTitle = function (title) {
        this.title = title;
    };
    Person2.prototype.sayTitle = function () {
        return this.title;
    };
    Person2 = __decorate([
        makeGender
    ], Person2);
    return Person2;
}());
/////////////////////////////////////////////
var messi = new Person('messi');
console.log('sayTitle', messi.sayTitle());
messi.setTitle = function () { return 'changed'; };
console.log('sayTitle', messi.sayTitle());
