import { centerX, centerY } from '../../Game/centerPos';

export default class {
  constructor(game) {
    this.game = game;
    this.board = {
      BG: game.add.sprite(centerX, centerY, 'Board', 'BoardBG.png'),
      Seal: game.add.sprite(0, 0, 'Board', 'BoardSeal.png'),
      BackBtn: game.add.sprite(0, 0, 'Board', 'BoardBackBtn.png'),
      BackBtnArea: game.add.graphics()
        .beginFill(0xffffff)
        .drawRect(858, 476, 120, 70)
    }
    this.board.BG.anchor.setTo(0.5);
    this.board.BG.alpha = 0;
    this.board.Seal.alpha = 0;
    this.board.BackBtn.alpha = 0;
    this.board.BackBtnArea.alpha = 0;
    this.board.BackBtnArea.events.onInputDown.add(game.closing, game);
  }
  showUp() {
    this.board.BG.scale.setTo(0);
    this.board.BG.alpha = 1;
    this.game.add.tween(this.board.BG.scale).to({ x: 1, y: 1 }, 500, 'Quad.easeOut', true, 1000);
    this.game.add.tween(this.board.Seal).to({ alpha: 1 }, 500, 'Quad.easeOut', true, 1500);
    this.game.add.tween(this.board.BackBtn).to({ alpha: 1 }, 500, 'Quad.easeOut', true, 2000)
      .onComplete.add(() => { this.board.BackBtnArea.inputEnabled = true });
  }
}
