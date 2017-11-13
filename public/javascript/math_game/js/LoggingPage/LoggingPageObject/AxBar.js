import { tweenAlpha, tweenShining } from '../../Game/utils';

export default class {
  constructor(game, param1, param2) {
    this.BG = game.add.sprite(100, 0, 'AxBar', 'AxBarBG.png');
    this.BG.alpha = 0;
    this.SharpenBar = [
      game.add.sprite(param1, 0, 'AxBar', 'AxBarSharp.png'),
      game.add.sprite(param2, 0, 'AxBar', 'AxBarSharpLevel2.png')
    ];

    this.mask = game.add.graphics();
    this.mask.beginFill(0xffffff);
    this.mask.drawRect(250, 70, 350, 50);

    this.SharpenBar.forEach(bar => {
      tweenShining(game, bar);
      bar.mask = this.mask;
    });

    this.BarFrame = game.add.sprite(100, 0, 'AxBar', 'AxBar.png');
    this.Light = game.add.sprite(100, 0, 'AxBar', 'AxBarLight.png');
    this.FullLight = game.add.sprite(100, 0, 'AxBar', 'AxBarLight.png');
    tweenShining(game, this.FullLight);
    this.BarFrame.alpha = 0;
    this.Light.alpha = 0;
    this.FullLight.alpha = 0;
  }
  Clean(game) {
    this.SharpenBar.forEach(bar => {
      bar.tween.pause();
      tweenAlpha(game, bar, 0);
    });
    tweenAlpha(game, this.BG, 0);
    tweenAlpha(game, this.BarFrame, 0);
    tweenAlpha(game, this.Light, 0);
    tweenAlpha(game, this.FullLight, 0);
    this.FullLight.tween.pause();
  }
  ShowUp(game) {
    tweenAlpha(game, this.BG, 1);
    tweenAlpha(game, this.BarFrame, 1);
    if (this.SharpenBar[1].x > -243) {
      tweenAlpha(game, this.SharpenBar[1], 1);
      this.SharpenBar[1].tween.resume();
    }
    tweenAlpha(game, this.SharpenBar[0], 1);
    this.SharpenBar[0].tween.resume();
  }
  AxAttck() {
    if (this.AxBarSharp[0].x <= -243 && this.TreeBlood[0].x > -364) {
      this.minusTreeBlood(-20);
    } else if (this.AxBarSharp[0].x > -243) {
      this.minusTreeBlood(-20);
    }
  }
  BarDec(game, UnSharpen) {
    let Bar1 = this.SharpenBar[0];
    let Bar2 = this.SharpenBar[1];
    if (Bar2.x <= -243 && Bar1.x > -243) Bar1.x -= UnSharpen;
    else if (Bar2.x > -243) Bar2.x -= UnSharpen;
    return Bar1.x;
  }
}
