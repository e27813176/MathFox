import Phaser from 'phaser';
import BlackBG from '../Game/blackBG';
import { setBtnEnable, tweenShining, audioMute, delay } from '../Game/utils';
import { createQuestionNum } from '../Game/createQuestion';
import { equationlevel3, equationlevel4 } from '../Game/LevelEquation';
import { Ax } from '../User/tool';
import { StageState } from '../User/User';
import Fox from './LoggingPageObject/fox';
import Panel from './LoggingPageObject/panel';
import TreeBar from './LoggingPageObject/treeBar';
import WoodDex from './LoggingPageObject/woodDex';
import Board from './LoggingPageObject/board';
import AxBar from './LoggingPageObject/AxBar';
import { SendGA } from '../Game/SendGAEvent';

export default class extends Phaser.State {
  init() {
    SendGA('LoggingPage', { 'stage': 'init' });
    this.Range = [1, 5];
    this.CorrectAnswer = 0;
    this.level = 3;
    this.answerCount = 0;
    this.correctCount = 0;
    this.AXpram = Ax;
    this.TreeBloodPoint = Array.from({ length: 3 }, (v, i) => (i + 1) * (-362 / 4) + 10);
  }
  shutdown() {
    SendGA('LoggingPage', { 'stage': 'end' });
  }
  create() {
    StageState.LoggingPageCount++;
    this.add.sprite(0, 0, 'LoggingPage')
    this.createAudio();
    this.createText();
    let pram1 = this.AXpram.SharpenBar1;
    let pram2 = this.AXpram.SharpenBar2;
    this.AxBar = new AxBar(this, pram1, pram2);
    this.Fox = new Fox(this, this.AxBar.SharpenBar);
    this.Fox.Standing();
    this.add.sprite(0, 0, 'LoggingPageFront');
    this.Panel = new Panel(this);
    this.createBtn();
    this.TreeBar = new TreeBar(this);
    this.Board = new Board(this);
    this.WoodDex = new WoodDex(this);
    this.ArrowSheet = this.add.sprite(0, 0, 'ArrowSheet');
    this.ArrowSheet.animations.add('ArrowSheetDynamic', Phaser.Animation.generateFrameNames('ArrowSheet_', 0, 8, '.png', 5), 10, true);
    this.ArrowSheet.x = -110;
    this.ArrowSheet.y = -120;
    this.ArrowSheet.animations.play('ArrowSheetDynamic', 15, true);
    this.ArrowSheet.alpha = 1;
    this.blackBG = new BlackBG(this);
    this.opening();
  }
  createAudio() {
    this.audio = {
      rightFX: this.add.audio('rightFX'),
      Logging: this.add.audio('Logging'),
      LoggingBounce: this.add.audio('LoggingBounce'),
      LoggingPagePlay: this.add.audio('LoggingPagePlay'),
      LoggingBG: this.add.audio('LoggingBG'),
      WrongFX: this.add.audio('wrongFX'),
      LoggingSuccess: this.add.audio('LoggingSuccess')
    }
    this.audio.LoggingSuccess.volume = 0.5;
  }
  createText() {
    this.NeedSharpeningText = this.add.sprite(0, 0, 'Panel', 'NeedSharpeningText.png');
    tweenShining(this, this.NeedSharpeningText);
  }
  createBtn() {
    this.ExitText = this.add.sprite(0, 0, 'Panel', 'LoggingPageExitText.png');
    this.ExitText.Tween = this.add.tween(this.ExitText).to({ alpha: 0.5 }, 500, 'Quad.easeInOut', true, 0, false, true).loop(true);
    this.ExitBtnArea = this.add.sprite(50, 540, 'LoggingPageExitBtnArea');
    this.ExitBtnArea.events.onInputDown.add(this.exit, this);
    this.ExitBtnArea.inputEnabled = true;
    this.ExitBtnArea.input.useHandCursor = true;
    this.ExitBtnArea.alpha = 0;
  }
  async opening() {
    await this.blackBG.opening();
    this.blackBG.clean();
  }
  StartLogging() {
    SendGA('LoggingPage', { 'stage': 'start' });
    this.LoggingStatus = true;
    this.ArrowSheet.animations.stop();
    this.ArrowSheet.alpha = 0;
    this.audio.LoggingBG.loopFull(1);
    this.audio.LoggingBG.volume = 0.6;
    this.Panel.setAnswerPanelEnable(true);
    this.TreeBar.ShowUp();
    this.Panel.setAlpha(1);
    this.AxBar.ShowUp(this);
    if (this.AxBar.SharpenBar[0].x <= -243) {
      this.Fox.SetStatus(1);
      this.NeedSharpeningText.tween.resume();
      this.NeedSharpeningText.alpha = 1;
    } else if (this.AxBar.SharpenBar[0].x > -243) {
      this.Fox.SetStatus(0);
    }
    this.Fox.Logging();
    this.createQuestion();
  }
  StopLogging() {
    this.LoggingStatus = false;
    this.ArrowSheet.animations.play('ArrowSheetDynamic', 15, true);
    this.ArrowSheet.alpha = 1;
    audioMute(this, this.audio.LoggingBG);
    this.NeedSharpeningText.tween.pause();
    this.NeedSharpeningText.alpha = 0;
    this.Fox.Standing();
    setBtnEnable(this.Fox.foxStartBtn, true);
    setBtnEnable(this.Fox.foxStopBtn, false);
    this.Panel.AnswerPanel.forEach(Btn => setBtnEnable(Btn, false));
    this.Panel.setAlpha(0);
    this.AxBar.Clean(this);
    this.TreeBar.Clean();
  }
  async FinishLogging() {
    SendGA('LoggingPage', { 'stage': 'success', 'totalcount': this.answerCount, 'correctcount': this.correctCount });
    this.LoggingStatus = false;
    this.audio.LoggingSuccess.play();
    audioMute(this, this.audio.LoggingBG);
    StageState.LoggingPageComplete = true;
    StageState.LoggingPageCompleteCount++;
    if (StageState.LevelFinish < 2) StageState.LevelFinish = 2;
    if (StageState.LoggingPageCompleteCount === 1) {
      this.sendData = true;
      StageState.CheckNewMedal = true;
    }
    this.Fox.Standing();
    setBtnEnable(this.Fox.foxStartBtn, false);
    setBtnEnable(this.Fox.foxStopBtn, false);
    this.Panel.AnswerPanel.forEach(Btn => setBtnEnable(Btn, false));

    this.Panel.setAlpha(0);
    this.AxBar.Clean(this);
    this.TreeBar.Clean();
    this.TreeBar.resetTreeBloodBar();

    await delay(500);
    this.Board.ShowUp(this);
    this.WoodDex.getWood();
  }
  continue() {
    setBtnEnable(this.Fox.foxStartBtn, true);    
    this.Board.setBtnEnable(false);
    this.Board.Hide(this);
    this.WoodDex.Hide();
  }
  checkAnswer(AnswerPanel) {
    this.answerCount++;
    if (AnswerPanel.variable === this.CorrectAnswer) {
      this.correctCount++;
      this.audio.rightFX.play();
      this.Panel.CorrectFX(this);
      this.updateStatus();
    } else {
      this.Panel.WrongFX();
      this.audio.WrongFX.play();
    }
  }
  updateStatus() {
    this.TreeBar.setTreeBlood();
    if (this.TreeBar.TreeBlood[0].x <= -362 + 20) {
      this.FinishLogging();
    } else if (this.TreeBar.TreeBlood[0].x > -362 + 20) {
      this.createQuestion();
      this.TreeBar.TreeBloodDec(this, this.AxBar.SharpenBar[0], Ax.Attack);
    }
  }
  async exit() {
    audioMute(this, this.audio.LoggingBG);
    this.LoggingStatus = false;
    Ax.SharpenBar1 = this.AxBar.SharpenBar[0].x;
    Ax.SharpenBar2 = this.AxBar.SharpenBar[1].x;
    this.TreeBar.setValue();
    await this.blackBG.closing();
    if (this.sendData === true) {
      this.sendData = false;
      this.state.start('SendData', true, true, ['AxPage', 'LoggingPage']);
    } else this.state.start('GameBoot', true, true, 'LevelMap');
  }
  createQuestion() {
    this.Range = this.setRange();
    this.level = this.setLevel();
    let equation = newQuestion(this.level, this.Range);
    this.CorrectAnswer = setCorrectAnswer(equation, this.level, this.Range);
    this.Panel.setNum(equation, this.level, this.Range);
  }
  setLevel() {
    if (this.TreeBar.TreeBlood[0].x > 2 * (-362 / 4) + 10) return 3;
    else return 4;
  }
  setRange() {
    let bar = this.TreeBar.TreeBlood[0];
    if (bar.x > this.TreeBloodPoint[0]) {
      return [1, 5];
    } else if (bar.x <= this.TreeBloodPoint[0] && bar.x > this.TreeBloodPoint[1]) {
      return [6, 10];
    } else if (bar.x <= this.TreeBloodPoint[1] && bar.x > this.TreeBloodPoint[2]) {
      return [1, 5];
    } else if (bar.x <= this.TreeBloodPoint[2]) {
      return [6, 10];
    }
  }
  update() {
    if (this.LoggingStatus === true) this.SharpenBarX = this.AxBar.BarDec(this, Ax.UnSharpen);
    if (this.SharpenBarX <= -243) this.Fox.SetStatus(1);
  }
}

const newQuestion = (level, Range) => {
  if (level === 3) return createQuestionNum(equationlevel3, Range);
  else return createQuestionNum(equationlevel4, Range);
}

const setCorrectAnswer = (equation, level, Range) => {
  let answerOffset = Range[0] - 1;
  if (level === 3) return equation[2] - answerOffset;
  else return equation[1] - answerOffset;
}
