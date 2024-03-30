// dependencies
import 'phaser';
import './style.css'

// scenes
import { BootScene }      from './scenes/BootScene';
import { PreloaderScene } from './scenes/PreloaderScene';

import { GameConfig } from './config'

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    // scenes
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);

    // start
    this.scene.start('Boot');
  }
}

window.addEventListener('load', () => {
  (window as any)._game = new Game(GameConfig);
});
