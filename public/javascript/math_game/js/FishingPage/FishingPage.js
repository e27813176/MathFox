import Phaser from 'phaser';
import BlackBG from '../Game/blackBG';
import { StageState } from '../User/User';
import { Timer, delay, setBtnEnable } from '../Game/utils';
import ScoreBar from './FishingPageObject/scoreBar';
import Fox from './FishingPageObject/Fox';
import Energy from './FishingPageObject/energyTransferFX';
import GetBoard from './FishingPageObject/getFishBoard';
import FailBoard from './FishingPageObject/failBoard';
import { fishRandom, FishBox } from './FishingPageObject/fishBox';
import Panel from './FishingPageObject/Panel';
import Fish from './FishingPageObject/fish';
import { SendGA } from '../Game/SendGAEvent';
import { equationlevel7, equationlevel8 } from '../Game/LevelEquation';
import { createQuestionNum } from '../Game/createQuestion';

export default class extends Phaser.State {
  init() {
    SendGA('FishingPage', { 'stage': 'init' });
    this.FishList = ['OrangeFish', 'FireFish', 'ElectricFish', 'WifiFish', 'IceFish', 'MedicineFish', 'GlowBlueFish'];
    this.mode = 2;
    this.level = 7;
    this.CorrectAnswer = 0;
    this.answerCount = 0;
    this.correctCount = 0;
    this.playing_status = false;
    this.combo = 0;
  }
  shutdown() {
    SendGA('FishingPage', { 'stage': 'end' });    
  }
  create() {
    StageState.FishingPageCount++;
    this.createAudio();
    this.Audio.fishingBG.loopFull(1);
    this.add.sprite(0, 0, 'BG');
    this.ScoreBar = new ScoreBar(this);
    this.Fox = new Fox(this);
    this.Fox.Sitting();
    this.Fish = new Fish(this);
    this.GetBoard = new GetBoard(this);
    this.FailBoard = new FailBoard(this);
    this.FishBox = new FishBox(this);
    this.Panel = new Panel(this);
    this.Energy = new Energy(this);

    this.mark = this.add.sprite(400, 200, 'mark_tutorial');
    this.mark.scale.setTo(0);
    this.mark.anchor.setTo(0.5, 0.5);
    this.BlackBG = new BlackBG(this);
    this.Timer = new Timer();
    let style = { font: 'bold 40px Arial', fill: '#ffffff', align: 'center' };
    this.comboText = this.add.text(1250, 610, '', style);
    style = { font: 'bold 30px Arial', fill: '#ffffff', align: 'center' };
    this.multiplyText = this.add.text(1360, 660, '', style);
    this.opening();
  }
  createAudio() {
    this.Audio = {
      rightFX: this.add.audio('rightFX'),
      wrongFX: this.add.audio('wrongFX'),
      successFX: this.add.audio('successFX'),
      startFX: this.add.audio('startFX'),
      failureFX: this.add.audio('failureFX'),
      clickFX: this.add.audio('clickFX'),
      add_energyFX: this.add.audio('add_energyFX'),
      alertFX: this.add.audio('alertFX'),
      fishingBG: this.add.audio('fishingBG'),
      startfishing: this.add.audio('fishing')
    }
  }
  async opening() {
    await this.BlackBG.opening();
    this.BlackBG.BG.scale.setTo(0);
    this.waitToStart();
  }
  async waitToStart() {
    let time = Math.floor(Math.random() * 4 + 2) * 1000;
    await delay(time);
    this.add.tween(this.mark.scale).to({ x: 1, y: 1 }, 200, Phaser.Easing.Elastic.Out, true)
    this.Audio.alertFX.play();
    await delay(1500);
    this.start();
  }
  start() {
    SendGA('FishingPage', { 'stage': 'start' });
    this.mark.scale.setTo(0, 0);    
    this.answerCount = 0;
    this.correctCount = 0;
    this.combo = 0;
    this.Timer.start();
    this.Fox.Pulling();
    this.ScoreBar.ShowUp();
    this.playing_status = true;
    this.newQuestion();
    this.Panel.ShowUp();
    this.Audio.startFX.play();
    this.Audio.fishingBG.stop();
    this.Audio.startfishing.loopFull(1);
  }
  restart() {
    this.Audio.startFX.play();
    this.Audio.fishingBG.loopFull(1);
    this.waitToStart();
    this.playing_status = false;
    this.FailBoard.Clean();
    this.Fox.Sitting();
  }
  checkAnswer(AnswerPanel) {
    this.answerCount++;
    if (AnswerPanel.variable === this.CorrectAnswer) this.answerCorrect();
    else this.answerWrong();
  }
  async answerCorrect() {
    this.combo++;
    this.Panel.AnswerPanel.forEach(panel => setBtnEnable(panel, false));
    let complete = false;
    let PosY = this.ScoreBar.Bar.y;
    this.correctCount++;
    this.Audio.rightFX.play();
    this.Panel.AnswerLight();
    await this.Energy.Transfer(PosY);
    this.ShowCombo();
    this.Energy.ball.alpha = 0;
    this.Audio.add_energyFX.play();
    complete = this.ScoreBar.BarInc(this.combo);
    if (complete === true) this.finishfishing();
    else this.newQuestion();
  }
  ShowCombo() {
    this.comboText.alpha = 1;
    this.multiplyText.alpha = 1;
    this.comboText.setText(`Combo ${this.combo}`);
    this.multiplyText.setText(`+${25 * this.combo}%`);
    this.add.tween(this.comboText).to({ alpha: 0 }, 2000, 'Quad.easeIn', true);
    this.add.tween(this.multiplyText).to({ alpha: 0 }, 2000, 'Quad.easeIn', true);
  }
  answerWrong() {
    this.combo = 0;
    this.Audio.wrongFX.play();
    this.ScoreBar.BarDec();
  }
  newQuestion() {
    let mode = this.mode;
    let level = this.level;
    let equation = newQuestion(level);
    this.CorrectAnswer = equation[mode];
    let AnswerArray = createAnswerNum(this.CorrectAnswer)
      .sort(() => 0.5 - Math.random());
    this.Panel.UpdateNum(equation, mode, AnswerArray);
    this.Panel.AnswerPanel.forEach(panel => setBtnEnable(panel, true));
  }
  finishfishing() {
    this.playing_status = false;
    this.finishAudio();
    this.finishGameData();
    this.finishAnimate();
  }
  async finishAnimate() {
    this.Panel.Clean();
    this.ScoreBar.TopSuccessLight.alpha = 1
    this.Fox.GetFish();
    let FishIndex = fishRandom();
    this.Fish.PopOut(FishIndex);
    await delay(2500);
    this.GetBoard.ShowUp(FishIndex);
    await delay(500);
    this.FishBox.ShowUp(FishIndex);
  }
  finishAudio() {
    this.Audio.startfishing.stop();
    this.Audio.successFX.play();
  }
  finishGameData() {
    let time = this.Timer.stop();
    SendGA('FishingPage', { 'stage': 'success', 'totalcount': this.answerCount, 'correctcount': this.correctCount, 'duration': time });
    StageState.FishingPageCompleteCount++;
    if (StageState.FishingPageCompleteCount === 1) {
      this.sendData = true;
      StageState.CheckNewMedal = true;
    }
    if (StageState.LevelFinish < 4) StageState.LevelFinish = 4;
  }
  async fail() {
    SendGA('FishingPage', { 'stage': 'fail', 'totalcount': this.answerCount, 'correctcount': this.correctCount });
    this.Timer.stop();
    this.Audio.startfishing.stop();
    this.Audio.failureFX.play();
    this.playing_status = false;
    this.ScoreBar.Clean();
    this.Panel.Clean();
    this.Fox.Fall();
    await delay(2000);
    this.FailBoard.ShowUp();
  }
  continue() {
    this.Audio.fishingBG.loopFull(1);
    this.Audio.startFX.play();
    this.playing_status = false;
    this.waitToStart();
    this.Fish.Clean();
    this.GetBoard.Clean();
    this.ScoreBar.Clean();
    this.Fox.Sitting();
    this.FishBox.Hide();
  }
  async exit() {
    await this.BlackBG.closing();
    if (this.sendData === true) this.sendDataPage();
    else this.state.start('GameBoot', true, true, 'LevelMap');
  }
  sendDataPage() {
    this.sendData = false;
    this.state.start('SendData', true, true, ['AxPage', 'LoggingPage', 'CatchBugPage', 'FishingPage']);
  }
  update() {
    if (this.playing_status === true) this.ScoreBar.updateBar(this);
  }
}
const newQuestion = (level) => {
  if (level === 7) return createQuestionNum(equationlevel7);
  else return createQuestionNum(equationlevel8);
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
