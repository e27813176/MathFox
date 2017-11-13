import { setBtnEnable } from '../../Game/utils';
import { centerX, centerY } from '../../Game/centerPos';

export default class {
  constructor(game) {
    this.game = game;
    this.QuestionPanel = [game.add.sprite(0, 0, 'Panel', 'QuestionPanel.png')];
    this.AnswerPanel = Array.from({ length: 5 }, (v, k) => k)
      .map(k => createAnswerPanel(game, k));

    let style = { font: '40px Arial', fill: '#3a42a5', align: 'center' };
    this.answerNum = Array.from({ length: 5 }, (v, k) => k)
      .map(k => createAnswerNum(game, k, style));

    style = { font: '60px Arial', fill: '#74e4f3', align: 'center' };
    this.equation = [
      game.add.text(centerX - 265 - 110, centerY - 5, '', style),
      game.add.text(centerX - 265 + 105, centerY - 5, '', style),
      game.add.text(centerX - 265, centerY - 118, '', style)
    ]
    this.equation.forEach(num => num.anchor.set(0.5));
  }
  setAnswerPanelEnable(enable) {
    this.AnswerPanel.forEach(btn => setBtnEnable(btn, enable));
  }
  updateNum(equation, startnum) {
    this.equation.forEach((num, i) => i === 2 ? num.setText('?') : num.setText(equation[i]));
    this.answerNum.forEach((x, i) => x.setText(i + startnum));
  }
}
const createAnswerPanel = (game, i) => {
  let obj = {};
  obj = game.add.sprite(centerX + 90 * i - 445, centerY + 140, 'Panel', 'AnswerPanel.png');
  obj.anchor.setTo(0.5);
  obj.events.onInputDown.add(game.checkAnswer, game);
  obj.inputEnabled = false;
  obj.variable = i + 1;
  return obj
}
const createAnswerNum = (game, i, style) => {
  let obj = {};
  obj = game.add.text(centerX + 90 * i - 445, centerY + 140 + 2, '', style);
  obj.anchor.setTo(0.5);
  return obj
}
