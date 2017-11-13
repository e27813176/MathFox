import { createAnimate, tweenAlpha } from '../../Game/utils';
import { config } from '../../GameConfig';

export default class {
  constructor(game) {
    this.game = game;
    this.QuestionPanel = game.add.sprite(0, 0, 'Panel', 'QuestionPanel.png');

    this.AnswerPanel = Array.from({ length: 5 }, (v, k) => k)
      .map(k => createAnswerPanel(game, k));

    this.Panel = this.AnswerPanel.concat(this.QuestionPanel);
    this.Panel.forEach(x => { x.alpha = 0 });

    let style = { font: '50px Arial', fill: '#fef1ba', align: 'center' };
    this.answerNum = Array.from({ length: 5 }, (v, k) => k)
      .map(k => createAnswerNum(game, k, style));

    let FXname = ['RightFx', 'WrongFx'];
    this.panelFX = Array.from({ length: 2 }, (v, k) => k)
      .map(k => createFX(game, FXname[k]));

    style = { font: '60px Arial', fill: '#3a311f', align: 'center' };
    this.equation = [
      game.add.text(config.centerX + 462 - 106, config.centerY - 71, '', style),
      game.add.text(config.centerX + 462 + 106, config.centerY - 71, '', style),
      game.add.text(config.centerX + 462, config.centerY - 178, '', style)
    ]
    this.equation.forEach(num => {
      num.alpha = 0;
      num.anchor.setTo(0.5);
    });
    this.number = this.equation.concat(this.answerNum);
  }
  setAlpha(alpha) {
    this.Panel.forEach(x => tweenAlpha(this.game, x, alpha));
    this.number.forEach(num => tweenAlpha(this.game, num, alpha));
  }
  setAnswerPanelEnable(bool) {
    this.AnswerPanel.forEach(btn => { btn.inputEnabled = bool });
  }
  CorrectFX() {
    this.panelFX[0].alpha = 1;
    this.panelFX[0].animate.play();
  }
  WrongFX() {
    this.panelFX[1].alpha = 1;
    this.panelFX[1].animate.play();
  }
  setNum(equation, level, Range) {
    let startnum = Range[0];
    this.equation.forEach((num, i) => num.setText(equation[i]));
    if (level === 3) this.equation[2].setText('?');
    else this.equation[1].setText('?');
    this.answerNum.forEach((num, i) => num.setText(i + startnum));
  }
}

const createAnswerNum = (game, i, style) => {
  let obj = {};
  obj = game.add.text(config.centerX + 90 * i + 280, config.centerY + 140, '', style);
  obj.anchor.setTo(0.5);
  return obj
}

const createAnswerPanel = (game, i) => {
  let obj = {};
  obj = game.add.sprite(config.centerX + 90 * i + 280, config.centerY + 140, 'Panel', 'AnswerPanel.png');
  obj.anchor.setTo(0.5);
  obj.events.onInputDown.add(game.checkAnswer, game);
  obj.inputEnabled = false;
  obj.variable = i + 1;
  return obj
}
const createFX = (game, FXname) => {
  let FX = game.add.sprite(0, 0, 'QuestionPanelFx');
  FX.animate = createAnimate(FX, `QuestionPanel${FXname}`, 0, 12, 30, false);
  FX.alpha = 0;
  FX.animate.onComplete.add(sprite => { sprite.alpha = 0 });
  return FX;
}
