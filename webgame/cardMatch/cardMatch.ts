const horizontal: number = 4;
const vertical: number = 3;
const colors: string[] = [
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

let colorCandidate: string[] = colors.slice(); // 색을 섞기 위한 사본 배열
let color: string[] = []; // 섞인 배열
let clickFlag: boolean = true; // 클릭 가능한 카드인가?
let clickCard: HTMLDivElement[] = []; // 클릭한 카드 DOM을 담을 배열
let completedCard: HTMLDivElement[] = []; // 짝이 맞는 카드 DOM을 담을 배열
let startTime: Date | null = null; // 시간 측정용

function shuffle(): void {
  while (colorCandidate.length > 0) {
    color = color.concat(
      colorCandidate.splice(
        Math.floor(Math.random() * colorCandidate.length),
        1,
      ),
    );
  }
}

function setCard(horizontal: number, vertical: number): void {
  clickFlag = false;

  for (let i: number = 0; i < horizontal * vertical; i++) {
    const card: HTMLDivElement = document.createElement('div');
    card.className = 'card';
    const cardInner: HTMLDivElement = document.createElement('div');
    cardInner.className = 'card-inner';
    const cardFront: HTMLDivElement = document.createElement('div');
    cardFront.className = 'card-front';
    const cardBack: HTMLDivElement = document.createElement('div');
    cardBack.className = 'card-back';

    cardBack.style.backgroundColor = color[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', function(this: HTMLDivElement) {
      if (clickFlag && !completedCard.includes(this)) {
        this.classList.toggle('flipped');
        clickCard.push(this);
        if (clickCard.length === 2) {
          const firstBackground: string = (clickCard[0].querySelector(
            '.card-back',
          ) as HTMLDivElement).style.backgroundColor;
          const secondBackground: string = (clickCard[1].querySelector(
            '.card-back',
          ) as HTMLDivElement).style.backgroundColor;

          if (firstBackground === secondBackground) {
            completedCard.push(clickCard[0]);
            completedCard.push(clickCard[1]);
            clickCard = [];

            // 모든 카드가 뒤집혔을 경우
            if (completedCard.length === horizontal * vertical) {
              const endTime: number = new Date().getTime();
              alert(
                `축하합니다! ${(endTime - startTime!.getTime()) /
                  1000}초 걸렸습니다.`,
              );
              // 초기화
              (document.querySelector('#wrapper') as HTMLDivElement).innerHTML =
                '';
              colorCandidate = colors.slice();
              color = [];
              completedCard = [];
              startTime = null;
              shuffle();
              setCard(horizontal, vertical);
            }
          } else {
            clickFlag = false;
            setTimeout(() => {
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
    (document.querySelector('#wrapper') as HTMLDivElement).appendChild(card);
  }

  // Array.prototype.forEach.call<HTMLCollectionOf<Element>, [(card: HTMLDivElement, index: number) => void], void>(document.getElementsByClassName('card'), (card, index) => {})

  // 게임 시작 시 모든 카드 뒷면을 보여주기
  document.querySelectorAll('.card').forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  // 보여준 카드들을 다시 뒤집기
  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card, index) => {
      card.classList.remove('flipped');
      clickFlag = true;
      startTime = new Date();
    });
  }, 5000);
}

// ************************************************************************************** //

shuffle();

setCard(horizontal, vertical);
