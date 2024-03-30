import { ALIGN, GAME_WIDTH } from '../config';
import { State } from '../fake'

export class Board {
  private scene: Phaser.Scene;
  private state: State;
  private textEnergy: Phaser.GameObjects.Text | null;

  constructor(scene: Phaser.Scene, state: State) {
    this.scene      = scene;
    this.state      = state;
    this.textEnergy = null;
  }

  public drawPlayerActions() {
    return this.scene.add.text(ALIGN.right - 120, ALIGN.centerY - 50, 'Próximo Turno',  { font: '26px Arial' })
      .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
      .setInteractive();
  }

  public drawEnergyZone(energy: number) {
    if (!this.textEnergy) {
      this.textEnergy = this.scene.add.text(ALIGN.centerX, ALIGN.top , String(energy),  { font: '64px Arial' })
        .setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
      return;
    }
    
    this.textEnergy.setText(String(energy))
  }

  public drawArena() {
    // const arena = this.scene.add.image(ALIGN.centerX, ALIGN.centerY, this.state.arena.id);

    let arenaZoneOutline = this.scene.add.graphics();

    arenaZoneOutline.lineStyle(4, 0xff69b4);

    arenaZoneOutline.strokeRect(
      ALIGN.centerX - 100, 
      ALIGN.centerY - 170, 
      200, 
      250
    );
  }

  public drawPlayerHandZone() {
    this.scene.add.rectangle(ALIGN.centerX, ALIGN.bottom - 10, GAME_WIDTH - 40, 215).setStrokeStyle(2, 0x00ffff);

    let countCardPlayer = 0;

    for (const playerCard of this.state.playerHand) {
      const sprite = this.scene.add.sprite(ALIGN.left + (countCardPlayer * 100) + 40, ALIGN.bottom - 10, playerCard.id).setScale(0.25).setName(playerCard.id)
      sprite.setInteractive({ draggable: true });

      countCardPlayer++;
    }
  }

  public drawPlayerDropZone() {
    // opponent
    this.scene.add.rectangle(ALIGN.centerX, ALIGN.centerY - 280, GAME_WIDTH, 140).setStrokeStyle(1, 0xff69b4);

    let dropZone        = this.scene.add.zone(ALIGN.centerX, ALIGN.bottom - 190, GAME_WIDTH, 140).setRectangleDropZone(GAME_WIDTH, 140);
    let dropZoneOutline = this.scene.add.graphics();

    dropZoneOutline.lineStyle(1, 0xff69b4);

    dropZoneOutline.strokeRect(
      dropZone.x - dropZone.input.hitArea.width / 2, 
      dropZone.y - dropZone.input.hitArea.height / 2, 
      dropZone.input.hitArea.width, 
      dropZone.input.hitArea.height
    );

    dropZone.setData("outline", dropZoneOutline);
  }
}