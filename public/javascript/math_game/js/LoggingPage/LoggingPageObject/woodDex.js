import { tweenAlpha } from '../../Game/utils';

export default class {
  constructor(game) {
    this.game = game;
    this.woodDex = [
      game.add.sprite(800, 400, 'ScoreBoard', 'GoldenWood.png'),
      game.add.sprite(800, 400, 'ScoreBoard', 'GreenWood.png'),
      game.add.sprite(800, 400, 'ScoreBoard', 'RedWood.png'),
      game.add.sprite(800, 400, 'ScoreBoard', 'LightBlueWood.png')
    ];
    this.woodDex.forEach(dex => {
      dex.alpha = 0;
      dex.anchor.setTo(0.5);
    })
  }
  getWood() {
    let rand = Math.floor(Math.random() * 4);
    this.woodDex.forEach(x => {
      x.scale.setTo(0);
      x.alpha = 1;
    });
    this.game.add.tween(this.woodDex[rand].scale).to({ x: 1, y: 1 }, 500, 'Quad.easeOut', true);
  }
  Hide() {
    this.woodDex.forEach(x => tweenAlpha(this.game, x, 0))
  }
}
