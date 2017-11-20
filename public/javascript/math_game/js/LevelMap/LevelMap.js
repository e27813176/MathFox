import Phaser from 'phaser';
import LevelBtn from './LevelMapObject/levelBtn';
import GetNewMedal from './LevelMapObject/prompts';
import BlackBG from '../Game/blackBG';

import { StageState } from '../User/User'
import { setBtnEnable } from '../Game/utils'

export default class extends Phaser.State {
  init() {
    this.PageList = ['Village', 'Tutorial', 'AxPage', 'LoggingPage', 'CatchBugPage', 'FishingPage', 'CookingPage'];
    this.LevelComplete = StageState.LevelFinish;
    this.IconShowUp = StageState.LevelIconShowUp;
    this.CheckNewMedal = StageState.CheckNewMedal;
  }
  create() {
    this.add.sprite(0, 0, 'LevelMapBG');
    this.createStageBtn();
    this.GetNewMedal = new GetNewMedal(this);

    let level = this.LevelComplete;
    if (level <= 4) createNextIcon(this, level);

    this.MedalBtn = this.add.sprite(150, 100, 'Medal', 'MedalBtn.png');
    this.MedalBtn.alpha = 1;
    this.MedalBtn.anchor.setTo(0.5);
    this.MedalBtn.events.onInputDown.add(this.OpenMedalBoard, this);
    setBtnEnable(this.MedalBtn, true);

    if (this.CheckNewMedal === true) this.NewMedalIcon = createNewMedalIcon(this);

    this.Audio = {
      GetMedal: this.add.audio('GetMedal')
    };
    this.opening();
  }
  async opening() {
    this.BlackBG = new BlackBG(this);
    await this.BlackBG.opening();
    this.BlackBG.clean();
    this.GetNewMedal.ShowUp();
  }
  createStageBtn() {
    this.stageBtn = new LevelBtn(this.game, this.PageList);
    this.stageBtn.setLevelBtnEnable(true);
    this.stageBtn.Hover.forEach((btn, i) => setLevelBtn(this, btn, this.PageList[i]));
  }
  async OpenMedalBoard() {
    if (this.NewMedalIcon) {
      this.NewMedalIcon.alpha = 0;
      this.NewMedalIcon.tween.pause();
    }
    StageState.CheckNewMedal = false;
    this.stageBtn.setLevelBtnEnable(false);
    setBtnEnable(this.MedalBtn, false);
    await this.BlackBG.closing(200);
    this.state.start('MedalBoard', true, false);
  }
  CloseMedalBoard() {
    this.setLevelBtnEnable(true);
    setBtnEnable(this.MedalBtn, true);
    setBtnEnable(this.ConfirmBtn, false);
    this.cleanMedalBoard();
  }
  async exit(page) {
    await this.BlackBG.closing();
    this.state.start('GameBoot', true, false, page);
  }
}
const setLevelBtn = (game, Hover, Page) =>
  Hover.events.onInputDown.add(() => game.exit(Page))

const createNextIcon = (game, i) => {
  let obj = game.add.sprite(0, 0, 'LevelBtn', `NextIcon${i}.png`);
  game.add.tween(obj).to({ alpha: '-0.5' }, 500, 'Quad.easeInOut', true, 0, false, true).loop(true);
  return obj
};

const createNewMedalIcon = game => {
  let obj = game.add.sprite(-12, -20, 'LevelBtn', 'NewIconMedal.png');
  obj.tween = game.add.tween(obj).to({ alpha: 0.2 }, 500, 'Linear', true, 0, false, true).loop(true);
  return obj
}
