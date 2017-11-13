import { tweenAlpha, tweenShining, createAnimate, setBtnEnable } from '../../Game/utils';
import { createQuestionNum } from '../../Game/createQuestion';
import { equationlevel1, equationlevel2 } from '../../Game/LevelEquation';

const centerX = 800;
const centerY = 400;

export default class {
  constructor(game) {
    this.QuestionPanel = game.add.sprite(0, 0, 'Panel', 'QuestionPanel.png');
    this.QuestionPanelGolden = game.add.sprite(0, 0, 'Panel', 'QuestionPanelGolden.png');
    tweenShining(game, this.QuestionPanelGolden);

    this.AnswerPanel = Array.from({ length: 5 }, (v, k) => k)
      .map(k => createAnswerPanel(game, k));

    this.Panel = this.AnswerPanel.concat(this.QuestionPanel);
    this.Panel.forEach(panel => { panel.alpha = 0 });

    let style = { font: '40px Arial', fill: '#dfc985', align: 'center' };

    this.answerNum = Array.from({ length: 5 }, (v, k) => k)
      .map(k => createNum(game, k, style));

    this.PanelGlowNumSum = game.add.sprite(0, 0, 'Panel', 'PanelGlowNumSum.png');
    this.PanelGlowNumSum.alpha = 0;
    this.PanelGlowNumAdd = game.add.sprite(0, 0, 'Panel', 'PanelGlowNumAdd.png');
    this.PanelGlowNumAdd.alpha = 0;

    this.QuestionPanelWrongFx = game.add.sprite(0, 0, 'QuestionPanelWrongFx');
    this.QuestionPanelRightFx = game.add.sprite(0, 0, 'QuestionPanelRightFx');

    createAnimate(this.QuestionPanelWrongFx, 'QuestionPanelWrongFx', 0, 20, 45, false);
    createAnimate(this.QuestionPanelRightFx, 'QuestionPanelRightFx', 0, 20, 30, false);

    this.QuestionPanelWrongFx.alpha = 0;
    this.QuestionPanelRightFx.alpha = 0;

    style = { font: '60px Arial', fill: '#e8ddba', align: 'center' };
    this.equation = [
      game.add.text(centerX + 208 - 120, centerY - 63, '', style),
      game.add.text(centerX + 208 + 120, centerY - 63, '', style),
      game.add.text(centerX + 208, centerY - 179, '', style)
    ]
    this.equation.forEach(num => num.anchor.setTo(0.5));
    this.PanelNum = this.answerNum.concat(this.equation);
  }
  RightFx(game) {
    this.QuestionPanelRightFx.alpha = 1;
    game.add.tween(this.QuestionPanelRightFx).to({ alpha: 0 }, 500, 'Quad.easeOut', true, 200);
    this.QuestionPanelRightFx.animate.play('QuestionPanelRightFx')

    if (this.level === 1) {
      this.PanelGlowNumSum.alpha = 1;
      game.add.tween(this.PanelGlowNumSum).to({ alpha: 0 }, 500, 'Quad.easeOut', true, 0);
    } else if (this.level === 2) {
      this.PanelGlowNumAdd.alpha = 1;
      game.add.tween(this.PanelGlowNumAdd).to({ alpha: 0 }, 500, 'Quad.easeOut', true, 0);
    }
  }
  WrongFx() {
    this.QuestionPanelWrongFx.alpha = 1;
    this.QuestionPanelWrongFx.animate.play('QuestionPanelWrongFx')
      .onComplete.add(sprite => { sprite.alpha = 0 });
  }
  setPanel(game, alpha) {
    game.add.tween(this.QuestionPanelGolden).to({ alpha: alpha }, 500, 'Quad.easeOut', true, 0);
    this.PanelNum.forEach(num => tweenAlpha(game, num, alpha));
    this.Panel.forEach(panel => tweenAlpha(game, panel, alpha));

    if (alpha === 0) {
      this.AnswerPanel.forEach(btn => setBtnEnable(btn, false));
      this.QuestionPanelGolden.tween.pause();
    } else {
      this.AnswerPanel.forEach(btn => setBtnEnable(btn, true));
    }
  }
  newQuestion(level, Range) {
    let equation = [];
    if (level === 1) equation = createQuestionNum(equationlevel1, Range);
    else equation = createQuestionNum(equationlevel2, Range);
    return equation
  }
  updateNum(level, Range) {
    let equation = this.newQuestion(level, Range);
    let startnum = Range[0];
    let answerOffset = Range[0] - 1;
    this.equation.forEach((num, i) => num.setText(equation[i]));
    this.answerNum.forEach((x, i) => x.setText(i + startnum));
    if (level === 1) {
      this.equation[2].setText('?');
      return equation[2] - answerOffset;
    } else {
      this.equation[1].setText('?');
      return equation[1] - answerOffset;
    }
  }
}

const createAnswerPanel = (game, i) => {
  let obj = {};
  obj = game.add.sprite(centerX + 100 * i, centerY + 98, 'Panel', 'AnswerPanel.png');
  obj.anchor.setTo(0.5);
  obj.events.onInputDown.add(game.checkAnswer, game);
  obj.inputEnabled = false;
  obj.variable = i + 1;
  return obj
}
const createNum = (game, i, style) => {
  let obj = {};
  obj = game.add.text(centerX + 100 * i, centerY + 100, '', style);
  obj.anchor.setTo(0.5);
  return obj
}
