import Phaser from 'phaser';
import { createAnimate, tweenShining, audioMute, delay } from '../Game/utils';
import BlackBG from '../Game/blackBG';
import { SendGA } from '../Game/SendGAEvent';
import { StageState } from '../User/User';
import AxBar from './AxPageObject/AxBar';
import { Ax } from '../User/tool';
import Fox from './AxPageObject/fox';
import Panel from './AxPageObject/panel';
import Board from './AxPageObject/board';

const AxBarLength = -243
const AxBarCenterX = (AxBarLength + 100) / 2;

export default class extends Phaser.State {
  init() {
    this.Sharpening = false;
    this.Range = [1, 5];
    this.level = 1;
    this.answerCount = 0;
    this.correctCount = 0;
    this.CorrectAnswer = 0;
  }
  create() {
    this.createAudio();
    StageState.AxPageCount++;
    this.add.sprite(0, 0, 'AxPageBG');
    this.createFire();
    this.AxParam1 = Ax.SharpenBar1;
    this.AxParam2 = Ax.SharpenBar2;
    this.AxBar = new AxBar(this, this.AxParam1, this.AxParam2);
    this.SharpenBar1 = this.AxBar.AxBar.SharpenBar;
    this.SharpenBar2 = this.AxBar.AxBar.SharpenBar2;
    this.Panel = new Panel(this);
    this.Fox = new Fox(this);
    this.Fox.Sitting(0);
    this.Energyball = this.add.sprite(0, 100, 'AxBar', 'AxBarEnergyBall.png');
    this.Energyball.alpha = 0;
    this.ArrowSheet = this.add.sprite(-330, -150, 'ArrowSheet');
    createAnimate(this.ArrowSheet, 'ArrowSheet', 0, 8, 15, true);
    this.ArrowSheet.animate.play('ArrowSheet');
    this.Board = new Board(this);
    this.createBtn();
    this.blackBG = new BlackBG(this);
    this.opening();
  }
  createFire() {
    Array.from({ length: 3 }, (v, k) => k)
      .forEach(i => {
        let obj = this.add.sprite(0, -100, 'Fire')
        createAnimate(obj, `Fire00${i + 1}`, 0, 25, 30, true);
        return obj.animate.play()
      })
  }
  createBtn() {
    this.exitBoard = {
      text: this.add.sprite(0, 0, 'Btn', 'ExitAxPageText.png'),
      btnArea: this.add.graphics()
        .beginFill(0xffffff)
        .drawRect(1420, 330, 120, 70)
    }
    tweenShining(this, this.exitBoard.text);
    this.exitBoard.text.tween.resume();
    this.exitBoard.btnArea.events.onInputDown.add(this.closing, this);
    this.exitBoard.btnArea.inputEnabled = true;
    this.exitBoard.btnArea.alpha = 0;
  }
  createAudio() {
    this.Audio = {
      rightFX: this.add.audio('rightFX'),
      AxFX: this.add.audio('AxFX'),
      AddEnergyFX: this.add.audio('AddEnergyFX'),
      AxPagePlay: this.add.audio('AxPagePlay'),
      AxPageSuccess: this.add.audio('AxPageSuccess'),
      WrongFX: this.add.audio('wrongFX')
    }
  }
  async opening() {
    await this.blackBG.opening(this);
    this.blackBG.clean();
  }
  startSharpening() {
    this.Audio.AxPagePlay.loopFull(1);
    this.Sharpening = true;

    this.ArrowSheet.animations.stop();
    this.ArrowSheet.alpha = 0;

    this.Panel.setPanel(this, 1);
    this.startState();
    this.CorrectAnswer = this.Panel.updateNum(this.level, this.Range);
    SendGA('AxPage', { 'stage': 'start' });
  }
  startState() {
    if (this.SharpenBar1.x > 100) {
      this.Fox.Sharpening(3);
      this.AxBar.AxBar.LightLevel1.alpha = 1;
    } else if (this.SharpenBar1.x < 100) {
      this.Fox.Sharpening(2);
      this.Audio.AxFX.play();
    }
    if (this.SharpenBar2.x > -243) {
      this.add.tween(this.Panel.QuestionPanelGolden).to({ alpha: 1 }, 500, 'Quad.easeOut', true, 0);
      this.Panel.QuestionPanelGolden.tween.resume();
      this.SharpenBar2.alpha = 1;
    }
    this.AxBar.ShowUp();
  }
  checkAnswer(AnswerPanel) {
    this.answerCount++;
    if (AnswerPanel.variable === this.CorrectAnswer) {
      this.correctCount++;
      this.Audio.rightFX.play();
      this.Panel.RightFx(this);
      this.updateState();
    } else {
      this.Audio.WrongFX.play();
      this.Panel.WrongFx();
    }
  }
  updateState() {
    if (this.level === 1) this.AxBar.GetEnergyFx(this);
    this.setLevelandRange();
    if (this.level === 2) {
      this.AxBar.AxBar.SharpenBar2.alpha = 1;
      this.AxBar.AxBar.LightLevel1.alpha = 1;
      this.Audio.AxFX.play();
      this.Fox.Sharpening(3);
      this.add.tween(this.Panel.QuestionPanelGolden).to({ alpha: 1 }, 500, 'Quad.easeOut', true, 0);
      this.Panel.QuestionPanelGolden.tween.resume();
    }
    if (this.SharpenBar1.x >= 100 && this.SharpenBar2.x < 100) {
      this.energyTranfer();
    }
    if (this.SharpenBar2.x > 71) {
      this.finishSharpening();
    } else {
      this.CorrectAnswer = this.Panel.updateNum(this.level, this.Range);
    }
  }
  setLevelandRange() {
    if (this.SharpenBar1.x >= AxBarCenterX - 30 && this.level === 1) this.Range = [6, 10]
    else if (this.SharpenBar2.x >= AxBarCenterX - 30) this.Range = [6, 10];
    if (this.SharpenBar1.x >= 81 && this.SharpenBar2.x <= -243) {
      this.Range = [1, 5];
      this.level = 2;
    }
  }
  stopSharpening() {
    this.ArrowSheet.animate.play('ArrowSheet');
    this.ArrowSheet.alpha = 1;
    this.Audio.AxPagePlay.stop();
    this.Sharpening = false;
    if (this.level === 2) this.Fox.Sitting(1);
    else this.Fox.Sitting(0);

    this.AxBar.Clean();
    this.Panel.setPanel(this, 0);
  }
  finishSharpening() {
    StageState.AxPageComplete = true;
    if (StageState.LevelFinish < 1) StageState.LevelFinish = 1;
    StageState.AxPageCompleteCount++;
    if (StageState.AxPageCompleteCount === 1) {
      this.sendData = true;
      StageState.CheckNewMedal = true;
    }
    this.Audio.AxPageSuccess.play();
    this.Audio.AxPagePlay.stop();
    this.Sharpening = false;
    this.Fox.Sitting(1);
    this.Panel.setPanel(this, 0);
    this.AxBar.AxBar.LightLevel2.alpha = 1;
    this.Board.showUp();
    SendGA('AxPage', { 'stage': 'end', 'totalcount': this.answerCount, 'correctcount': this.correctCount });
  }
  async closing() {
    this.Panel.setPanel(this, 0);
    audioMute(this, this.Audio.AxPagePlay);
    Ax.SharpenBar1 = this.SharpenBar1.x;
    Ax.SharpenBar2 = this.SharpenBar2.x;
    await this.blackBG.closing();
    this.exit();
  }
  exit() {
    this.Panel.PanelNum.forEach(num => num.destroy());
    if (this.sendData === true) {
      this.sendData = false;
      this.state.start('SendData', true, true, ['AxPage']);
    } else this.state.start('GameBoot', true, true, 'LevelMap');
  }
  async energyTranfer() {
    this.Energyball.alpha = 1;
    this.Energyball.position.setTo(0, 0);
    this.add.tween(this.Energyball).to({ x: this.SharpenBar2.x - 600, y: -230 }, 300, 'Quad.easeIn', true, 0)
    await delay(300);
    this.Energyball.alpha = 0;
    this.AxBar.GetEnergyFx2(this);
  }
  update() {
    if (this.Sharpening === true) this.AxBar.updateAxBar();
  }
  block() { }
}
