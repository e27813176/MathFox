import { createAnimate } from '../../Game/utils';

export default class {
  constructor(game) {
    this.game = game;
    this.ball = game.add.sprite(0, 0, 'EnergyTransfer');
    this.ball.anchor.setTo(0.5, 0.5);
    this.ball.scale.setTo(0.8);
    this.ball.alpha = 0;
    createAnimate(this.ball, 'EnergyTransfer', 0, 19, 30, true);
  }
  Transfer(posY) {
    if (this.mode === 1) this.ball.position.setTo(1200, 270);
    else this.ball.position.setTo(1100, 155);
    this.ball.alpha = 1;
    return new Promise(resolve =>
      this.game.add.tween(this.ball).to({ x: 1470, y: 200 + posY }, 300, 'Quad.easeIn', true)
        .onComplete.add(resolve));
  }
}
