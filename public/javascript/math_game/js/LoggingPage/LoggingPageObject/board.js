import { tweenAlpha, delay } from '../../Game/utils';

export default class {
  constructor(game) {
    this.game = game;
    this.ScoreBoard = [
      game.add.sprite(800, 400, 'ScoreBoard', 'ScoreBoardBG.png'),
      game.add.sprite(800, 400, 'ScoreBoard', 'ScoreBoardBtn.png'),
      game.add.sprite(800, 400, 'ScoreBoard', 'ScoreBoardSeal.png')
    ];
    this.ScoreBoard.forEach(x => {
      x.alpha = 0;
      x.anchor.setTo(0.5);
    });
    this.ScoreBoardBtn = [
      game.add.sprite(885, 463, 'ScoreBoard', 'ScoreBoardBtnHover.png'),
      game.add.sprite(783, 463, 'ScoreBoard', 'ScoreBoardBtnHover.png')
    ]
    this.ScoreBoardBtn[0].events.onInputDown.add(game.exit, game);
    this.ScoreBoardBtn[1].events.onInputDown.add(game.continue, game);
    this.ScoreBoardBtn.forEach(x => { x.alpha = 0 });
  }
  setBtnEnable(bool) {
    this.ScoreBoardBtn.forEach(x => { x.inputEnabled = bool });
  }
  async ShowUp() {
    this.ScoreBoard[0].scale.set(0);
    this.ScoreBoard[0].alpha = 1;
    this.game.add.tween(this.ScoreBoard[0].scale).to({ x: 1, y: 1 }, 500, 'Quad.easeOut', true);
    this.ScoreBoard[2].scale.set(20);
    await delay(500);
    this.game.add.tween(this.ScoreBoard[2]).to({ alpha: 1 }, 1000, 'Quad.easeIn', true);
    this.game.add.tween(this.ScoreBoard[2].scale).to({ x: 1, y: 1 }, 1000, 'Quad.easeIn', true);
    await delay(1500);
    this.game.add.tween(this.ScoreBoard[1]).to({ alpha: 1 }, 500, 'Linear', true);
    await delay(500);
    this.setBtnEnable(true);
  }
  Hide() {
    this.ScoreBoard.forEach(sprite => tweenAlpha(this.game, sprite, 0));
  }
}
