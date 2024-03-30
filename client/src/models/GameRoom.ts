import { WSConnection } from './WSConnection';

export class GameRoom {
  private wsConnection: WSConnection;


  constructor(ws: WSConnection) {
    this.wsConnection = ws;
  }

  public initGame() {
    //
  }

  public handlesPlayersDroppedCard(gameObject: Phaser.GameObjects.Sprite) {
    const state = this.wsConnection.getState();
    if (state.playerCardsDropped.length < 4) {      
      this.wsConnection.playerDroppedCardAction(gameObject);

      gameObject.setX((150 * state.playerCardsDropped.length) - 60);
      gameObject.setY(670);
      return;
    }
    console.log('ZONA CHEIA!');
  }

  public handlesFinishedTurn() {
    console.log('terminei meu turno')
    this.wsConnection.finishedTurnAction();
  }

  public sumPlayerCardsPowerDropped() {
    const state = this.wsConnection.getState();

    const sumPowers = state.playerCardsDropped.map(card => card.power).reduce((acc, current) => {
      const total = acc + current
      return total
    }, 0);

    console.log(sumPowers)
  }
}