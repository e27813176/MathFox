import { centerX, centerY } from '../../Game/centerPos';

export default class {
  constructor(game) {
    this.game = game;
    this.GetFishBoardBG = game.add.sprite(centerX, centerY, 'GetFishBoard', 'GetFishBoard.png');
    this.GetFishBoardBG.anchor.setTo(0.5);
    this.GetFishBoardBG.alpha = 0;

    this.GetFishBoardBtn = game.add.sprite(centerX, centerY, 'GetFishBoard', 'GetFishBoardBtn.png');
    this.GetFishBoardBtn.anchor.setTo(0.5);
    this.GetFishBoardBtn.alpha = 0;

    this.GetFishBoardSeal = game.add.sprite(centerX, centerY, 'GetFishBoard', 'GetFishBoardSeal.png');
    this.GetFishBoardSeal.anchor.setTo(0.5);
    this.GetFishBoardSeal.alpha = 0;

    this.GetFishAmazingSeal = game.add.sprite(centerX, centerY, 'GetFishBoard', 'AmazingSeal.png');
    this.GetFishAmazingSeal.anchor.setTo(0.5);
    this.GetFishAmazingSeal.alpha = 0;

    this.GetFishExitBtnHoverArea = game.add.sprite(centerX + 150, centerY + 102, 'GetFishBoard', 'BtnArea.png');
    this.GetFishExitBtnHoverArea.anchor.setTo(0.5);
    this.GetFishExitBtnHoverArea.events.onInputDown.add(game.exit, game);
    this.GetFishExitBtnHoverArea.alpha = 0;

    this.GetFishContinueBtnHoverArea = game.add.sprite(centerX + 50, centerY + 102, 'GetFishBoard', 'BtnArea.png');
    this.GetFishContinueBtnHoverArea.anchor.setTo(0.5);
    this.GetFishContinueBtnHoverArea.events.onInputDown.add(game.continue, game);
    this.GetFishContinueBtnHoverArea.alpha = 0;
  }
  ShowUp(index) {
    this.GetFishBoardBG.scale.setTo(0);
    this.GetFishBoardBG.alpha = 1;
    this.game.add.tween(this.GetFishBoardBG.scale).to({ x: 1, y: 1 }, 500, 'Quad.easeOut', true);

    this.GetFishBoardBtn.alpha = 0;
    this.GetFishBoardBtn.ShowUp = this.game.add.tween(this.GetFishBoardBtn).to({ alpha: 1 }, 500, 'Quad.easeOut', true, 1500);
    this.GetFishBoardBtn.ShowUp.onComplete.add(function () {
      this.GetFishExitBtnHoverArea.inputEnabled = true;
      this.GetFishContinueBtnHoverArea.inputEnabled = true;
    }, this);

    if (index === 6) {
      this.GetFishAmazingSeal.alpha = 0;
      this.GetFishAmazingSeal.scale.setTo(20);
      this.game.add.tween(this.GetFishAmazingSeal.scale).to({ x: 1, y: 1 }, 1000, 'Quad.easeIn', true, 500);
      this.game.add.tween(this.GetFishAmazingSeal).to({ alpha: 1 }, 1000, 'Quad.easeIn', true, 500);
    } else {
      this.GetFishBoardSeal.alpha = 0;
      this.GetFishBoardSeal.scale.setTo(20);
      this.game.add.tween(this.GetFishBoardSeal.scale).to({ x: 1, y: 1 }, 1000, 'Quad.easeIn', true, 500);
      this.game.add.tween(this.GetFishBoardSeal).to({ alpha: 1 }, 1000, 'Quad.easeIn', true, 500);
    }
  }
  Clean() {
    this.SetBtnEnable(false)
    this.game.add.tween(this.GetFishBoardBG).to({ alpha: 0 }, 250, 'Quad.easeOut', true, 0);
    this.game.add.tween(this.GetFishBoardBtn).to({ alpha: 0 }, 250, 'Quad.easeOut', true, 0);
    this.game.add.tween(this.GetFishBoardSeal).to({ alpha: 0 }, 250, 'Quad.easeOut', true, 0);
    this.game.add.tween(this.GetFishAmazingSeal).to({ alpha: 0 }, 250, 'Quad.easeOut', true, 0);
  }
  SetBtnEnable(enable) {
    this.GetFishExitBtnHoverArea.inputEnabled = enable;
    this.GetFishContinueBtnHoverArea.inputEnabled = enable;
  }
}
