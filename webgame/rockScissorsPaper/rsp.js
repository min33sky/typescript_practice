"use strict";
var imgCoords = '0';
var point = 0;
var rsp = {
    ROCK: '0',
    SCISSORS: '-142px',
    PAPER: '-284px'
};
var score = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1
};
function computerChoice(imgCoords) {
    // Object.keys()의 리턴값은 string[]으로 넓은 범위이기 때문에 좁은 범위로 변경해줘야 한다.
    // find()는 ES6 문법이므로 tsconfig에 추가를 해주자.
    // Array.find()의 리턴값은 undefined가 나올 수 있으므로 에러 발생
    // undefined가 안나온다고 확신하면 !를 붙여 해결가능
    return Object.keys(rsp).find(function (key) { return rsp[key] === imgCoords; });
}
var interval;
function intervalMaker() {
    interval = setInterval(function () {
        if (imgCoords === rsp.ROCK) {
            imgCoords = rsp.SCISSORS;
        }
        else if (imgCoords === rsp.SCISSORS) {
            imgCoords = rsp.PAPER;
        }
        else {
            imgCoords = rsp.ROCK;
        }
        if (document.querySelector('#computer')) {
            document.querySelector('#computer').style.background = "url(https://en.pimg.jp/023/182/267/1/23182267.jpg)  " + imgCoords + " 0";
        }
    }, 100);
}
intervalMaker();
document.querySelectorAll('.btn').forEach(function (btn) {
    // this를 사용할 땐 첫 번째 매개변수에 this 타입을 적는다.
    btn.addEventListener('click', function (e) {
        clearInterval(interval);
        setTimeout(intervalMaker, 1000);
        var myChoice = this.textContent;
        var myScore = score[myChoice];
        var computerScore = score[computerChoice(imgCoords)];
        var diff = myScore - computerScore;
        if (diff === 0) {
            console.log('비겼다');
        }
        else if ([2, -1].includes(diff)) {
            point++;
            console.log('이겼다.');
        }
        else {
            point--;
            console.log('졌다');
        }
        document.querySelector('#point').textContent = String(point);
    });
});
