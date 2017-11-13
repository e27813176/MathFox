import Phaser from 'phaser';
import BlackBG from '../../Game/blackBG';
import { centerX, centerY } from '../../Game/centerPos';
import { tweenAlpha, setBtnEnable, delay } from '../../Game/utils';

export default class {
  constructor(game) {
    this.game = game;
    this.blackBG = new BlackBG(game);
    this.blackBG.clean();

    this.Text = [
      game.add.sprite(0, 0, 'TutorialText', 'TutorialText1.png'),
      game.add.sprite(0, 0, 'TutorialText', 'TutorialText2.png'),
      game.add.sprite(0, 0, 'TutorialText', 'TutorialText3.png'),
      game.add.sprite(centerX, centerY, 'TutorialText', 'StartText.png')
    ]
    this.Text.forEach(text => { text.alpha = 0 });
    this.Text[3].anchor.setTo(0.5);

    this.askBoard = game.add.sprite(0, 0, 'TutorialText', 'TutorialAsk.png');
    this.askBoard.alpha = 0;

    this.NoBtn = game.add.sprite(922, 404, 'TutorialText', 'TutorialBtn.png');
    this.NoBtn.alpha = 0;
    this.NoBtn.events.onInputDown.add(this.skip, this);
    this.YesBtn = game.add.sprite(867, 404, 'TutorialText', 'TutorialBtn.png');
    this.YesBtn.alpha = 0;
    this.YesBtn.events.onInputDown.add(this.start, this);
    this.askBoardBtn = [this.NoBtn, this.YesBtn];
  }
  askToStart() {
    this.blackBG.BG.alpha = 0;
    this.blackBG.BG.scale.setTo(1);
    tweenAlpha(this.game, this.blackBG.BG, 0.5, 800);
    tweenAlpha(this.game, this.askBoard, 1, 800);
    this.askBoardBtn.forEach(btn => setBtnEnable(btn, true));
  }
  async start() {
    this.game.FlyingBug.SetMode(1);
    this.askBoardBtn.forEach(btn => setBtnEnable(btn, false));
    tweenAlpha(this.game, this.blackBG.BG, 0, 800);
    tweenAlpha(this.game, this.askBoard, 0, 800);
    this.game.tutorialMode = true;
    this.game.Panel.AnswerPanel.forEach(btn => setBtnEnable(btn, false));
    await delay(1000);
    tweenAlpha(this.game, this.Text[1], 1, 300)
    await delay(300);
    this.blackBG.BG.scale.setTo(0);
    this.game.Panel.AnswerPanel.forEach(btn => setBtnEnable(btn, true));
  }
  async answerCorrect() {
    this.game.FlyingBug.SetMode(0);
    this.game.tutorialMode = false;
    this.game.add.tween(this.Text[2]).to({ alpha: 1 }, 500, Phaser.Easing.Elastic.Out, true)
    await delay(1000);
    tweenAlpha(this.game, this.Text[2], 0, 1000);
    tweenAlpha(this.game, this.Text[1], 0, 1000);
    await delay(1000);
    this.game.Task.Show();
  }
  async skip() {
    this.askBoardBtn.forEach(btn => setBtnEnable(btn, false));
    tweenAlpha(this.game, this.askBoard, 0, 800);
    tweenAlpha(this.game, this.blackBG.BG, 0, 800)
    await delay(800);
    this.blackBG.BG.scale.setTo(0);
    this.game.Task.Show();
  }
}
