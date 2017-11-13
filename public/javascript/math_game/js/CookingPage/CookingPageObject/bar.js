import { centerX } from '../../Game/centerPos';

export default class {
  constructor(game) {
    this.game = game;
    let style = { font: '22px Arial bold', fill: '#ffffff', align: 'center' };

    this.bar = {
      textBurned: game.add.text(centerX - 215, 395, '焦度', style),
      textComplete: game.add.text(centerX - 215, 430, '熟度', style)
    }

    this.bar.Barframe = game.add.graphics();
    this.bar.Barframe.lineStyle(2, 0xffffff, 1);
    this.bar.Barframe.beginFill(0x3a2020);
    this.bar.Barframe.drawRoundedRect(centerX - 155, 395, 310, 25, 8);
    this.bar.Barframe.drawRoundedRect(centerX - 155, 430, 310, 25, 8);

    this.bar.burnedBar = game.add.graphics();
    this.bar.burnedBar.beginFill(0xff3030);
    this.bar.burnedBar.drawRect(centerX - 150, 400, 300, 15);

    this.bar.CompleteBar = game.add.graphics();
    this.bar.CompleteBar.beginFill(0xff6060);
    this.bar.CompleteBar.drawRect(centerX - 150, 435, 300, 15);

    this.mask = game.add.graphics();
    this.mask.beginFill(0xf06060);
    this.mask.drawRoundedRect(centerX - 150, 400, 300, 15, 5);

    this.bar.burnedBar.mask = this.mask;

    this.mask.drawRoundedRect(centerX - 150, 435, 300, 15, 5);

    this.bar.CompleteBar.mask = this.mask;

    for (let obj in this.bar) {
      this.bar[obj].alpha = 0;
    }

    this.initBar();
  }
  initBar() {
    this.bar.CompleteBar.x = -300;
    this.bar.burnedBar.x = -300;
  }
  setBarAlpha(alpha) {
    for (let obj in this.bar) {
      this.game.add.tween(this.bar[obj]).to({ alpha: alpha }, 500, 'Linear', true, 0)
    }
  }
  barUpdate() {
    if (this.bar.burnedBar.x < 0 && this.game.Fox.Fox[1].animate.isPlaying === false) {
      this.bar.burnedBar.x += 1.5;
    } else if (this.bar.burnedBar.x >= 0 && this.game.Fox.Fox[7].animate.isPlaying === false) {
      this.game.failCooking();
    }
    if (this.bar.CompleteBar.x < 0) {
      this.bar.CompleteBar.x += 0.2;
    } else if (this.bar.CompleteBar.x >= 0 && this.game.Fox.Fox[1].animate.isPlaying === false) {
      this.game.finishCooking();
    }
  }
}
