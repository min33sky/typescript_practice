export interface Card {
  att: number;
  hp: number;
  mine: boolean;
  cost?: number; // number | undefined
  field?: boolean; // number | undefined
}

export interface Player {
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
