/*
 * 타입이 명확할 경우에는 따로 명시 할 필요가 없다
 */

let numberOne = Math.ceil(Math.random() * 9);
let numberTwo = Math.ceil(Math.random() * 9);
let result = numberOne * numberTwo;

const word = document.createElement('div');
word.textContent = `${numberOne} X ${numberTwo} = ?`;
document.body.append(word);

const form = document.createElement('form');
document.body.append(form);

const input = document.createElement('input');
input.type = 'number';
form.append(input);

const button = document.createElement('button');
button.textContent = '입력';
form.append(button);

const resultDiv = document.createElement('div');
document.body.append(resultDiv);

form.addEventListener('submit', e => {
  e.preventDefault();
  // string앞에 +를 붙여주면 number로 형변환이 된다.
  if (result === +input.value) {
    resultDiv.textContent = '정답😊';
    numberOne = Math.ceil(Math.random() * 9);
    numberTwo = Math.ceil(Math.random() * 9);
    result = numberOne * numberTwo;
    input.value = '';
    input.focus();
  } else {
    resultDiv.textContent = '틀렸어요😂';
    input.value = '';
    input.focus();
  }
});
