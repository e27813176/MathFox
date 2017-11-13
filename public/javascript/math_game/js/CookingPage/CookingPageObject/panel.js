import { setBtnEnable, tweenAlpha } from '../../Game/utils';
import { centerX } from '../../Game/centerPos';

export default class {
  constructor(game) {
    this.game = game;
    let posX = centerX;
    let posY = 330;
    this.questionPanel = game.add.sprite(0, 0, 'panel', 'questionPanel.png');

    this.answerPanel = Array.from({ length: 3 }, (v, k) => k)
      .map(k => {
        let panel = game.add.sprite(posX + (k - 1) * 90, posY, 'panel', 'answerPanel.png');
        panel.events.onInputDown.add(game.checkAnswer, game);
        panel.anchor.setTo(0.5);
        setBtnEnable(panel, true)
        return panel
      });
    this.Panel = this.answerPanel.concat(this.questionPanel);
    this.Panel.forEach(panel => { panel.alpha = 0 });

    const createPanelNum = (x, y, style) => {
      let num = game.add.text(x, y, '', style);
      num.anchor.setTo(0.5);
      num.alpha = 0;
      return num
    }

    let style = { font: '60px Arial', fill: '#efd995', align: 'center' };
    let equationX = [centerX - 3 - 86, centerX - 3 + 94, centerX - 3];
    let equationY = [218, 218, 130];
    this.equation = Array.from({ length: 3 }, (v, k) => k)
      .map(k => createPanelNum(equationX[k], equationY[k], style));

    style = { font: '40px Arial', fill: '#efd995', align: 'center' };
    this.answerNum = Array.from({ length: 3 }, (v, k) => k)
      .map(k => createPanelNum(posX + (k - 1) * 90, posY + 3, style))

    this.PanelNum = this.equation.concat(this.answerNum);
  }
  SetPanelAlpha(alpha) {
    this.Panel.forEach(panel => tweenAlpha(this.game, panel, alpha));
    this.PanelNum.forEach(num => tweenAlpha(this.game, num, alpha));
  }
  UpdateNum(equation, mode, AnswerArray) {
    this.equation.forEach((num, i) => i === mode ? num.setText('?') : num.setText(equation[i]));
    this.answerNum.forEach((num, i) => num.setText(AnswerArray[i]));
    this.answerPanel.forEach((panel, i) => { panel.variable = AnswerArray[i] });
  }
  block() { }
}
