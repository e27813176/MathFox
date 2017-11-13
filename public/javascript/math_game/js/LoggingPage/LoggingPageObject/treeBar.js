import { tweenAlpha, tweenShining } from '../../Game/utils';
import { treeblood } from './TreeParam';

export default class {
  constructor(game) {
    this.game = game;
    this.TreeBloodPoint = Array.from({ length: 3 }, (v, i) => (i + 1) * (-362 / 4) + 10);

    this.TreeBloodBarBG = game.add.sprite(0, 0, 'TreeBloodBar', 'TreeBloodBarBG.png');
    this.TreeBloodBarBG.alpha = 0;

    this.TreeBlood = Array.from({ length: 4 }, (v, k) => k)
      .map(k => game.add.sprite(treeblood.value, 0, 'TreeBloodBar', `TreeBloodBar00${k + 1}.png`));

    this.mask = game.add.graphics();
    this.mask.beginFill(0xffffff);
    this.mask.drawRect(827, 700, 360, 50);

    this.TreeBlood.forEach(bar => {
      tweenShining(game, bar);
      bar.mask = this.mask;
    });

    this.TreeBloodBarTop = game.add.sprite(0, 0, 'TreeBloodBar', 'TreeBloodBarTop.png');
    this.TreeBloodBarTop.alpha = 0;
  }
  ShowUp() {
    if (this.TreeBlood[0].x > this.TreeBloodPoint[0]) {
      ShowTreeBlood(this.game, this.TreeBlood[0]);
    } else if (this.TreeBlood[0].x <= this.TreeBloodPoint[0] && this.TreeBlood[0].x > this.TreeBloodPoint[1]) {
      ShowTreeBlood(this.game, this.TreeBlood[1]);
    } else if (this.TreeBlood[0].x <= this.TreeBloodPoint[1] && this.TreeBlood[0].x > this.TreeBloodPoint[2]) {
      ShowTreeBlood(this.game, this.TreeBlood[2]);
    } else if (this.TreeBlood[0].x <= this.TreeBloodPoint[2]) {
      ShowTreeBlood(this.game, this.TreeBlood[3]);
    }
    this.game.add.tween(this.TreeBloodBarTop).to({ alpha: 1 }, 300, 'Linear', true, 0);
    this.game.add.tween(this.TreeBloodBarBG).to({ alpha: 1 }, 300, 'Linear', true, 0);
  }
  Clean() {
    this.TreeBlood.forEach(bar => {
      bar.tween.pause();
      tweenAlpha(this.game, bar, 0);
    });
    this.game.add.tween(this.TreeBloodBarTop).to({ alpha: 0 }, 300, 'Linear', true, 0);
    this.game.add.tween(this.TreeBloodBarBG).to({ alpha: 0 }, 300, 'Linear', true, 0);
  }
  resetTreeBloodBar() {
    this.TreeBlood.forEach(sprite => { sprite.x = 0 });
  }
  TreeBloodDec(game, bar, attack) {
    let amount;
    if (bar.x > -243) amount = -attack;
    else amount = -1;
    this.TreeBlood.forEach(sprite => game.add.tween(sprite).to({ x: `${amount}` }, 300, 'Linear', true, 0));
  }
  setValue() {
    treeblood.value = this.TreeBlood[0].x;
  }
  setTreeBlood() {
    if (this.TreeBlood[0].x <= this.TreeBloodPoint[0] && this.TreeBlood[0].x > this.TreeBloodPoint[1]) {
      HideTreeBlood(this.game, this.TreeBlood[0]);
      ShowTreeBlood(this.game, this.TreeBlood[1]);
    } else if (this.TreeBlood[0].x <= this.TreeBloodPoint[1] && this.TreeBlood[0].x > this.TreeBloodPoint[2]) {
      HideTreeBlood(this.game, this.TreeBlood[1]);
      ShowTreeBlood(this.game, this.TreeBlood[2]);
    } else if (this.TreeBlood[0].x <= this.TreeBloodPoint[2]) {
      HideTreeBlood(this.game, this.TreeBlood[2]);
      ShowTreeBlood(this.game, this.TreeBlood[3]);
    }
  }
}

const ShowTreeBlood = (game, obj) => {
  game.add.tween(obj).to({ alpha: 1 }, 300, 'Linear', true, 0);
  obj.tween.resume();
}
const HideTreeBlood = (game, obj) => {
  game.add.tween(obj).to({ alpha: 0 }, 300, 'Linear', true, 0);
  obj.tween.pause();
}
