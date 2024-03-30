import 'phaser';

interface ButtonProps {
  x: number;
  y: number;
  text: string;
}

export class Button extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, {x, y, text}: ButtonProps) {
    super(scene);

    this.scene = scene;
    this.x = x;
    this.y = y;

    const style = {
      'background-color': 'red',
      'width': '200px',
      'height': '50px'
    }

    const button = this.scene.add.dom(0, 0, 'button', style, text).setInteractive();

    this.add(button);

    button.on('pointerdown', () => {
      console.log('pointer down!');
    });

    // button.on('pointerover', () => {
    //   console.log('pointer over!');
    // });

    // button.on('pointerout', () => {
    //   console.log('pointer out!');
    // });

    this.scene.add.existing(this);
  }
}
