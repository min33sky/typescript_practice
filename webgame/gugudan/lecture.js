var numberOne = Math.ceil(Math.random() * 9);
var numberTwo = Math.ceil(Math.random() * 9);
var result = numberOne * numberTwo;
var string = 'hello';
var boolean = false;
var word = document.createElement('div');
word.textContent = numberOne + " X " + numberTwo + " = ?";
document.body.append(word);
var form = document.createElement('form');
document.body.append(form);
var input = document.createElement('input');
input.type = 'number';
form.append(input);
var button = document.createElement('button');
button.textContent = '입력';
form.append(button);
var resultDiv = document.createElement('div');
document.body.append(resultDiv);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    // string앞에 +를 붙여주면 number로 형변환이 된다.
    if (result === +input.value) {
        resultDiv.textContent = '정답😊';
        numberOne = Math.ceil(Math.random() * 9);
        numberTwo = Math.ceil(Math.random() * 9);
        result = numberOne * numberTwo;
        input.value = '';
        input.focus();
    }
    else {
        resultDiv.textContent = '틀렸어요😂';
        input.value = '';
        input.focus();
    }
});
