import Phaser from 'phaser';
import Fox from './HomeObject/fox';
import ArrowKey from './HomeObject/ArrowKey';
import ArrowSheet from './HomeObject/arrow';
import FoxVendor from './HomeObject/vendor';
import { tweenShining } from '../Game/utils';
import { config } from '../GameConfig';

export default class extends Phaser.State {
  init(page) {
    this.page = page;
    let param = imageParam[`ver${config.width}`];
    let Pos = param.fox.filter(line => line.page === this.page);
    this.foxPos = Pos[0].Pos;
  }
  create() {
    this.createImage();
    this.createBtn();
    this.controller();
    this.world.setBounds(0, 0, config.width * 2, config.height);
    this.camera.follow(this.Fox.image);
    this.camera.deadzone = new Phaser.Rectangle(0, 100, 0, 750);
    this.opening();
  }
  createBtn() {
    this.taskBoard = this.add.graphics();
    this.taskBoard.beginFill(0x000000);
    this.taskBoard.drawRect(1440, 470, 200, 130);
    this.taskBoard.alpha = 0;
    this.taskBoard.inputEnabled = true;
    this.taskBoard.events.onInputUp.add(this.openTask, this);
  }
  createImage() {
    this.VillageBG = this.add.sprite(0, 0, 'VillageBG');
    this.ArrowSheet = new ArrowSheet(this, 735, -40);
    this.FoxVendor = new FoxVendor(this);
    this.Fox = new Fox(this.game, this.foxPos[0], this.foxPos[1]);
    this.TaskBoardLight = this.add.sprite(0, 0, 'TaskBoardLight', 'TaskBoardLight.png');
    tweenShining(this, this.TaskBoardLight);
    this.TaskBoardLight.tween.resume();
    this.TaskBoardLight.alpha = 1;
  }
  controller() {
    this.Arrowkey = new ArrowKey(this.game, this.Fox);
    this.LeftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.RightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.LeftKey.onDown.add(this.Arrowkey.pressLeft, this.Arrowkey);
    this.RightKey.onDown.add(this.Arrowkey.pressRight, this.Arrowkey);
    this.LeftKey.onUp.add(this.Arrowkey.stop, this.Arrowkey);
    this.RightKey.onUp.add(this.Arrowkey.stop, this.Arrowkey);
    this.input.enabled = true;
  }
  update() {
    if (this.Arrowkey.status === 'left') {
      this.Fox.image.x -= this.Fox.speed;
    } else if (this.Arrowkey.status === 'right' && this.Fox.image.x < 2460) {
      this.Fox.image.x += this.Fox.speed;
    }
    if (this.Fox.image.x === -600) {
      this.exit('HomePage', false, 'Village');
    }
  }
  openTask() {
    this.exit('GameBoot', true, 'LevelMap');
  }
  exit(page, clean, pram) {
    this.closing(page, clean, pram);
  }
  opening() {
    this.BG = this.add.graphics();
    this.BG.beginFill(0x000000);
    this.BG.drawRect(0, 0, config.width * 2, config.height);
    this.add.tween(this.BG).to({ alpha: 0 }, 1000, 'Linear', true, 0);
  }
  closing(page, clean, pram) {
    this.add.tween(this.BG)
      .to({ alpha: 1 }, 1000, 'Linear', true, 0)
      .onComplete.add(() => this.state.start(page, true, clean, pram));
  }
}

const imageParam = {
  ver1600: {
    fox: [
      { 'Pos': [-500, 70], 'page': 'HomePage' },
      { 'Pos': [1000, 70], 'page': 'LevelMap' }
    ]
  },
  ver1200: {
    fox: [
      { 'Pos': [-500, 55], 'page': 'HomePage' },
      { 'Pos': [1000, 55], 'page': 'LevelMap' }
    ]
  }
};
