import { createAnimate, setBtnEnable } from '../../Game/utils';

export default class {
  constructor(game, SharpenBar) {
    this.game = game;
    this.foxstatus = 0;
    this.fox = [
      game.add.sprite(-10, 0, 'FoxBounce001'),
      game.add.sprite(-10, 0, 'FoxBounce002'),
      game.add.sprite(-10, 0, 'FoxLogging001'),
      game.add.sprite(-10, 0, 'FoxLogging002'),
      game.add.sprite(-10, 0, 'FoxLogging003'),
      game.add.sprite(-10, 0, 'FoxStanding')
    ]

    createAnimate(this.fox[0], 'FoxBounce', 100, 128, 20, false);
    createAnimate(this.fox[1], 'FoxBounce', 120, 128, 20, false);
    createAnimate(this.fox[2], 'FoxLogging', 0, 28, 35, false);
    createAnimate(this.fox[3], 'FoxLogging', 29, 45, 35, false);
    createAnimate(this.fox[4], 'FoxLogging', 46, 71, 35, false);
    createAnimate(this.fox[5], 'FoxStanding', 78, 99, 25, true);

    this.fox.forEach(obj => { obj.alpha = 0 });
    this.foxStartBtn = game.add.graphics()
    this.foxStartBtn.beginFill(0x000000)
    this.foxStartBtn.drawRect(600, 370, 180, 400)
    this.foxStartBtn.alpha = 0;

    this.foxStopBtn = game.add.graphics()
    this.foxStopBtn.beginFill(0x000000)
    this.foxStopBtn.drawRect(600, 370, 180, 400)
    this.foxStopBtn.alpha = 0;

    this.foxStartBtn.events.onInputDown.add(game.StartLogging, game);
    this.foxStopBtn.events.onInputDown.add(game.StopLogging, game);
  }
  SetStatus(key) {
    this.foxstatus = key;
  }
  Standing() {
    setBtnEnable(this.foxStartBtn, true);
    setBtnEnable(this.foxStopBtn, false);
    this.fox.forEach((sprite, i) => {
      if (i === 5) {
        sprite.animate.play();
        sprite.alpha = 1;
      } else {
        sprite.animate.stop();
        sprite.alpha = 0;
      }
    })
    this.fox[5].animate.play();
  }
  Logging() {
    setBtnEnable(this.foxStartBtn, false);
    setBtnEnable(this.foxStopBtn, true);
    this.fox[5].alpha = 0;
    this.fox[5].animate.stop();
    if (this.foxstatus === 0) return this.Cut();
    else return this.Bounce();
  }
  async Cut() {
    await Animate(this.fox[2]);
    this.fox[2].alpha = 0;
    await Animate(this.fox[3]);
    this.fox[3].alpha = 0;
    await Animate(this.fox[4]);
    this.fox[4].alpha = 0;
    if (this.foxstatus === 0) return this.Cut();
    else {
      this.game.NeedSharpeningText.tween.resume();
      this.game.NeedSharpeningText.alpha = 1;
      return this.Bounce();
    }
  }
  async Bounce() {
    await Animate(this.fox[0]);
    this.fox[0].alpha = 0;
    await Animate(this.fox[1]);
    this.fox[1].alpha = 0;
    return this.Bounce();
  }
}

const Animate = fox => {
  fox.alpha = 1;
  return new Promise(resolve =>
    fox.animate.play()
      .onComplete.add(resolve)
  )
}
