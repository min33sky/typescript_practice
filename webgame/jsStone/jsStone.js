"use strict";
// 영웅 카드
var Hero = /** @class */ (function () {
    function Hero(mine) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.mine = mine;
        this.field = true;
    }
    return Hero;
}());
// 일반 카드
var Sub = /** @class */ (function () {
    function Sub(mine) {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
        this.mine = mine;
        this.field = false;
    }
    return Sub;
}());
// 상대편의 상태
var opponent = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
// 내 상태
var me = {
    hero: document.getElementById('my-hero'),
    deck: document.getElementById('my-deck'),
    field: document.getElementById('my-cards'),
    cost: document.getElementById('my-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var turnButton = document.getElementById('turn-btn');
var turn = true; // true면 내 턴, false면 상대 턴
// ***** FUNCTION *****************************************************************************
function initiate() {
    [opponent, me].forEach(function (item) {
        item.deckData = [];
        item.heroData = null;
        item.fieldData = [];
        item.chosenCard = null;
        item.chosenCardData = null;
    });
    createDeck({ mine: true, count: 5 });
    createDeck({ mine: false, count: 5 });
    createHero({ mine: false });
    createHero({ mine: true });
    redrawScreen({ mine: false });
    redrawScreen({ mine: true });
}
/**
 * 카드 덱을 생성하는 함수
 * @param mine 내 카드인지 상대카드인지 선택
 * @param count 생성 할 카드 수
 */
function createDeck(_a) {
    var mine = _a.mine, count = _a.count;
    var player = mine ? me : opponent;
    for (var i = 0; i < count; i++) {
        player.deckData.push(new Sub(mine));
    }
    redrawDeck(player);
}
/**
 * 영웅 카드를 생성하는 함수
 * @param mine 내 영웅인지 상대편 영웅인지 선택
 */
function createHero(_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    player.heroData = new Hero(mine);
    connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true });
}
/**
 * DOM에 카드를 그려주는 함수
 * @param data 카드 데이터
 * @param DOM 카드를 그릴 위치
 * @param hero 영웅 카드인지 일반 카드인지 선택
 */
function connectCardDOM(_a) {
    var data = _a.data, DOM = _a.DOM, _b = _a.hero, hero = _b === void 0 ? false : _b;
    // 미리 만들어 놓은 카드 샘플을 복사한다.
    var cardEl = document
        .querySelector('.card-hidden .card')
        .cloneNode(true);
    cardEl.querySelector('.card-att').textContent = String(data.att);
    cardEl.querySelector('.card-hp').textContent = String(data.hp);
    if (hero) {
        cardEl.querySelector('.card-cost').style.display =
            'none';
        var name_1 = document.createElement('div');
        name_1.textContent = '영웅';
        cardEl.appendChild(name_1);
    }
    else {
        cardEl.querySelector('.card-cost').textContent = String(data.cost);
    }
    cardEl.addEventListener('click', function (ev) {
        // 일반 카드 & 내 턴 & 카드 덱에 있는 카드만 필드로 보낸다.
        // ! isSub() 함수 덕분에 data가 Sub 타입으로 바뀌었다.
        if (isSub(data) && data.mine === turn && !data.field) {
            // 카드를 하나 뽑았으면 덱에 카드를 한 장 보충해준다.
            if (!deckToField({ data: data })) {
                createDeck({ mine: turn, count: 1 });
            }
        }
    });
    DOM.appendChild(cardEl);
}
/**
 * 화면에 카드 그리기
 * @param mine 내 영웅인지 상대편 영웅인지 선택
 */
function redrawScreen(_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    redrawHero(player);
}
/**
 * 영웅 카드를 그리는 함수
 * @param target 내 영웅인지 상대편 영웅인지 선택
 */
function redrawHero(target) {
    if (!target.heroData) {
        throw new Error('heroData가 없다.');
    }
    target.hero.innerHTML = '';
    connectCardDOM({ data: target.heroData, DOM: target.hero, hero: true });
}
/**
 * 해당 플레이어의 카드 덱을 그린다.
 * @param target 나 or 상대편
 */
function redrawDeck(target) {
    target.deck.innerHTML = '';
    target.deckData.forEach(function (data) {
        connectCardDOM({ data: data, DOM: target.deck });
    });
}
/**
 * 해당 플레이어의 필드를 그린다.
 * @param target 나 or 상대편
 */
function redrawField(target) {
    target.field.innerHTML = '';
    target.fieldData.forEach(function (data) {
        connectCardDOM({ data: data, DOM: target.field });
    });
}
/**
 * 영웅 카드인지 일반 카드인지 판별하는 함수
 * ! 타입 가드 : 넓은 범위를 좁혀준다.
 * ! Card 타입에서 Sub 타입으로 리턴된다.
 * @param data 카드
 */
function isSub(data) {
    return data.cost ? true : false;
}
/**
 * 덱에 있는 카드를 1장 뽑는 함수
 * @param data 카드 데이터
 */
function deckToField(_a) {
    var data = _a.data;
    var target = turn ? me : opponent;
    var currentCost = Number(target.cost.textContent);
    // 카드 코스트가 현재 남은 코스트보다 크다면 선택 불가
    if (currentCost < data.cost) {
        alert('코스트가 모자르다');
        return true;
    }
    data.field = true;
    var idx = target.deckData.indexOf(data);
    target.deckData.splice(idx, 1);
    target.fieldData.push(data);
    redrawDeck(target);
    redrawField(target);
    target.cost.textContent = String(currentCost - data.cost);
    return false;
}
// ***** START ****************************************************************************
initiate();
