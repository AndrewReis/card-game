import 'phaser';
import { responsiveScreenHelper } from '../helpers/responsive-helper';

import { GameRoom } from '../models/GameRoom';
import { Board } from '../models/Board';
import { WSConnection } from '../models/WSConnection';


export class PreloaderScene extends Phaser.Scene {
  private gameRoom: GameRoom;
  private board: Board;
  private wsConnection: WSConnection;

  constructor() {
    super('Preloader');
    this.wsConnection = new WSConnection();
    this.gameRoom     = new GameRoom(this.wsConnection);
    this.board        = new Board(this, this.wsConnection.getState());
  }

  preload() {
    const gameState = this.wsConnection.getState();

    this.load.image(gameState.arena.id, gameState.arena.imagePath);

    for (const card of gameState.cards) {
      this.load.image(card.id, card.sprite);     
    }
    
    responsiveScreenHelper(this);
  }
  
  create() {
    const gameState = this.wsConnection.getState();

    this.board.drawArena();
    this.board.drawPlayerHandZone();
    this.board.drawPlayerDropZone();

    this.board.drawEnergyZone(gameState.energy);

    const buttonNextTurn = this.board.drawPlayerActions();

    this.input.on('drag', (pointer: any, gameObject: Phaser.GameObjects.Sprite, dragX: number, dragY: number) => {
      gameObject.setPosition(dragX, dragY)
      gameObject.setScale(0.175)
    });

    this.input.on('dragend', (pointer: any, gameObject: Phaser.GameObjects.Sprite, dropped: boolean) => {
      if (dropped) {
        this.gameRoom.handlesPlayersDroppedCard(gameObject);
      } else {
        gameObject.setScale(0.25)
      }
    });

    buttonNextTurn.on('pointerdown', () => {
      this.gameRoom.handlesFinishedTurn();
      this.board.drawEnergyZone(gameState.energy);
    });
  }
}
