import { centerX, centerY } from '../../Game/centerPos';
import { createAnimate } from '../../Game/utils';

export class FishBox {
  constructor(game) {
    this.game = game;
    this.FishBox = FishList.map(fish => {
      let fishbox = game.add.sprite(centerX, centerY, 'GetFishBoard', `${fish}Box.png`);
      fishbox.anchor.setTo(0.5);
      fishbox.alpha = 0;
      return fishbox;
    });

    this.Highlight = game.add.sprite(centerX, centerY, 'GetFishBoard');
    this.Highlight.anchor.setTo(0.5);
    this.Highlight.alpha = 0;
    createAnimate(this.Highlight, 'FishBoxHighlight', 0, 20, 30, true);
  }
  ShowUp(index) {
    this.game.add.tween(this.FishBox[index]).to({ alpha: 1 }, 500, 'Quad.easeOut', true);
    this.game.add.tween(this.Highlight).to({ alpha: 1 }, 500, 'Quad.easeOut', true);
    this.Highlight.animate.play();
  }
  Hide() {
    this.FishBox.forEach(fishbox =>
      this.game.add.tween(fishbox).to({ alpha: 0 }, 250, 'Quad.easeOut', true, 0)
    );
    this.game.add.tween(this.Highlight).to({ alpha: 0 }, 250, 'Quad.easeOut', true, 0);
    this.Highlight.animate.stop();
  }
}

export const FishList = [
  'OrangeFish',
  'FireFish',
  'ElectricFish',
  'IceFish',
  'WifiFish',
  'MedicineFish',
  'GlowBlueFish'
];

export const fishRandom = () => {
  let rand = Math.floor(Math.random() * 30);
  if (rand === 0) return 6;
  else if (rand >= 1 && rand <= 5) return 5;
  else if (rand >= 6 && rand <= 10) return 4;
  else if (rand >= 11 && rand <= 15) return 3;
  else if (rand >= 16 && rand <= 20) return 2;
  else if (rand >= 21 && rand <= 25) return 1;
  else return 0;
}
