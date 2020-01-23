// 데코레이터 : 클래스 프로퍼티의 중복 제거와 수정을 할 수 있다.
function makeGender(target: typeof Person) {
  console.log(target);
  return class extends target {
    gender = 'male';
    sayGender() {
      return this.gender;
    }
  };
}

function readonly(target: any, key: any, descriptor: PropertyDescriptor) {
  console.log(target, key);
  descriptor.writable = false; // 임의 수정을 못하게 막는다.
}

@makeGender
class Person {
  title: string;
  age = 27;

  constructor(title: string) {
    this.title = title;
  }

  setTitle(title: string) {
    this.title = title;
  }

  @readonly sayTitle(): any {
    return this.title;
  }
}

@makeGender
class Person2 {
  title: string;
  age = 27;

  constructor(title: string) {
    this.title = title;
  }

  setTitle(title: string) {
    this.title = title;
  }

  sayTitle(): any {
    return this.title;
  }
}

// ********************************************************************************

const messi = new Person('messi');
console.log('sayTitle', messi.sayTitle());
messi.setTitle = () => 'changed';
console.log('sayTitle', messi.sayTitle());
