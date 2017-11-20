import Phaser from 'phaser';
import BlackBG from '../Game/blackBG';
import { createAnimate, tweenShining } from '../Game/utils';
import { equationlevel9, equationlevel10 } from '../Game/LevelEquation';
import { createQuestionNum } from '../Game/createQuestion';
import Fish from './CookingPageObject/fish';
import Panel from './CookingPageObject/panel';
import Bar from './CookingPageObject/bar';
import Fox from './CookingPageObject/fox';
import Board from './CookingPageObject/board';
import { StageState } from '../User/User';
import { SendGA } from '../Game/SendGAEvent';

export default class extends Phaser.State {
  init() {
    SendGA('CookingPage', { 'stage': 'init' });
    this.cookingStatus = false;
    this.answerCount = 0;
    this.correctCount = 0;
    this.mode = 2;
    this.level = 9;
  }
  shutdown() {
    SendGA('CookingPage', { 'stage': 'end' });
  }
  create() {
    this.createAudio();
    this.add.sprite(0, 0, 'BG');
    this.Fish = new Fish(this);

    this.fire = this.add.sprite(0, 0, 'fire');
    createAnimate(this.fire, 'fire', 0, 29, 20, true).play();

    this.exitBoard = {
      text: this.add.sprite(0, 0, 'panel', 'exitText.png'),
      btnArea: this.add.graphics()
        .beginFill(0x000000)
        .drawRect(100, 450, 120, 60)
    }
    tweenShining(this, this.exitBoard.text);
    this.exitBoard.text.tween.resume();
    this.exitBoard.text.alpha = 1;
    this.exitBoard.btnArea.events.onInputDown.add(this.exit, this);
    this.exitBoard.btnArea.inputEnabled = true;
    this.exitBoard.btnArea.alpha = 0;
    this.ArrowSheet = this.add.sprite(-330, 0, 'ArrowSheet');
    createAnimate(this.ArrowSheet, 'ArrowSheet', 0, 8, 15, true);
    this.ArrowSheet.animate.play('ArrowSheet');
    this.Panel = new Panel(this);
    this.PanelBlock = new PanelBlock(this);
    this.Bar = new Bar(this);
    this.Fox = new Fox(this);
    this.Fox.Waiting();
    this.Board = new Board(this);
    this.opening();
  }
  createAudio() {
    this.Audio = {
      CookingBG: this.add.audio('CookingBG')
    }
    this.SoundFX = {
      Fail: this.add.audio('Fail'),
      Throw: this.add.audio('Throw'),
      Wrong: this.add.audio('Wrong'),
      Success: this.add.audio('Success')
    }
  }
  async opening() {
    this.BlackBG = new BlackBG(this);
    await this.BlackBG.opening();
    this.BlackBG.BG.scale.setTo(0);
  }
  async startCooking() {
    SendGA('CookingPage', { 'stage': 'start' });
    this.Audio.CookingBG.play();
    this.answerCount = 0;
    this.correctCount = 0;
    this.ArrowSheet.alpha = 0;
    this.ArrowSheet.animate.stop();
    this.Bar.setBarAlpha(1);
    this.Panel.SetPanelAlpha(1);
    this.newQuestion();
    this.PanelBlock.scale.setTo(0);
    await this.Fox.Cooking();
    this.cooking();
  }
  cooking() {
    this.cookingStatus = true;
    this.Fox.Sitting();
    this.Fish.alpha = 1;
  }
  checkAnswer(panel) {
    this.answerCount++;
    this.PanelBlock.scale.setTo(1);
    if (panel.variable === this.CorrectAnswer) this.answerCorrect();
    else this.answerWrong();
  }
  async answerCorrect() {
    this.correctCount++;
    this.SoundFX.Throw.play();
    this.Bar.bar.burnedBar.x = -300;
    this.Fish.throw.play();
    await this.Fox.Throwing();
    if (this.Bar.bar.CompleteBar.x < 0) {
      this.PanelBlock.scale.setTo(0);
      this.newQuestion();
      this.Fox.Sitting();
    }
  }
  async answerWrong() {
    this.SoundFX.Wrong.play();
    await this.Fox.Throwingfail();
    if (this.Bar.bar.burnedBar.x < 0) {
      this.Fox.Sitting();
      this.PanelBlock.scale.setTo(0);
    }
  }
  failCooking() {
    SendGA('CookingPage', { 'stage': 'fail', 'totalcount': this.answerCount, 'correctcount': this.correctCount });
    this.Audio.CookingBG.stop();
    this.SoundFX.Fail.play();
    this.cookingStatus = false;
    this.PanelBlock.scale.setTo(1);
    this.Fish.burned.play();
    this.Fox.Burned();
    this.Bar.setBarAlpha(0);
    this.Panel.SetPanelAlpha(0);
    this.Board.ShowUpFailBoard();
  }
  finishCooking() {
    SendGA('CookingPage', { 'stage': 'success', 'totalcount': this.answerCount, 'correctcount': this.correctCount });
    StageState.CookingPageComplete = true;
    StageState.CookingPageCompleteCount++;
    if (StageState.CookingPageCompleteCount === 1) {
      StageState.CheckNewMedal = true;
      this.sendData = true;
    }
    if (StageState.LevelFinish < 5) StageState.LevelFinish = 5;
    this.PanelBlock.scale.setTo(1);
    this.Board.ShowUpGetBoard();
    this.cookingStatus = false;
    this.Bar.setBarAlpha(0);
    this.Panel.SetPanelAlpha(0);
    this.Fox.GetFish();
    this.Fish.alpha = 0;
  }
  continueCooking() {
    this.ArrowSheet.alpha = 1;
    this.ArrowSheet.animate.play('ArrowSheet');
    this.cookingStatus = false;
    this.Board.Clean();
    this.Bar.initBar();
    this.Fox.Waiting();
    this.Fish.alpha = 0;
    this.Fish.burned.frame = 0;
  }
  async exit() {
    await this.BlackBG.closing();
    if (this.sendData === true) {
      this.sendData = false;
      this.state.start('SendData', true, true, ['AxPage', 'LoggingPage', 'CatchBugPage', 'FishingPage', 'CookingPage']);
    } else this.state.start('GameBoot', true, true, 'LevelMap');
  }
  newQuestion() {
    let mode = this.mode;
    let level = this.level;
    let equation = newQuestion(level);
    this.CorrectAnswer = equation[mode];
    let AnswerArray = createAnswerNum(this.CorrectAnswer)
      .sort(() => 0.5 - Math.random());
    this.Panel.UpdateNum(equation, mode, AnswerArray);
    this.mode = changeMode(this.mode);
  }
  update() {
    if (this.cookingStatus === true) this.Bar.barUpdate();
  }
}
const newQuestion = (level) => {
  if (level === 9) return createQuestionNum(equationlevel9);
  else return createQuestionNum(equationlevel10);
}
const createAnswerNum = correctAnswer => {
  let answer = [];
  while (answer[0] === answer[1] || answer[0] === correctAnswer || answer[1] === correctAnswer) {
    answer[0] = Math.floor(Math.random() * 20) + 1;
    answer[1] = Math.floor(Math.random() * 20) + 1;
  }
  answer[2] = correctAnswer;
  return answer;
};
const changeMode = mode => {
  mode === 2 ? mode = 1 : mode = 2;
  return mode;
};

class PanelBlock {
  constructor(game) {
    let rect = game.add.graphics();
    rect.beginFill(0x000000);
    rect.drawRect(400, 200, 800, 200);
    rect.events.onInputDown.add(this.block, this);
    rect.inputEnabled = true;
    rect.scale.setTo(1);
    rect.alpha = 0;
    return rect;
  }
  block() { }
}
