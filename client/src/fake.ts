type Card = {
  id: string;
  sprite: string;
  name: string;
  power: number;
  cost: number;
}

type Arena = {
  id: string;
  name: string;
  description: string;
  imagePath: string;
}

export type State = {
  cards: Card[];
  playerHand: Card[];
  playerDeck: Card[];
  opponentDeck: Card[];
  opponentHand: Card[];
  energy: number;
  playerFinishedTurn: boolean;
  opponentFinishedTurn: boolean;
  arena: Arena;
  playerCardsDropped: Card[];
}

const cards: Card[] = [];

for (let index = 0; index < 20; index++) {
  cards.push(  {
    id: `id-${index}`,
    sprite: `assets/card0${ Math.floor(Math.random() * (7 - 1) + 1)}.png`,
    name: 'Card ' + index,
    power: Math.floor(Math.random() * (10 - 1) + 1),
    cost: Math.floor(Math.random() * (6 - 1) + 1)
  });
}

const playerDeck   = cards.slice(0, 10).toSorted();
const opponentDeck = cards.slice(10, 20).toSorted();

const playerHand: Card[] = [];

for (let index = 0; index < 5; index++) {
  const card = playerDeck.shift();

  if (card) playerHand.push(card);
}

const opponentHand: Card[] = [];

for (let index = 0; index < 3; index++) {
  const card = opponentDeck.shift();

  if (card) opponentHand.push(card);
}

const arena: Arena = {
  id: '1',
  name: 'Limbo',
  description: 'Nada acontece',
  imagePath: 'assets/arena1.png'
}

export const STATE:State = {
  cards,
  playerHand,
  playerDeck,
  opponentDeck,
  opponentHand,
  energy: 1,
  playerFinishedTurn: false,
  opponentFinishedTurn: true,
  arena,
  playerCardsDropped: []
}