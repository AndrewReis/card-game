import { STATE, State } from '../fake'

export class WSConnection {
  private state: State;

  constructor() {
    this.state = STATE;
  }

  public playerDroppedCardAction(gameObject: Phaser.GameObjects.Sprite) {
    // emit for server card id and playerId

    const cardIndex = this.state.playerHand.findIndex(card => card.id === gameObject.name);
    
    if (cardIndex !== -1) {
      this.state.playerCardsDropped.push(this.state.playerHand[cardIndex]);
      this.state.playerHand.splice(cardIndex, 1)
    }

    console.log(this.state.playerCardsDropped);
  }

  public finishedTurnAction() {
    // emit to server
    this.state.playerFinishedTurn = true;

    if (this.state.playerFinishedTurn && this.state.opponentFinishedTurn) {
      console.log('NEXT TURN')
      console.log('ADD ENERGY TO PLAYERS')

      this.state.energy++;
    }
  }

  public getState() {
    return this.state;
  }
}