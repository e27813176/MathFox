import { createAnimate } from '../../Game/utils';

export default class {
  constructor(game) {
    this.flyingBug = game.add.sprite(0, 0, 'FlyingBug');
    createAnimate(this.flyingBug, 'FlyingBug', 0, 39, 30, false);
    this.CircleWave = game.add.sprite(0, 0, 'TutorialText');
    createAnimate(this.CircleWave, 'CircleWave', 0, 28, 30, false);
    this.CircleWave.alpha = 0;
    this.mode = 0;
  }
  SetMode(mode) {
    this.mode = mode;
  }
  ShowUp() {
    let time = Math.floor(Math.random() * 4) * 1000 + 4000;
    this.delay = setTimeout(() => this.FlyingBugShowUp(), time);
  }
  FlyingBugShowUp() {
    this.flyingBug.alpha = 1;
    this.flyingBug.animate.play();
    if (this.mode === 1) {
      this.CircleWave.alpha = 1;
      this.CircleWave.animate.play();
    }
    this.ShowUp();
  }
  Stop() {
    clearTimeout(this.delay);
  }
}
