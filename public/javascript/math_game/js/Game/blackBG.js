import { tweenAlpha } from './utils'

export default class {
  constructor(game) {
    this.game = game;
    this.BG = game.add.graphics();
    this.BG.beginFill(0x000000);
    this.BG.drawRect(0, 0, 1600, 1000);
    this.BG.events.onInputDown.add(this.block, this);
    this.BG.inputEnabled = true;
  }
  block() { }
  opening() {
    return new Promise(resolve => {
      tweenAlpha(this.game, this.BG, 0, 1000)
        .onComplete.add(resolve);
    })
  }
  clean() {
    this.BG.scale.setTo(0);
  }
  closing(duration = 1000) {
    this.BG.scale.setTo(1);
    return new Promise(resolve => {
      tweenAlpha(this.game, this.BG, 1, duration)
        .onComplete.add(resolve);
    })
  }
}
