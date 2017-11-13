import { centerX, centerY } from '../../Game/centerPos';
import { delay } from '../../Game/utils';

export default class {
  constructor(game) {
    this.game = game;
    this.FailBoard = [
      game.add.sprite(centerX, centerY, 'FailBoard', 'FailBoard.png'),
      game.add.sprite(centerX, centerY, 'FailBoard', 'FailBoardBtn.png')
    ];
    this.FailBoard.forEach(sprite => {
      sprite.anchor.setTo(0.5);
      sprite.alpha = 0;
    });

    this.ExitBtn = game.add.sprite(centerX + 49, centerY + 70, 'FailBoard', 'FailBoardBtnArea.png');
    this.ExitBtn.anchor.setTo(0.5);
    this.ExitBtn.events.onInputDown.add(game.exit, game);
    this.ExitBtn.alpha = 0;

    this.RestartBtn = game.add.sprite(centerX - 49, centerY + 70, 'FailBoard', 'FailBoardBtnArea.png');
    this.RestartBtn.anchor.setTo(0.5);
    this.RestartBtn.events.onInputDown.add(game.restart, game);
    this.RestartBtn.alpha = 0;
  }
  async ShowUp() {
    this.FailBoard.forEach(sprite => {
      sprite.alpha = 1;
      sprite.scale.setTo(0);
      this.game.add.tween(sprite.scale).to({ x: 1, y: 1 }, 500, 'Quad.easeOut', true);
    });
    await delay(500);
    this.setBtnEnable(true);
  }
  Clean() {
    this.setBtnEnable(false);
    this.FailBoard.forEach(sprite => {
      this.game.add.tween(sprite.scale).to({ x: 0, y: 0 }, 500, 'Quad.easeOut', true);
    });
  }
  setBtnEnable(enable) {
    this.ExitBtn.inputEnabled = enable;
    this.RestartBtn.inputEnabled = enable;
  }
}
