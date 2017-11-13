import { tweenShining, createAnimate, delay } from '../../Game/utils';

export default class {
  constructor(game) {
    this.game = game;
    this.BG = game.add.sprite(0, 0, 'ScoreBarAtlas', 'ScoreBarBG.png');
    this.BG.alpha = 0;

    this.Bar = game.add.sprite(0, 0, 'ScoreBarAtlas', 'EnergyBar.png');
    tweenShining(game, this.Bar);

    this.RedBar = game.add.sprite(0, 0, 'ScoreBarAtlas', 'EnergyBarRed.png');
    this.RedBar.alpha = 0;

    this.Top = game.add.sprite(0, 0, 'ScoreBarAtlas', 'ScoreBarTop.png');
    this.Top.alpha = 0;

    this.TopLight = game.add.sprite(0, 0, 'ScoreBarAtlas', 'ScoreBarTopLight.png');
    this.TopLight.alpha = 0;

    this.TopSuccessLight = game.add.sprite(0, 0, 'ScoreBarAtlas', 'ScoreBarTopLight.png');
    this.TopSuccessLight.alpha = 0;

    this.Mask = game.add.graphics();
    this.Mask.beginFill(0xffffff);
    this.Mask.drawRect(1430, 240, 100, 400);
    this.Bar.mask = this.Mask;
    this.RedBar.mask = this.Mask;

    this.WrongFx = game.add.sprite(0, 0, 'ScoreBarAtlas');
    createAnimate(this.WrongFx, 'ScoreBarWrongFx', 0, 15, 30, false);
    this.WrongFx.alpha = 0;

    this.RightFx = game.add.sprite(0, 0, 'ScoreBarAtlas');
    createAnimate(this.RightFx, 'ScoreBarRightFx', 0, 15, 30, false);
    this.RightFx.alpha = 0;
  }
  async ShowUp() {
    this.Bar.y = 200;
    this.RedBar.y = 200;
    this.game.add.tween(this.BG).to({ alpha: 1 }, 300, 'Quad.easeInOut', true);
    this.game.add.tween(this.Top).to({ alpha: 1 }, 300, 'Quad.easeInOut', true);
    this.game.add.tween(this.Bar).to({ alpha: 1 }, 300, 'Quad.easeInOut', true);
    await delay(300);
    this.Bar.tween.resume();
  }
  Clean() {
    this.game.add.tween(this.BG).to({ alpha: 0 }, 300, 'Quad.easeInOut', true);
    this.game.add.tween(this.Top).to({ alpha: 0 }, 300, 'Quad.easeInOut', true);
    this.game.add.tween(this.Bar).to({ alpha: 0 }, 300, 'Quad.easeInOut', true);
    this.game.add.tween(this.TopSuccessLight).to({ alpha: 0 }, 300, 'Quad.easeInOut', true);
    this.Bar.tween.pause();
  }
  BarInc(combo) {
    let amount = 10 * (1 + combo * 0.25);
    this.game.add.tween(this.Bar).to({ y: `-${amount}` }, 200, 'Linear', true);
    this.game.add.tween(this.RedBar).to({ y: `-${amount}` }, 200, 'Linear', true);

    this.TopLight.alpha = 1;
    this.game.add.tween(this.TopLight).to({ alpha: 0 }, 1000, 'Quad.easeOut', true);

    this.RightFx.alpha = 1;
    this.RightFx.animate.play()
      .onComplete.add(sprite => { sprite.alpha = 0 });

    if (this.Bar.y <= 58) return true;
  }
  BarDec() {
    this.game.add.tween(this.Bar).to({ y: '+50' }, 50, 'Linear', true);
    this.game.add.tween(this.RedBar).to({ y: '+50' }, 50, 'Linear', true);

    this.RedBar.alpha = 1;
    this.game.add.tween(this.RedBar).to({ alpha: 0 }, 700, 'Quad.easeOut', true);
    this.WrongFx.alpha = 1;
    this.WrongFx.animate.play();
  }
  updateBar(game) {
    if (this.Bar.y < 400) {
      this.Bar.y += 0.5;
      this.RedBar.y += 0.5;
    } else game.fail();
  }
}
