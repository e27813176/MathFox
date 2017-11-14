import Phaser from 'phaser';
import BlackBG from '../Game/blackBG';
import { StageState } from '../User/User';
import { tweenShining, audioMute } from '../Game/utils';
import { bugRandom } from './CatchBugPageObject/bugdex';
import FlyingBug from './CatchBugPageObject/flyingBug';
import Fox from './CatchBugPageObject/fox';
import Board from './CatchBugPageObject/getBoard';
import Panel from './CatchBugPageObject/panel';
import Task from './CatchBugPageObject/task';
import Tutorial from './CatchBugPageObject/tutorial';
import { createQuestionNum } from '../Game/createQuestion';
import { equationlevel5 } from '../Game/LevelEquation';
import { SendGA } from '../Game/SendGAEvent';

export default class extends Phaser.State {
  init() {
    SendGA('CatchBugPage', { 'stage': 'init' });
    StageState.CatchBugPageCount++;
    this.level = 5;
    this.CorrectAnswer = 0;
    this.Range = [11, 15];
    this.answerCount = 0;
    this.correctCount = 0;
  }
  create() {
    this.createAudio();
    this.createImage();
    this.createBtn();
    this.newQuestion();
    this.Audio.CatchBugPageBG.loopFull(1);
    this.BlackBG = new BlackBG(this)
    this.opening();
  }
  createAudio() {
    this.Audio = {
      CatchBugPageBG: this.add.audio('CatchBugPageBG'),
      CatchBugPagefail: this.add.audio('CatchBugPagefail'),
      CatchBugPagefall: this.add.audio('CatchBugPagefall'),
      GetBug: this.add.audio('AddEnergyFX'),
      GetMedal: this.add.audio('GetMedal')
    }
    this.Audio.CatchBugPageBG.volume = 0.5;
  }
  createImage() {
    this.add.sprite(0, 0, 'BG');
    this.Fox = new Fox(this);
    this.FlyingBug = new FlyingBug(this);
    this.Fox.Standing();
    this.Panel = new Panel(this);
    this.Board = new Board(this);
    if (StageState.CatchBugPageComplete === false) this.Task = new Task(this);
  }
  createBtn() {
    this.exitBtn = {
      BG: this.add.sprite(0, 0, 'Panel', 'ExitBtn.png'),
      TextGlow: this.add.sprite(0, 0, 'Panel', 'ExitTextGlow.png'),
      HoverArea: this.add.graphics()
        .beginFill(0x000000)
        .drawRect(100, 625, 100, 50)
    }
    tweenShining(this, this.exitBtn.TextGlow);
    this.exitBtn.HoverArea.events.onInputDown.add(this.exitPage, this);
    this.exitBtn.HoverArea.inputEnabled = true;
    this.exitBtn.HoverArea.input.useHandCursor = true;
    this.exitBtn.HoverArea.alpha = 0;
  }
  async opening() {
    await this.BlackBG.opening();
    this.BlackBG.clean();
    this.startGame();
  }
  startGame() {
    SendGA('CatchBugPage', { 'stage': 'start' });
    this.FlyingBug.ShowUp();
    if (StageState.CatchBugPageCount === 1) {
      this.Panel.setAnswerPanelEnable(true);
      this.Tutorial = new Tutorial(this);
      this.Tutorial.askToStart(this);
    } else {
      if (StageState.CatchBugPageComplete === false) {
        this.Task.Show();
      } else {
        this.Panel.setAnswerPanelEnable(true);
      }
    }
  }
  checkAnswer(AnswerPanel) {
    this.Panel.setAnswerPanelEnable(false);
    if (AnswerPanel.variable === this.CorrectAnswer) this.AnswerCorrect();
    else this.AnswerWrong();
  }
  async AnswerCorrect() {
    if (this.FlyingBug.flyingBug.animate.frame > 1 && this.FlyingBug.flyingBug.animate.frame < 20) {
      this.answerCount++;
      this.correctCount++;
      await this.Fox.Catch();
      this.Fox.Standing();
      this.finishGame();
    } else {
      this.Audio.CatchBugPagefall.play();
      await this.Fox.Uncatch();
      this.Fox.Standing();
      this.Panel.setAnswerPanelEnable(true);
    }
  }
  async AnswerWrong() {
    this.answerCount++;
    this.Audio.CatchBugPagefail.play();
    await this.Fox.Fail();
    this.Fox.Standing();
    this.Panel.setAnswerPanelEnable(true);
  }
  finishGame() {
    if (this.tutorialMode === true) {
      this.Tutorial.answerCorrect();
    } else {
      SendGA('CatchBudPage', { 'stage': 'success', 'totalcount': this.answerCount, 'correctcount': this.correctCount });
      let Bug = bugRandom();
      this.Board.ShowUpBugBox(Bug);
      this.Board.ShowUp();
      this.Board.ContinueBtn.variable = Bug;
    }
  }
  continueGame(Btn) {
    SendGA('CatchBugPage', { 'stage': 'start' });
    this.answerCount = 0;
    this.correctCount = 0;
    let index;
    if (Btn.variable === 'GoldenBug') index = 0;
    else if (Btn.variable === 'IceBug') index = 1;
    else index = 2;
    if (StageState.CatchBugPageComplete === false) this.continueTask(index);
    this.Board.Clean();
    if (this.Range[0] === 11) this.Range = [16, 20];
    else this.Range = [11, 15];
    this.Panel.setAnswerPanelEnable(true);
    this.newQuestion();
  }
  continueTask(index) {
    let complete = this.Task.CheckAllBug();
    this.Task.OpenTaskBugdex(index);
    if (complete === true && StageState.CatchBugPageComplete === false) {
      this.sendData = true;
      this.Task.Complete();
      this.Task.ShowUpCompleteBoard();
    }
  }
  newQuestion() {
    let range = this.Range;
    let equation = newQuestion(range);
    this.CorrectAnswer = setCorrectAnswer(equation, range);
    this.Panel.updateNum(equation, range[0]);
  }
  async exitPage() {
    audioMute(this, this.Audio.CatchBugPageBG);
    this.FlyingBug.Stop();
    this.BlackBG.BG.scale.setTo(1);
    await this.BlackBG.closing();
    if (this.sendData === true) {
      this.sendData = false;
      this.state.start('SendData', true, true, ['AxPage', 'LoggingPage', 'CatchBugPage']);
    } else this.state.start('GameBoot', true, true, 'LevelMap');
  }
  update() {
    if (this.Fox.fox.catching.animate.frame === 4) this.FlyingBug.flyingBug.alpha = 0;
  }
  shutdown() {
    SendGA('CatchBugPage', { 'stage': 'end' });
    this.Audio.CatchBugPageBG.stop();
  }
}

const newQuestion = Range => createQuestionNum(equationlevel5, Range);

const setCorrectAnswer = (equation, Range) => {
  let answerOffset = Range[0] - 1;
  return equation[2] - answerOffset;
}
