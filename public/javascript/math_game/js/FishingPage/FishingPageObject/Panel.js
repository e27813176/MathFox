import { createAnimate, delay, tweenAlpha, setBtnEnable } from '../../Game/utils';
import { centerX, centerY } from '../../Game/centerPos';

export default class {
  constructor(game) {
    this.game = game;
    this.Panel = this.createPanel();
    this.Panel.forEach(panel => { panel.alpha = 0 });

    this.AnswerPanelLight = Array.from({ length: 3 }, (v, k) => k)
      .map(k => createPanelLight(game, k));

    this.PanelStartFX = Array.from({ length: 3 }, (v, k) => k)
      .map(k => createFX(game, k, 15, 45));

    this.PanelWrongFX = Array.from({ length: 3 }, (v, k) => k)
      .map(k => createFX(game, k, 10, 30));

    this.PanelNum = this.createPanelNum();
  }
  createPanel() {
    this.QuestionPanel = this.game.add.sprite(0, 0, 'Panel', 'QuestionPanel.png');
    this.AnswerPanel = Array.from({ length: 3 }, (v, k) => k)
      .map(k => createAnswerPanel(this.game, k));
    return this.AnswerPanel.concat(this.QuestionPanel);
  }
  createPanelNum() {
    let posX = [centerX + 295 - 95, centerX + 295 + 95, centerX + 295];
    let posY = [centerY - 121, centerY - 121, centerY - 229];
    let style = { font: '60px Arial', fill: '#5981A7', align: 'center' };

    this.equation = Array.from({ length: 3 }, (v, k) => k)
      .map(k => createNum(this.game, posX[k], posY[k], style));

    style = { font: '40px Arial', fill: '#ffffff', align: 'center' };

    this.AnswerNum = Array.from({ length: 3 }, (v, k) => k)
      .map(k => createNum(this.game, 1000 + 100 * k, 452, style));

    return this.equation.concat(this.AnswerNum);
  }
  async ShowUp() {
    this.PanelStartFX.forEach(FX => {
      FX.alpha = 1;
      FX.animate.play();
    })
    await delay(100);
    this.Panel.forEach(panel => tweenAlpha(this.game, panel, 1));
    this.PanelNum.forEach(num => tweenAlpha(this.game, num, 1));
    await delay(400);
    this.PanelStartFX.forEach(FX => { FX.alpha = 0; });
    this.AnswerPanel.forEach(panel => setBtnEnable(panel, true));
  }
  AnswerLight() {
    this.AnswerPanelLight.forEach(light => {
      light.alpha = 1;
      tweenAlpha(this.game, light, 0, 500);
    })
  }
  UpdateNum(equation, mode, answer) {
    this.equation.forEach((num, i) => i === mode ? num.setText('?') : num.setText(equation[i]));
    this.AnswerNum.forEach((num, i) => num.setText(answer[i]));
    this.AnswerPanel.forEach((panel, i) => { panel.variable = answer[i]; });
  }
  Clean() {
    this.AnswerPanel.forEach(panel => setBtnEnable(panel, false));
    this.Panel.forEach(panel => tweenAlpha(this.game, panel, 0));
    this.PanelNum.forEach(num => tweenAlpha(this.game, num, 0));
  }
}
const createAnswerPanel = (game, k) => {
  let panel = game.add.sprite(1100 + 100 * (k - 1), 450, 'Panel', 'AnswerPanel.png');
  panel.scale.setTo(0.8);
  panel.anchor.setTo(0.5);
  panel.events.onInputDown.add(game.checkAnswer, game);
  return panel;
}
const createPanelLight = (game, k) => {
  let light = game.add.sprite(1100 + 100 * (k - 1), 450, 'Panel', 'AnswerPanelRightLight.png');
  light.anchor.setTo(0.5);
  light.alpha = 0;
  return light;
}
const createFX = (game, i, endframe, fps) => {
  let FX = game.add.sprite(0, 0, 'Panel');
  FX.animate = createAnimate(FX, `PanelStartFx00${i + 1}`, 0, endframe, fps, false);
  FX.alpha = 0;
  return FX;
}
const createNum = (game, x, y, style) => {
  let num = game.add.text(x, y, '', style);
  num.anchor.set(0.5);
  num.alpha = 0;
  return num;
}
