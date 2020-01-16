const { body } = document;
let candidate: number[];
let resultArray: number[] = [];

// 랜덤 숫자 생성
function chooseNumber() {
  candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  resultArray = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    resultArray.push(chosen);
  }
}

// 폼 초기화 코드
function initialize() {
  input.value = '';
  input.focus();
  wrongCount = 0;
  chooseNumber();
  console.log(resultArray);
}

chooseNumber();

console.log(resultArray);

const result = document.createElement('div');
body.append(result);

const form = document.createElement('form');
body.append(form);

const input = document.createElement('input');
input.type = 'text';
input.maxLength = 4;
form.append(input);

const button = document.createElement('button');
button.textContent = '입력';
form.append(button);

let wrongCount = 0;

// ***** 이벤트 등록 ********************************************* //

form.addEventListener('submit', e => {
  e.preventDefault();
  let strike = 0;
  let ball = 0;
  if (input.value === resultArray.join('')) {
    result.textContent = '홈런✌';
    initialize();
  } else {
    // 틀린게 10번 이상이면 답을 공개하고 다시 시작
    const inputArray = input.value.split('');
    wrongCount++;

    if (wrongCount > 10) {
      result.textContent = `실패...😂 정답은 ${resultArray.join(',')} 입니다.`;
      initialize();
    } else {
      for (let i = 0; i < resultArray.length; i++) {
        if (Number(inputArray[i]) === resultArray[i]) {
          strike++;
        } else if (resultArray.indexOf(Number(inputArray[i])) > -1) {
          ball++;
        }
      }
      result.textContent = `${strike} 스트라이크 ${ball} 볼`;
      input.value = '';
      input.focus();
    }
  }
});
