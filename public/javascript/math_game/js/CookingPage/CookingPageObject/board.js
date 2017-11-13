import { delay } from '../../Game/utils';
import { centerX, centerY } from '../../Game/centerPos';

export default class {
  constructor(game) {
    this.game = game;
    this.failBoard = game.add.sprite(centerX, centerY, 'panel', 'failBoard.png');
    this.successBoard = game.add.sprite(centerX, centerY, 'panel', 'successBoard.png');

    this.failBoard.anchor.setTo(0.5);
    this.successBoard.anchor.setTo(0.5);

    this.failBoard.scale.setTo(0);
    this.successBoard.scale.setTo(0);

    this.continueBtn = game.add.graphics();
    this.continueBtn.beginFill(0x000000);
    this.continueBtn.drawRect(730, 410, 60, 20);
    this.continueBtn.alpha = 0;
    this.continueBtn.events.onInputDown.add(game.continueCooking, game);

    this.exitBtn = game.add.graphics();
    this.exitBtn.beginFill(0x000000);
    this.exitBtn.drawRect(810, 410, 60, 20);
    this.exitBtn.alpha = 0;
    this.exitBtn.events.onInputDown.add(game.exit, game);
  }
  async ShowUpGetBoard() {
    await delay(1000);
    this.game.add.tween(this.successBoard.scale).to({ x: 1, y: 1 }, 300, 'Linear', true);
    await delay(300);
    this.continueBtn.inputEnabled = true;
    this.exitBtn.inputEnabled = true;
    this.continueBtn.y = 40;
    this.exitBtn.y = 40;
  }
  async ShowUpFailBoard() {
    await delay(2000);
    this.game.add.tween(this.failBoard.scale).to({ x: 1, y: 1 }, 300, 'Linear', true);
    await delay(300);
    this.continueBtn.inputEnabled = true;
    this.exitBtn.inputEnabled = true;
    this.continueBtn.y = 0;
    this.exitBtn.y = 0;
  }
  Clean() {
    this.game.add.tween(this.successBoard.scale).to({ x: 0, y: 0 }, 300, 'Linear', true, 0);
    this.game.add.tween(this.failBoard.scale).to({ x: 0, y: 0 }, 300, 'Linear', true, 0);
    this.continueBtn.inputEnabled = false;
    this.exitBtn.inputEnabled = false;
  }
}
