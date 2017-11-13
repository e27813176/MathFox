import { tweenAlpha, delay } from '../../Game/utils';
import { StageState } from '../../User/User';
import { BugDex } from './bugdex';

export default class {
  constructor(game) {
    this.game = game;
    this.completeShowUp = false;

    this.taskBoard = game.add.sprite(0, 0, 'TaskBoard', 'TaskBoard.png');
    this.taskBoard.alpha = 0;

    this.taskBlackBG = game.add.graphics();
    this.taskBlackBG.beginFill(0x000000);
    this.taskBlackBG.drawRect(0, 0, 1600, 800);
    this.taskBlackBG.alpha = 0;

    this.taskConfirm = game.add.sprite(0, 0, 'TaskBoard', 'TaskBoardConfirm.png');
    this.taskConfirm.alpha = 0;
    this.taskConfirm.events.onInputDown.add(this.Confirm, this);

    this.taskComplete = game.add.sprite(0, 0, 'TaskBoard', 'TaskBoardComplete.png');
    this.taskComplete.alpha = 0;
    this.taskComplete.events.onInputDown.add(this.CleanCompleteBoard, this);

    this.taskBug = [
      game.add.sprite(0, 0, 'TaskBoard', 'TaskBoardGoldenBug.png'),
      game.add.sprite(0, 0, 'TaskBoard', 'TaskBoardIceBug.png'),
      game.add.sprite(0, 0, 'TaskBoard', 'TaskBoardFireBug.png')
    ]
    this.taskBug.forEach(sprite => { sprite.alpha = 0 });
  }
  Show() {
    this.taskConfirm.inputEnabled = true;
    this.game.add.tween(this.taskConfirm).to({ alpha: 1 }, 300, 'Quad.easeOut', true);
  }
  Confirm() {
    this.taskConfirm.inputEnabled = false;
    tweenAlpha(this.game, this.taskConfirm, 0).onComplete.add(sprite => sprite.scale.setTo(0));
    tweenAlpha(this.game, this.taskBoard, 1, 300, 500);
    this.game.Panel.setAnswerPanelEnable(true);
    this.ShowBug();
  }
  ShowBug() {
    let bugList = ['GoldenBug', 'IceBug', 'FireBug'];
    this.taskBug.forEach((icon, i) => {
      if (BugDex[bugList[i]] !== 0) tweenAlpha(this.game, icon, 1, 300, 500);
    });
  }
  OpenTaskBugdex(i) {
    let icon = this.taskBug[i];
    if (icon.alpha === 0) tweenAlpha(this.game, icon, 1);
  }
  CheckAllBug() {
    if (BugDex.FireBug !== 0 && BugDex.GoldenBug !== 0 && BugDex.IceBug !== 0) {
      return true;
    } else return false;
  }
  Complete() {
    if (StageState.LevelFinish < 3) StageState.LevelFinish = 3;
    StageState.CatchBugPageCompleteCount++;
    if (StageState.CatchBugPageCompleteCount === 1) {
      StageState.CheckNewMedal = true;
      this.completeShowUp = true;
    }
    StageState.CatchBugPageComplete = true;
  }
  async ShowUpCompleteBoard() {
    this.game.Audio.GetMedal.play();
    this.completeShowUp = false;
    this.taskComplete.inputEnabled = true;
    await delay(500);
    tweenAlpha(this.game, this.taskBlackBG, 0.5);
    tweenAlpha(this.game, this.taskComplete, 1);
    await delay(1500);
    tweenAlpha(this.game, this.taskBlackBG, 0);
    tweenAlpha(this.game, this.taskComplete, 0);
    await delay(300);
    this.taskBlackBG.scale.setTo(0);
    this.taskComplete.inputEnabled = false;
  }
  async CleanCompleteBoard() {
    this.taskComplete.inputEnabled = false;
    tweenAlpha(this.game, this.taskBlackBG, 0);
    tweenAlpha(this.game, this.taskComplete, 0);
    await delay(300);
    this.taskBlackBG.scale.setTo(0);
  }
}
