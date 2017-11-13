import { StageState } from '../../User/User'

export default class {
  constructor(game, PageList) {
    this.game = game;
    let LevelFinish = StageState.LevelFinish;
    this.Hover = [
      createHoverArea(game, 720, 460),
      createHoverArea(game, 55, 170),
      createHoverArea(game, 270, 240),
      createHoverArea(game, 500, 140),
      createHoverArea(game, 825, 170),
      createHoverArea(game, 1100, 260),
      createHoverArea(game, 1150, 560)
    ];

    this.tutorialIcon = game.add.sprite(90, 200, 'LevelBtn', 'TutorialBtn.png');
    this.LevelIcon = Array.from({ length: 4 }, (v, k) => k)
      .map(k => game.add.sprite(0, 0, 'LevelBtn', `${PageList[k + 3]}Btn.png`));

    this.LevelIcon.forEach((Icon, i) => {
      if (LevelFinish <= i) this.LevelIcon[i].alpha = 0;
    });
  }
  setLevelBtnEnable(enable) {
    let level = StageState.LevelFinish;
    this.Hover.forEach((btn, i) => {
      if (level + 3 > i) return setBtnEnable(btn, enable);
    });
  }
}
const createHoverArea = (game, x, y) => {
  let hover = game.add.graphics();
  hover.beginFill(0x000000);
  hover.drawRect(x, y, 160, 160);
  hover.alpha = 0;
  return hover;
}
const setBtnEnable = (btn, enable) => { btn.inputEnabled = enable };
