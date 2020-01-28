"use strict";
var horizontal = 4;
var vertical = 3;
var colors = [
    'red',
    'red',
    'orange',
    'orange',
    'green',
    'green',
    'yellow',
    'yellow',
    'white',
    'white',
    'pink',
    'pink',
];
var colorCandidate = colors.slice(); // 색을 섞기 위한 사본 배열
var color = []; // 섞인 배열
var clickFlag = true; // 클릭 가능한 카드인가?
var clickCard = []; // 클릭한 카드 DOM을 담을 배열
var completedCard = []; // 짝이 맞는 카드 DOM을 담을 배열
var startTime = null; // 시간 측정용
function shuffle() {
    while (colorCandidate.length > 0) {
        color = color.concat(colorCandidate.splice(Math.floor(Math.random() * colorCandidate.length), 1));
    }
}
function setCard(horizontal, vertical) {
    clickFlag = false;
    for (var i = 0; i < horizontal * vertical; i++) {
        var card = document.createElement('div');
        card.className = 'card';
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        card.addEventListener('click', function () {
            if (clickFlag && !completedCard.includes(this)) {
                this.classList.toggle('flipped');
                clickCard.push(this);
                if (clickCard.length === 2) {
                    var firstBackground = clickCard[0].querySelector('.card-back').style.backgroundColor;
                    var secondBackground = clickCard[1].querySelector('.card-back').style.backgroundColor;
                    if (firstBackground === secondBackground) {
                        completedCard.push(clickCard[0]);
                        completedCard.push(clickCard[1]);
                        clickCard = [];
                        // 모든 카드가 뒤집혔을 경우
                        if (completedCard.length === horizontal * vertical) {
                            var endTime = new Date().getTime();
                            alert("\uCD95\uD558\uD569\uB2C8\uB2E4! " + (endTime - startTime.getTime()) /
                                1000 + "\uCD08 \uAC78\uB838\uC2B5\uB2C8\uB2E4.");
                            // 초기화
                            document.querySelector('#wrapper').innerHTML =
                                '';
                            colorCandidate = colors.slice();
                            color = [];
                            completedCard = [];
                            startTime = null;
                            shuffle();
                            setCard(horizontal, vertical);
                        }
                    }
                    else {
                        clickFlag = false;
                        setTimeout(function () {
                            // clickCard[0].classList.remove('flipped');
                            // clickCard[1].classList.remove('flipped');
                            clickCard[0].classList.toggle('flipped');
                            clickCard[1].classList.toggle('flipped');
                            clickFlag = true;
                            clickCard = [];
                        }, 1000);
                    }
                }
            }
        });
        document.querySelector('#wrapper').appendChild(card);
    }
    // Array.prototype.forEach.call<HTMLCollectionOf<Element>, [(card: HTMLDivElement, index: number) => void], void>(document.getElementsByClassName('card'), (card, index) => {})
    // 게임 시작 시 모든 카드 뒷면을 보여주기
    document.querySelectorAll('.card').forEach(function (card, index) {
        setTimeout(function () {
            card.classList.add('flipped');
        }, 1000 + 100 * index);
    });
    // 보여준 카드들을 다시 뒤집기
    setTimeout(function () {
        document.querySelectorAll('.card').forEach(function (card, index) {
            card.classList.remove('flipped');
            clickFlag = true;
            startTime = new Date();
        });
    }, 5000);
}
// ************************************************************************************** //
shuffle();
setCard(horizontal, vertical);
