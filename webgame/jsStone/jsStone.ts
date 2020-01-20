interface Card {
  att: number;
  hp: number;
  mine: boolean;
  cost?: number; // number | undefined
  field?: boolean; // number | undefined
}

// 영웅 카드
class Hero implements Card {
  public att: number;
  public hp: number;
  public mine: boolean;
  public cost?: number;
  public field?: boolean;
  constructor(mine: boolean) {
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.mine = mine;
    this.field = true;
  }
}

// 일반 카드
class Sub implements Card {
  public att: number;
  public hp: number;
  public mine: boolean;
  public cost: number;
  public field?: boolean;
  constructor(mine: boolean) {
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);
    this.mine = mine;
    this.field = false;
  }
}

interface Player {
  hero: HTMLDivElement;
  deck: HTMLDivElement;
  field: HTMLDivElement;
  cost: HTMLDivElement;
  deckData: Sub[];
  heroData: Hero | null;
  fieldData: Sub[];
  chosenCard: HTMLDivElement | null;
  chosenCardData: Card | null;
}

// 상대편의 상태
const opponent: Player = {
  hero: document.getElementById('rival-hero') as HTMLDivElement,
  deck: document.getElementById('rival-deck') as HTMLDivElement,
  field: document.getElementById('rival-cards') as HTMLDivElement,
  cost: document.getElementById('rival-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

// 내 상태
const me: Player = {
  hero: document.getElementById('my-hero') as HTMLDivElement,
  deck: document.getElementById('my-deck') as HTMLDivElement,
  field: document.getElementById('my-cards') as HTMLDivElement,
  cost: document.getElementById('my-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

const turnButton = document.getElementById('turn-btn') as HTMLButtonElement;
let turn = true; // true면 내 턴, false면 상대 턴

// ***** FUNCTION *****************************************************************************

function initiate() {
  [opponent, me].forEach(item => {
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
function createDeck({ mine, count }: { mine: boolean; count: number }) {
  const player = mine ? me : opponent;

  for (let i = 0; i < count; i++) {
    player.deckData.push(new Sub(mine));
  }

  redrawDeck(player);
}

/**
 * 영웅 카드를 생성하는 함수
 * @param mine 내 영웅인지 상대편 영웅인지 선택
 */
function createHero({ mine }: { mine: boolean }) {
  const player = mine ? me : opponent;
  player.heroData = new Hero(mine);
  connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true });
}

interface CCDOM {
  data: Card;
  DOM: HTMLDivElement;
  hero?: boolean;
}

/**
 * DOM에 카드를 그려주는 함수
 * @param data 카드 데이터
 * @param DOM 카드를 그릴 위치
 * @param hero 영웅 카드인지 일반 카드인지 선택
 */
function connectCardDOM({ data, DOM, hero = false }: CCDOM) {
  // 미리 만들어 놓은 카드 샘플을 복사한다.
  const cardEl = document
    .querySelector('.card-hidden .card')!
    .cloneNode(true) as HTMLDivElement;
  cardEl.querySelector('.card-att')!.textContent = String(data.att);
  cardEl.querySelector('.card-hp')!.textContent = String(data.hp);

  if (hero) {
    (cardEl.querySelector('.card-cost') as HTMLDivElement).style.display =
      'none';
    const name = document.createElement('div');
    name.textContent = '영웅';
    cardEl.appendChild(name);
  } else {
    cardEl.querySelector('.card-cost')!.textContent = String(data.cost);
  }

  cardEl.addEventListener('click', ev => {
    // 일반 카드 & 내 턴 & 카드 덱에 있는 카드만 필드로 보낸다.
    // ! isSub() 함수 덕분에 data가 Sub 타입으로 바뀌었다.
    if (isSub(data) && data.mine === turn && !data.field) {
      // 카드를 하나 뽑았으면 덱에 카드를 한 장 보충해준다.
      if (!deckToField({ data })) {
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
function redrawScreen({ mine }: { mine: boolean }) {
  const player = mine ? me : opponent;
  redrawHero(player);
}

/**
 * 영웅 카드를 그리는 함수
 * @param target 내 영웅인지 상대편 영웅인지 선택
 */
function redrawHero(target: Player) {
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
function redrawDeck(target: Player) {
  target.deck.innerHTML = '';
  target.deckData.forEach(data => {
    connectCardDOM({ data, DOM: target.deck });
  });
}

/**
 * 해당 플레이어의 필드를 그린다.
 * @param target 나 or 상대편
 */
function redrawField(target: Player) {
  target.field.innerHTML = '';
  target.fieldData.forEach(data => {
    connectCardDOM({ data, DOM: target.field });
  });
}

/**
 * 영웅 카드인지 일반 카드인지 판별하는 함수
 * ! 타입 가드 : 넓은 범위를 좁혀준다.
 * ! Card 타입에서 Sub 타입으로 리턴된다.
 * @param data 카드
 */
function isSub(data: Card): data is Sub {
  return data.cost ? true : false;
}

/**
 * 덱에 있는 카드를 1장 뽑는 함수
 * @param data 카드 데이터
 */
function deckToField({ data }: { data: Sub }): boolean {
  const target = turn ? me : opponent;
  const currentCost = Number(target.cost.textContent);
  // 카드 코스트가 현재 남은 코스트보다 크다면 선택 불가
  if (currentCost < data.cost) {
    alert('코스트가 모자르다');
    return true;
  }

  data.field = true;
  const idx = target.deckData.indexOf(data);
  target.deckData.splice(idx, 1);
  target.fieldData.push(data);
  redrawDeck(target);
  redrawField(target);

  target.cost.textContent = String(currentCost - data.cost);

  return false;
}

// ***** START ****************************************************************************

initiate();
