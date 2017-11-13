import { StageState } from './User'
import Phaser from 'phaser';
import { tweenAlpha, setBtnEnable } from '../Game/utils';
import BlackBG from '../Game/blackBG';

export default class extends Phaser.State {
  create() {
    this.MedalBoardBG = this.add.sprite(0, 0, 'MedalBG');

    this.ConfirmBtn = createHoverArea(this, 1415, 660);
    this.ConfirmBtn.events.onInputDown.add(this.exit, this);
    setBtnEnable(this.ConfirmBtn, true);

    let StageList = ['AxPage', 'LoggingPage', 'CatchBugPage', 'FishingPage', 'CookingPage'];
    this.Medal = Array.from({ length: 5 }, (v, k) => k)
      .map(k => {
        let medal = this.add.sprite(0, 0, 'Medal', `${StageList[k]}Medal.png`);
        medal.alpha = 0;
        return medal;
      });

    this.BlackBG = new BlackBG(this);
    this.BlackBG.clean();
    this.ShowUp();
  }
  ShowUp() {
    let level = StageState.LevelFinish;
    tweenAlpha(this, this.MedalBoardBG, 1);
    this.Medal.filter((medal, i) => i + 1 <= level)
      .forEach(medal => tweenAlpha(this, medal, 1));
  }
  async exit() {
    this.BlackBG.BG.alpha = 0;
    await this.BlackBG.closing(300);
    this.state.start('LevelMap', true, false);
  }
}
const createHoverArea = (game, x, y) => {
  let hover = game.add.graphics();
  hover.beginFill(0x000000);
  hover.drawRect(x, y, 100, 60);
  hover.alpha = 0;
  return hover;
}
