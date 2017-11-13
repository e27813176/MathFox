import { centerX, centerY } from '../../Game/centerPos';
import { delay } from '../../Game/utils';

export default class {
  constructor(game) {
    this.game = game;
    this.Board = game.add.sprite(centerX, centerY, 'Board', 'Board.png');
    this.Board.anchor.setTo(0.5);
    this.Board.alpha = 0;

    this.FinishBtn = game.add.sprite(centerX + 58, 511, 'Board', 'BtnArea.png');
    this.FinishBtn.anchor.setTo(0.5);
    this.FinishBtn.alpha = 0;
    this.FinishBtn.events.onInputDown.add(game.exitPage, game);

    this.ContinueBtn = game.add.sprite(centerX - 58, 511, 'Board', 'BtnArea.png');
    this.ContinueBtn.anchor.setTo(0.5);
    this.ContinueBtn.alpha = 0;
    this.ContinueBtn.events.onInputDown.add(game.continueGame, game);

    let bugList = ['GoldenBug', 'IceBug', 'FireBug'];
    this.BugBox = bugList.map(bug => {
      let box = game.add.sprite(centerX, centerY, 'Board', `${bug}Box.png`);
      box.anchor.setTo(0.5);
      box.alpha = 0;
      return box
    });
  }
  async ShowUp() {
    this.game.Audio.GetBug.play();
    this.Board.alpha = 1;
    this.Board.scale.setTo(0);
    await delay(100);
    this.game.add.tween(this.Board.scale).to({ x: 1, y: 1 }, 300, 'Quad.easeOut', true);
    await delay(300);
    this.SetBtnEnable(true);
  }
  async ShowUpBugBox(bug) {
    let index;
    if (bug === 'GoldenBug') index = 0;
    else if (bug === 'IceBug') index = 1;
    else index = 2;
    await delay(100);
    this.BugBox.forEach((box, i) => {
      if (index === i) {
        box.alpha = 1;
        box.scale.setTo(0);
        this.game.add.tween(box.scale).to({ x: 1, y: 1 }, 300, 'Quad.easeOut', true);
      }
    });
  }
  SetBtnEnable(enable) {
    this.FinishBtn.inputEnabled = enable;
    this.ContinueBtn.inputEnabled = enable;
  }
  Clean() {
    this.SetBtnEnable(false);
    this.game.add.tween(this.Board.scale).to({ x: 0, y: 0 }, 300, 'Quad.easeIn', true, 0);
    this.BugBox.forEach(box => this.game.add.tween(box.scale).to({ x: 0, y: 0 }, 300, 'Quad.easeIn', true, 0))
  }
}
