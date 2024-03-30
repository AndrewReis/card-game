import 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', '/assets/basicBack.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
