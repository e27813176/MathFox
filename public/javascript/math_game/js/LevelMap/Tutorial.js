import Phaser from 'phaser';
import { centerX, centerY } from '../Game/centerPos';
import { tweenAlpha, tweenShining, setBtnEnable, delay } from '../Game/utils';
import { equationlevel1 } from '../Game/LevelEquation';
import { createQuestionNum } from '../Game/createQuestion';

export default class extends Phaser.State {
  init() {
    this.CorrectAnswer = 0;
    this.mode = 2;
  }
  preload() {
    let path = path_prefix + 'assets/Tutorial/';
    let audioPath = path_prefix + 'assets/audio/';
    this.load.image('TutorialBG', path + 'TutorialBG.jpg')
      .atlas('Panel', path + 'Panel.png', path + 'Panel.json')
      .audio('RightFX', audioPath + 'rightFX.mp3')
      .audio('WrongFX', audioPath + 'wrongFX.mp3')
      .audio('StartFX', audioPath + 'startFX.mp3')
      .audio('ClickFX', audioPath + 'clickFX.mp3')
  }
  create() {
    this.createAudio();
    this.add.sprite(0, 0, 'TutorialBG');
    this.createBtn();
    this.createPanel();
    this.createNum();
    this.createMark();
    this.creatText();
    this.Panel.forEach(obj => { obj.alpha = 0 });
    this.PanelNum.forEach(Num => { Num.alpha = 0 });
  }
  creatText() {
    let style = { font: '50px Arial', fill: '#ffffff', align: 'center' };
    this.CorrectText = this.add.text(1070, centerY - 20, '答對囉!!!', style);
    this.CorrectText.anchor.set(0.5);
    this.CorrectText.alpha = 0;
  }
  createPanel() {
    this.QuestionPanel = this.add.sprite(0, 0, 'Panel', 'QuestionPanel.png');

    this.AnswerPanel = Array.from({ length: 5 }, (v, k) => k)
      .map(i => {
        let obj = this.add.sprite(centerX - 130 - 200 + 100 * i, centerY + 150, 'Panel', 'AnswerPanel.png');
        obj.anchor.setTo(0.5);
        obj.events.onInputDown.add(this.CheckAnswer, this);
        obj.inputEnabled = false;
        obj.variable = i + 1;
        return obj
      });
    this.Panel = this.AnswerPanel.concat(this.QuestionPanel);
    this.AnswerPanelLight = this.add.sprite(0, 0, 'Panel', 'AnswerPanelLight.png');
    this.AnswerPanelLight.anchor.setTo(0.5);
    tweenShining(this, this.AnswerPanelLight);
  }
  createBtn() {
    this.StartBtn = this.add.sprite(centerX + 110, centerY, 'Panel', 'StartPanel.png');
    this.StartBtn.events.onInputDown.add(this.StartTutorial, this);

    this.HomeBtn = this.add.sprite(centerX - 90, centerY, 'Panel', 'HomePanel.png');
    this.HomeBtn.events.onInputDown.add(this.ExitTutorial, this);

    this.btn1 = [this.StartBtn, this.HomeBtn];
    this.btn1.forEach(btn => {
      btn.anchor.setTo(0.5);
      btn.inputEnabled = true;
    });
    this.BackBtn = this.add.sprite(centerX + 250, centerY + 100, 'Panel', 'BackPanel.png');
    this.BackBtn.events.onInputDown.add(this.Back, this);

    this.ContinueBtn = this.add.sprite(centerX + 350, centerY + 100, 'Panel', 'ContinuePanel.png');
    this.ContinueBtn.events.onInputDown.add(this.Continue, this);

    this.btn2 = [this.BackBtn, this.ContinueBtn];
    this.btn2.forEach(btn => {
      btn.scale.setTo(0.5);
      btn.anchor.setTo(0.5);
      btn.alpha = 0;
    });
  }
  createMark() {
    let style = { font: '60px Arial', fill: '#ffffff', align: 'center' };

    this.operator = this.add.text(1050, centerY - 20, '', style);
    this.Equal = this.add.text(1150, centerY - 20, '=', style);

    this.Mark = [this.operator, this.Equal];
    this.Mark.forEach(mark => {
      mark.anchor.setTo(0.5);
      mark.alpha = 0;
    });
  }
  createNum() {
    let style = { font: '60px Arial', fill: '#ffffff', align: 'center' };
    let posX = [centerX - 240, centerX - 40, centerX - 140];
    let posY = [centerY - 20, centerY - 20, centerY - 115];
    this.equation = Array.from({ length: 6 }, (v, k) => k)
      .map(k => {
        let i = k % 3;
        let num = this.add.text(posX[i], posY[i], '', style);
        num.anchor.setTo(0.5);
        return num
      })

    this.AnswerNum = Array.from({ length: 5 }, (v, k) => k)
      .map(i => {
        let num = this.add.text(centerX - 136 - 200 + 100 * i, centerY + 148, i + 1, style);
        num.anchor.setTo(0.5);
        num.alpha = 1;
        return num
      });
    this.PanelNum = this.equation.concat(this.AnswerNum);
  }
  createAudio() {
    this.Audio = {
      RightFX: this.add.audio('RightFX'),
      WrongFX: this.add.audio('WrongFX'),
      StartFX: this.add.audio('StartFX'),
      ClickFX: this.add.audio('ClickFX')
    }
  }
  StartTutorial() {
    this.btn1.forEach(btn => {
      tweenAlpha(this, btn, 0);
      btn.inputEnabled = false;
    });
    this.ShowUpPanel();
  }
  ShowUpPanel() {
    tweenAlpha(this, this.QuestionPanel, 1, 300, 1000)
      .onComplete.add(() => this.newQuestion())
  }
  newQuestion() {
    let equation = createQuestionNum(equationlevel1, [1, 5]);
    this.equation.forEach((num, i) => {
      let index = i % 3;
      if (index === this.mode) num.setText('?');
      else num.setText(equation[index]);
    });
    this.CorrectAnswer = equation[this.mode];

    this.PanelNum.forEach(num => tweenAlpha(this, num, 1));
    this.Panel.forEach(panel => tweenAlpha(this, panel, 1));

    if (this.mode === 2) {
      this.operator.setText('+');
      this.addHint();
    } else {
      this.operator.setText('-');
      this.minusHint();
    }
  }
  addHint() {
    this.PanelNum.forEach(num => tweenAlpha(this, num, 1));
    this.add.tween(this.equation[3]).to({ x: 1000 }, 1000, 'Quad.easeOut', true, 1000);
    this.add.tween(this.equation[4]).to({ x: 1100 }, 1000, 'Quad.easeOut', true, 1000);
    this.Mark.forEach(mark => this.add.tween(mark).to({ alpha: 1 }, 500, Phaser.Easing.Elastic.Out, true, 2000));
    this.add.tween(this.equation[5]).to({ x: 1200, y: centerY - 20 }, 1000, 'Quad.easeOut', true, 3000)
      .onComplete.add(() => this.waitChecking());
  }
  minusHint() {
    this.add.tween(this.equation[5]).to({ x: 1000, y: '+95' }, 1000, 'Quad.easeOut', true, 1000);
    this.add.tween(this.equation[3]).to({ x: 1100 }, 1000, 'Quad.easeOut', true, 1000);
    this.Mark.forEach(mark => this.add.tween(mark).to({ alpha: 1 }, 500, Phaser.Easing.Elastic.Out, true, 2000));
    this.add.tween(this.equation[4]).to({ x: 1200, y: centerY - 20 }, 1000, 'Quad.easeOut', true, 3000)
      .onComplete.add(() => this.waitChecking());
  }
  waitChecking() {
    this.AnswerPanelLight.x = centerX - 130 - 200 + 100 * (this.CorrectAnswer - 1);
    this.AnswerPanelLight.y = centerY + 150;
    this.AnswerPanelLight.alpha = 1;
    this.AnswerPanelLight.tween.resume();
    this.AnswerPanel.forEach(panel => setBtnEnable(panel, true));
  }
  Back() {
    this.btn2.forEach(btn => {
      setBtnEnable(btn, false);
      tweenAlpha(this, btn, 0);
    });
    this.Panel.forEach(panel => tweenAlpha(this, panel, 0));
    this.PanelNum.forEach(num => tweenAlpha(this, num, 0));
    tweenAlpha(this, this.CorrectText, 0);

    this.btn1.forEach(btn => tweenAlpha(this, btn, 1, 300, 1000)
      .onComplete.add(btn => setBtnEnable(btn, true))
    );
  }
  Continue() {
    tweenAlpha(this, this.CorrectText, 0);
    this.btn2.forEach(btn => {
      setBtnEnable(btn, false);
      tweenAlpha(this, btn, 0);
    });
    this.newQuestion();
  }
  CheckAnswer(btn) {
    if (btn.variable === this.CorrectAnswer) {
      this.Audio.RightFX.play();
      this.answerCorrect();
    } else {
      this.Audio.WrongFX.play();
    }
  }
  async answerCorrect() {
    this.AnswerPanel.forEach(panel => setBtnEnable(panel, false));
    this.AnswerPanelLight.tween.pause();
    this.AnswerPanelLight.alpha = 0;
    this.Mark.forEach(mark => { mark.alpha = 0 });

    let posX = [centerX - 240, centerX - 40, centerX - 140];
    let posY = [centerY - 20, centerY - 20, centerY - 115];

    this.equation.forEach((num, i) => {
      let k = i % 3;
      if (i >= 3) {
        num.x = posX[k];
        num.y = posY[k];
        num.alpha = 0;
      }
    });

    if (this.mode === 2) this.mode = 1;
    else this.mode = 2;

    this.add.tween(this.CorrectText).to({ alpha: 1 }, 500, Phaser.Easing.Elastic.Out, true);
    await delay(1000);
    this.btn2.forEach(btn => tweenAlpha(this, btn, 1));
    await delay(1500);
    this.btn2.forEach(btn => setBtnEnable(btn, true))
  }
  ExitTutorial() {
    this.PanelNum.forEach(num => num.destroy());
    this.state.start('GameBoot', true, true, 'LevelMap');
  }
}
